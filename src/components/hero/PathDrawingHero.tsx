import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

interface PathDrawingHeroProps {
  brand: string;
  tagline?: string;
  eyebrow?: string;
  fromColor?: string;
  toColor?: string;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('svg raster failed'));
    img.src = url;
  });
}

function countOpaque(ctx: CanvasRenderingContext2D, w: number, h: number): number {
  const data = ctx.getImageData(0, 0, w, h).data;
  let n = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 12) n += 1;
  }
  return n;
}

async function rasterInk(
  source: SVGSVGElement,
  apply: (text: SVGTextElement) => void,
): Promise<number> {
  const clone = source.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const text = clone.querySelector('text');
  if (!text) return 0;
  apply(text as SVGTextElement);
  text.setAttribute('stroke', '#ffffff');
  (text as SVGTextElement).style.stroke = '#ffffff';

  const vb = source.viewBox.baseVal;
  const w = Math.max(1, Math.round(vb.width || 800));
  const h = Math.max(1, Math.round(vb.height || 160));
  clone.setAttribute('width', String(w));
  clone.setAttribute('height', String(h));
  clone.style.visibility = 'visible';

  const xml = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const cw = Math.max(1, Math.round(w * 0.45));
    const ch = Math.max(1, Math.round(h * 0.45));
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 0;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, cw, ch);
    return countOpaque(ctx, cw, ch);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function measureExactDashLength(svg: SVGSVGElement): Promise<number> {
  const full = await rasterInk(svg, (text) => {
    text.style.strokeDasharray = 'none';
    text.style.strokeDashoffset = '0';
  });
  if (full <= 0) throw new Error('empty ink');

  const covered = async (dash: number) => {
    const ink = await rasterInk(svg, (text) => {
      text.style.strokeDasharray = `${dash} 100000`;
      text.style.strokeDashoffset = '0';
    });
    return ink >= full * 0.994;
  };

  let hi = 64;
  while (hi < 24000 && !(await covered(hi))) hi *= 2;

  let lo = 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (await covered(mid)) hi = mid;
    else lo = mid + 1;
  }
  // Raster sampling tolerates a few missing pixels. Keep the dash beyond
  // the estimated contour so its tail cannot flash during the initial gap.
  return Math.max(1, Math.ceil(lo * 1.25));
}

function SvgPathDrawing({
  text,
  fromColor = '#d61c59',
  toColor = '#e7d84b',
  strokeWidth = 3,
  durationSec = 6,
  delaySec = 2,
  fontSize = 200,
  viewBoxWidth = 860,
  viewBoxHeight = 280,
}: {
  text: string;
  fromColor?: string;
  toColor?: string;
  strokeWidth?: number;
  durationSec?: number;
  delaySec?: number;
  fontSize?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}) {
  const reactId = useId().replace(/:/g, '');
  const gradientId = `pathGradient-${reactId}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [dashLength, setDashLength] = useState(0);
  const [reduced, setReduced] = useState(false);
  const display = text.trim();

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener('change', read);
    return () => query.removeEventListener('change', read);
  }, []);

  useEffect(() => {
    if (!display || reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    let cancelled = false;
    const run = async () => {
      try {
        await document.fonts.ready;
        if (cancelled || !svgRef.current) return;
        const dash = await measureExactDashLength(svgRef.current);
        if (!cancelled) setDashLength(dash);
      } catch {
        const el = textRef.current;
        if (!el || cancelled) return;
        const width = el.getComputedTextLength() || display.length * fontSize * 0.62;
        setDashLength(Math.max(1, Math.ceil(width * 1.15)));
      }
    };
    void run();
    return () => { cancelled = true; };
  }, [display, fontSize, reduced]);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (reduced || dashLength <= 0) {
      el.style.strokeDashoffset = '0';
      el.style.strokeDasharray = 'none';
      return;
    }

    el.style.strokeDasharray = `${dashLength} ${dashLength}`;
    el.style.strokeDashoffset = String(dashLength);

    const delayMs = delaySec * 1000;
    const drawMs = Math.max(0.8, durationSec) * 1000;
    const unitsPerMs = dashLength / drawMs;
    let offset = dashLength;
    let startTime = 0;
    let raf = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      if (elapsed < delayMs) {
        el.style.strokeDashoffset = String(dashLength);
        raf = window.requestAnimationFrame(tick);
        return;
      }
      const drawElapsed = elapsed - delayMs;
      offset = dashLength - unitsPerMs * drawElapsed;
      if (offset <= 0) {
        el.style.strokeDashoffset = '0';
        // The finished name must be solid, regardless of raster/font estimates.
        el.style.strokeDasharray = 'none';
        return;
      }
      el.style.strokeDashoffset = String(offset);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [dashLength, durationSec, delaySec, reduced]);

  if (!display) return null;
  const ready = dashLength > 0 || reduced;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="path-drawing-svg"
      role="img"
      aria-label={display}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>
      <text
        ref={textRef}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fontSize={fontSize}
        fontWeight="bold"
        fontFamily="'DM Sans Variable', Arial, sans-serif"
        letterSpacing="0.02em"
      >
        {display}
      </text>
    </svg>
  );
}

export function PathDrawingHero({ brand, tagline, eyebrow }: PathDrawingHeroProps) {
  const name = brand.trim();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!name) return null;

  const len = name.length;
  const fontSize = len > 12 ? 100 : len > 8 ? 140 : 220;
  const vbW = len > 8 ? 1400 : 1100;
  const vbH = len > 8 ? 260 : 320;

  return (
    <section className="pd-hero" data-path-drawing-hero>
      <div className="pd-hero__bg" aria-hidden="true">
        <img src="/hero_sem_placa.jpg" alt="" loading="eager" />
      </div>
      <div className="pd-hero__content">
        {eyebrow && <p className={`pd-hero__eyebrow ${ready ? 'is-visible' : ''}`}>{eyebrow}</p>}
        <h1 className="sr-only">{name}</h1>
        <div className={`pd-hero__svg-wrap ${ready ? 'is-visible' : ''}`}>
          <SvgPathDrawing
            text={name}
            fontSize={fontSize}
            viewBoxWidth={vbW}
            viewBoxHeight={vbH}
          />
        </div>
        {tagline && <p className={`pd-hero__tagline ${ready ? 'is-visible' : ''}`}>{tagline}</p>}
      </div>
      <a href="#work" className={`pd-hero__scroll ${ready ? 'is-visible' : ''}`} aria-label="Rolar para projetos">
        <span>Scroll</span>
        <span className="pd-hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}

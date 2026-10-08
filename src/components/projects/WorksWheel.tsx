import * as React from 'react';
import { Link } from 'react-router-dom';
import './works-wheel.css';

export interface WorksWheelItem {
  title: string;
  image: string;
  href: string;
}

interface WorksWheelProps {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
  className?: string;
}

/* Geometry — the card is measured against the stage; everything else is
   measured against the card, so a narrow stage scales the whole wheel down. */
const CARD_H = 0.48;
const CARD_MAX_W = 0.44;
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 0.78;
const BOW = 1.82;
const TITLE = 0.105;
const INDEX = 0.042;
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Portfólio '26",
  action = 'Ver projeto',
  className = '',
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const dragY = React.useRef<number | null>(null);
  const startY = React.useRef(0);
  const moved = React.useRef(false);
  const settling = React.useRef(0);

  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState({ w: 0, h: 0 });
  const [reduced, setReduced] = React.useState(false);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener('change', read);
    return () => query.removeEventListener('change', read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  /* One pass per frame: ease toward the target, then write every transform. */
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(d * (360 / count), drumDeg, ringR, drumR, bow, m);
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1';
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive(prev => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  /* Native wheel listener: cancellable only while the wheel has somewhere to go,
     so the page scrolls on at either end instead of trapping the reader. */
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  return (
    <section aria-label={label} className={`ww-section ${className}`}>
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`ww-item-${active}`}
        className="ww-stage"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={event => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;
          dragY.current = event.clientY;
          startY.current = event.clientY;
          moved.current = false;
          /* Window-level listeners instead of setPointerCapture: capture would
             retarget the click to the stage and the card link would never fire. */
          const onMove = (e: PointerEvent) => {
            if (dragY.current === null) return;
            if (Math.abs(e.clientY - startY.current) > 6) moved.current = true;
            to(target.current + (dragY.current - e.clientY) / DRAG_UNITS);
            dragY.current = e.clientY;
          };
          const onUp = () => {
            dragY.current = null;
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
            if (target.current > 1) to(Math.round(target.current));
          };
          window.addEventListener('pointermove', onMove);
          window.addEventListener('pointerup', onUp);
          window.addEventListener('pointercancel', onUp);
        }}
        onKeyDown={event => {
          if (event.key === 'ArrowDown') to(Math.round(target.current) + 1);
          else if (event.key === 'ArrowUp') to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div ref={wheelRef} className="ww-wheel">
          {items.map((item, i) => (
            <Link
              key={item.href}
              id={`ww-item-${i}`}
              role="option"
              aria-selected={i === active}
              to={item.href}
              viewTransition={!reduced}
              className="ww-card"
              ref={node => {
                cardRefs.current[i] = node;
              }}
              style={{
                width: metrics.cardW,
                height: metrics.cardH,
                marginLeft: -metrics.cardW / 2,
                marginTop: -metrics.cardH / 2,
              }}
              onClick={event => {
                if (moved.current) event.preventDefault();
              }}
              onFocus={() => {
                moved.current = false;
              }}
            >
              <span className="ww-card__face">
                <img src={item.image} alt={item.title} draggable={false} loading="lazy" />
                {action && (
                  <span className="ww-card__action">
                    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                      <path
                        d="M3 9 9 3M4 3h5v5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {action}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>

        {/* Overlays live inside the stage so their absolute position never
            lands on the index or the arrow buttons below it on mobile. */}
        <div ref={labelRef} className="ww-ring-label" style={{ fontSize: metrics.title }} aria-hidden="true">
          {label}
        </div>
        <div ref={titleRef} className="ww-front-title" style={{ fontSize: metrics.title }} aria-hidden="true">
          {items[active]?.title}
        </div>
      </div>

      <ol className="ww-index" style={{ fontSize: metrics.index }} aria-label="Índice de projetos">
        {items.map((item, i) => (
          <li key={item.href}>
            <button
              type="button"
              className={i === active ? 'is-active' : ''}
              onClick={() => to(i + 1)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      <div className="ww-mobile-nav">
        <button type="button" aria-label="Projeto anterior" onClick={() => to(Math.round(target.current) - 1)}>
          ←
        </button>
        <button type="button" aria-label="Próximo projeto" onClick={() => to(Math.round(target.current) + 1)}>
          →
        </button>
      </div>
    </section>
  );
}

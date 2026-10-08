import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../../content/site';
import './cinematic-contact.css';

gsap.registerPlugin(ScrollTrigger);

export function CinematicContact() {
  const scope = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const magnetic = {
    onPointerMove: (event: PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType !== 'mouse' || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--magnet-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px`);
      event.currentTarget.style.setProperty('--magnet-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`);
    },
    onPointerLeave: (event: PointerEvent<HTMLAnchorElement>) => {
      event.currentTarget.style.removeProperty('--magnet-x');
      event.currentTarget.style.removeProperty('--magnet-y');
    },
  };
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-contact-name]', { y: 100, scale: 0.85, opacity: 0, ease: 'none', scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'top top', scrub: 0.6 } });
        gsap.from('[data-contact-content]', { y: 60, opacity: 0, ease: 'power2.out', scrollTrigger: { trigger: scope.current, start: 'top 80%', end: 'top 15%', scrub: 0.6 } });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return <section id="contact" className="cinematic-contact" ref={scope} aria-labelledby="contact-title">
    <div className="cinematic-contact__scene">
      <div className="cinematic-contact__glow" aria-hidden="true" />
      <div className="cinematic-contact__name" data-contact-name aria-hidden="true">VICTOR HUGO</div>
      <div className="cinematic-contact__marquee" aria-hidden="true"><div className={paused ? 'cinematic-contact__track is-paused' : 'cinematic-contact__track'}>{[0, 1].map(index => <span key={index}>WEB DESIGN <b>✦</b> DESENVOLVIMENTO <b>✦</b> EXPERIÊNCIA <b>✦</b> SITES COM PRESENÇA <b>✦</b> </span>)}</div></div>
      <button className="cinematic-contact__pause" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Retomar faixa' : 'Pausar faixa'} {paused ? '▷' : 'Ⅱ'}</button>
      <div className="cinematic-contact__content" data-contact-content>
        <span className="eyebrow">05 / CONTATO</span>
        <h2 id="contact-title">Uma ideia em mente?<br /><em>Vamos dar forma.</em></h2>
        <div className="cinematic-contact__links">
          {site.email && <a className="cinematic-pill" href={`mailto:${site.email}`}>{site.email} ↗</a>}
          {site.whatsapp && <a className="cinematic-pill" href={site.whatsapp}>WhatsApp ↗</a>}
          {site.linkedin && <a className="cinematic-pill" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
          <a {...magnetic} className="cinematic-pill" href={site.github} target="_blank" rel="noreferrer">Explore meu GitHub <span>↗</span></a>
          <a {...magnetic} className="cinematic-pill cinematic-pill--secondary" href="#work">Rever os projetos <span>↑</span></a>
        </div>
      </div>
      <div className="cinematic-contact__bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Design com intenção. Desenvolvimento com cuidado.</span><a className="cinematic-pill cinematic-top" href="#main" aria-label="Voltar ao topo">↑</a></div>
    </div>
  </section>;
}

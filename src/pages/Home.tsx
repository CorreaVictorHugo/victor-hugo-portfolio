import { useEffect, useMemo, useRef } from 'react';
import { projects } from '../content/projects';
import { site } from '../content/site';
import { WorksWheel, type WorksWheelItem } from '../components/projects/WorksWheel';
import { ServiceCards } from '../components/services/ServiceCards';
import { usePageMotion } from '../motion/usePageMotion';
import { CinematicContact } from '../components/layout/CinematicContact';
import { PathDrawingHero } from '../components/hero/PathDrawingHero';
import '../components/hero/path-drawing-hero.css';

export function Home() {
  const scope = useRef<HTMLElement>(null);
  usePageMotion(scope, 'home');
  useEffect(() => { document.title = 'Victor Hugo — Web Design & Development'; }, []);

  const wheelItems: WorksWheelItem[] = useMemo(() =>
    projects.map(p => ({
      title: p.title,
      image: p.coverSmall || p.cover || '',
      href: `/projects/${p.slug}`,
    })),
  []);

  return <main id="main" ref={scope}>
    <PathDrawingHero
      brand="VICTOR HUGO"
      tagline="Web Design & Development — transformo ideias em experiências digitais claras e marcantes."
      eyebrow="Portfólio / 2026"
    />
    <section id="work" className="work section" aria-labelledby="work-title">
      <div className="section-heading" data-reveal><span className="eyebrow">01 / PROJETOS</span><h2 id="work-title">O trabalho<br /><em>em primeiro plano.</em></h2><span className="section-note">Páginas web selecionadas<br />{String(projects.length).padStart(2, '0')} projetos e versões</span></div>
      <WorksWheel items={wheelItems} label="Projetos '26" action="Ver projeto" />
    </section>
    <ServiceCards />
    <section id="about" className="about section" aria-labelledby="about-title">
      <span className="eyebrow">03 / SOBRE</span><div data-reveal><h2 id="about-title">Por trás de cada site,<br /><em>atenção a cada detalhe.</em></h2><p>{site.about}</p><a className="text-link" href={site.github} target="_blank" rel="noreferrer">Conheça meu trabalho ↗</a></div>
    </section>
    <section className="process section" aria-labelledby="process-title"><div className="section-heading" data-reveal><span className="eyebrow">04 / PROCESSO</span><h2 id="process-title">Clareza em<br /><em>cada etapa.</em></h2></div><ol>{site.process.map((step, index) => <li key={step} data-reveal><span>0{index + 1}</span><h3>{step}</h3></li>)}</ol></section>
    <CinematicContact />
  </main>;
}

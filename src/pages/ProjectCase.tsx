import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../content/projects';
import { ProjectVisual } from '../components/projects/ProjectVisual';
import { usePageMotion } from '../motion/usePageMotion';
import { useReducedMotion } from '../motion/useReducedMotion';
import { NotFound } from './NotFound';

export function ProjectCase() {
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  usePageMotion(scope, slug ?? 'case');
  useEffect(() => { document.title = project ? `${project.title} — Victor Hugo` : 'Projeto não encontrado — Victor Hugo'; }, [project]);
  if (!project) return <NotFound />;
  return <main id="main" ref={scope} className="case">
    <section className="case-heading"><Link className="back-link" to={`/#work`} viewTransition={!reduced}>← Voltar aos projetos</Link><div className="eyebrow">PROJETO / {project.index}</div><h1 tabIndex={-1}>{project.title}</h1><div className="case-meta"><span>{project.client}</span><span>{project.category}</span>{project.year && !project.year.startsWith('TODO') && <span>{project.year}</span>}</div></section>
    <div className="case-cover"><ProjectVisual project={project} priority /></div>
    <section className="case-context section"><span className="eyebrow">01 / CONTEXTO</span><div><h2>{project.description}</h2><div className="case-columns"><div><h3>O desafio</h3><p>{project.challenge}</p></div><div><h3>A solução</h3><p>{project.solution}</p></div></div></div></section>
    <section className="gallery section" aria-label="Galeria do projeto">{project.gallery.length ? project.gallery.map(image => <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />) : <div className="gallery-todo"><span className="eyebrow">02 / GALERIA</span><p>TODO: adicionar screenshots reais</p><span>Imagens grandes. Detalhes que contam a história.</span></div>}</section>
    <section className="case-context section"><span className="eyebrow">03 / ENTREGA</span><div><h2>{project.outcome}</h2><div className="case-links">{project.url && <a href={project.url} target="_blank" rel="noreferrer">Visitar o site ↗</a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">Ver repositório ↗</a>}</div></div></section>
    <section className="case-back section"><Link className="back-link back-link--large" to={`/#work`} viewTransition={!reduced}>← Voltar aos projetos</Link></section>
  </main>;
}

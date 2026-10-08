import type { CSSProperties } from 'react';
import { useViewTransitionState } from 'react-router-dom';
import type { Project } from '../../types/project';

export function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  const transitioning = useViewTransitionState(`/projects/${project.slug}`);
  const style = { viewTransitionName: transitioning ? `project-${project.slug}` : 'none' } as CSSProperties;
  return <div className={`project-visual ${project.tone}`} style={style}>
    {project.cover ? <img src={project.cover} srcSet={project.coverSmall ? `${project.coverSmall} 720w, ${project.cover} ${project.coverWidth ?? 1440}w` : undefined} sizes="(max-width: 768px) calc(100vw - 48px), 92vw" alt={project.coverAlt} width={project.coverWidth ?? 1440} height={project.coverHeight ?? 960} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} /> : <>
      <div className="placeholder-top"><span>ESPAÇO PARA SEU PROJETO</span><span>VH / {project.index}</span></div>
      <div className="placeholder-composition" aria-hidden="true"><span className="placeholder-outline" /><span className="placeholder-solid" /><span className="placeholder-orbit" /></div>
      <div className="placeholder-bottom"><span>TODO: screenshot do projeto</span><span>Prévia de layout ↗</span></div>
    </>}
  </div>;
}

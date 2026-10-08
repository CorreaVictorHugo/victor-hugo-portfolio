import { Link } from 'react-router-dom';
import { useReducedMotion } from '../../motion/useReducedMotion';
import type { Project } from '../../types/project';
import { ProjectVisual } from './ProjectVisual';

export function ProjectLink({ project, next = false, compact = false }: { project: Project; next?: boolean; compact?: boolean }) {
  const reduced = useReducedMotion();
  return <Link to={`/projects/${project.slug}`} viewTransition={!reduced} className="project-link" aria-label={`${next ? 'Próximo projeto: ' : 'Abrir case: '}${project.title}, ${project.index}`}>
    <div data-parallax={compact ? undefined : true}><ProjectVisual project={project} /></div>
    <div className="project-info"><span className="project-index">/{project.index}</span><div><h3>{project.title}</h3><span className="muted">{project.category}{project.year && !project.year.startsWith('TODO') ? ` · ${project.year}` : ''}</span></div><span className="project-arrow" aria-hidden="true">↗</span></div>
  </Link>;
}

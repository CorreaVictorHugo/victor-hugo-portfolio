import { projects } from '../content/projects';

// Os snapshots deslizam dentro da moldura enquanto o grupo interpola os bounds.
// Regras por slug evitam aplicar o parallax ao snapshot da página inteira.
const styles = projects.map(({ slug }) => `
  ::view-transition-image-pair(project-${slug}) { overflow: hidden; isolation: isolate; }
  ::view-transition-old(project-${slug}) {
    animation: project-depth-out var(--duration-cinematic) var(--ease-depth) both;
    mix-blend-mode: normal;
  }
  ::view-transition-new(project-${slug}) {
    animation: project-depth-in var(--duration-cinematic) var(--ease-depth) both;
    mix-blend-mode: normal;
  }
`).join('\n');

export function ProjectTransitionStyles() {
  return <style>{styles}</style>;
}

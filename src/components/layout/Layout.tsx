import { useEffect, useState } from 'react';
import { Link, Outlet, ScrollRestoration, useLocation, useNavigationType } from 'react-router-dom';
import { site } from '../../content/site';
import { ProjectTransitionStyles } from '../../motion/ProjectTransitionStyles';
import { RandomLetterSwap } from '../ui/RandomLetterSwap';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    } else if (navigationType !== 'POP') {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true }));
    }
  }, [location, navigationType]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return <>
    <ProjectTransitionStyles />
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <header className="site-header">
      <Link className="wordmark" to="/" onClick={() => setMenuOpen(false)} aria-label="Victor Hugo — início">Victor Hugo<span aria-hidden="true">↗</span></Link>
      <span className="header-caption">Design & Development</span>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar −' : 'Menu +'}</button>
      <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Principal">
        <Link to="/#work" onClick={() => setMenuOpen(false)} aria-label="Projetos">
          <RandomLetterSwap label="Projetos" />
        </Link>
        <Link to="/#about" onClick={() => setMenuOpen(false)} aria-label="Sobre">
          <RandomLetterSwap label="Sobre" />
        </Link>
        <Link className="contact-link" to="/#contact" onClick={() => setMenuOpen(false)} aria-label="Vamos conversar">
          <RandomLetterSwap label="Vamos conversar" />
          <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
    <Outlet />
    {location.pathname !== '/' && <footer className="footer"><span>© {new Date().getFullYear()} {site.name}</span><span>Design com intenção. Desenvolvimento com cuidado.</span><div style={{display: 'flex', gap: '16px', alignItems: 'center'}}><a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>{site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>}{site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>}{site.email && <a href={`mailto:${site.email}`} aria-label="E-mail">E-mail</a>}<a href="#main">Voltar ao topo ↑</a></div></footer>}
    <ScrollRestoration />
  </>;
}

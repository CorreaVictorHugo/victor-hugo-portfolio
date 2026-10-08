import { Link } from 'react-router-dom';
export function NotFound() {
  return <main id="main" className="section not-found"><span className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</span><h1 tabIndex={-1}>Vamos voltar<br /><em>ao início?</em></h1><Link to="/">Ir para a homepage ↗</Link></main>;
}

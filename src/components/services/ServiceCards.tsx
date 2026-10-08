import { useState } from 'react';
import { site } from '../../content/site';
import './service-cards.css';

export function ServiceCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">02 / SERVIÇOS</span>
        <h2 id="services-title">Da sua ideia<br /><em>para a web.</em></h2>
      </div>
      <div className="service-cards">
        {site.services.map((service, index) => (
          <article
            key={service.title}
            className={`sc-card ${expanded === service.title ? 'sc-card--expanded' : ''}`}
            onMouseEnter={() => setExpanded(service.title)}
            onMouseLeave={() => setExpanded(null)}
            data-reveal
          >
            <div className="sc-card__number">
              <span className="muted">0{index + 1}</span>
            </div>
            <div className="sc-card__content">
              <h3 className="sc-card__title">{service.title}</h3>
              <p className="sc-card__desc">{service.text}</p>
            </div>
            <div className="sc-card__expand">
              <span className="sc-card__expand-text">
                {service.title === 'Landing pages' && 'Página única focada em conversão. Ideal para lançamentos, campanhas e captação de leads.'}
                {service.title === 'Sites institucionais' && 'Presença digital completa. Apresenta sua empresa, equipe, serviços e canais de contato.'}
                {service.title === 'Redesign' && 'Renovação visual e de experiência. Mantém o que funciona, melhora o que não funciona.'}
                {service.title === 'Aplicações web' && 'Sistemas interativos sob medida. Dashboards, painéis, ferramentas internas e SaaS.'}
              </span>
              <span className="sc-card__arrow">→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
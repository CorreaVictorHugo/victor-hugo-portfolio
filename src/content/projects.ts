import type { Project } from '../types/project';

const image = (slug: string, title: string) => ({
  cover: `/images/projects/${slug}/cover.webp`,
  coverSmall: `/images/projects/${slug}/cover-720.webp`,
  coverWidth: 1440, coverHeight: 960,
  coverAlt: `Página inicial de ${title}, em versão desktop`,
  gallery: [{ src: `/images/projects/${slug}/detail.webp`, alt: `Detalhe da página de ${title}`, width: 1440, height: 960 }],
});

// Seleção autorizada: páginas web. Aplicações serão adicionadas posteriormente.
// Textos baseados nos repositórios, sem atribuir resultados comerciais.
//
// =====================================================================
// 📌 PARA ADICIONAR UM NOVO PROJETO:
// 1. Copie o bloco de exemplo abaixo e cole antes do colchete final (])
// 2. Preencha os campos e ajuste o `index` (posição: 01, 02, 03...)
// 3. Crie a pasta public/images/projects/SEU-SLUG/ com:
//      cover.webp (1440×960), cover-720.webp (720×480), detail.webp (1440×960)
// 4. Salve, teste com `npm run dev` e depois:
//      git add . && git commit -m "novo projeto" && git push  (deploy automático)
//
// BLOCO DE EXEMPLEO (descomente e edite):
//
//   {
//     slug: 'meu-projeto',                      // URL: /projects/meu-projeto (sem acento/espaço)
//     index: '07',                               // posição na lista
//     title: 'Nome do Projeto',                  // título no site
//     client: 'Nome do Cliente',                 // cliente (ou seu nome)
//     category: 'Landing page · Categoria',      // tipo — aparece no card
//     year: '2026',                              // ano
//     description: 'Resumo do projeto...',       // título da seção CONTEXTO
//     challenge: 'O desafio era...',             // seção "O desafio"
//     solution: 'A solução foi...',              // seção "A solução"
//     outcome: 'O resultado...',                 // seção "ENTREGA"
//     url: 'https://meu-projeto.vercel.app',     // botão "Visitar o site" (opcional)
//     repository: 'https://github.com/USER/repo',// botão "Ver repositório" (opcional)
//     placeholder: false,                        // false = usa imagens reais
//     tone: 'sage',                              // cor de fallback: 'sage' (roxo) ou 'clay' (amarelo)
//     ...image('meu-projeto', 'Nome do Projeto'), // ← slug igual ao de cima
//   },
//
// =====================================================================
export const projects: Project[] = [
  {
    slug: 'carol-lab-v3', index: '01', title: 'Carol Lab — V3',
    client: 'Carol Lab', category: 'Landing page · Diagnóstico veterinário', year: '2026',
    description: 'Uma apresentação digital para laboratório de diagnóstico veterinário, com serviços, exames e caminhos de contato em uma única página.',
    challenge: 'Organizar a comunicação do laboratório para que o visitante encontre os exames e compreenda as etapas de atendimento.',
    solution: 'Composição clara com fotografia em destaque, títulos editoriais, categorias de exames e uma sequência visual da solicitação ao resultado.',
    outcome: 'Uma página que reúne apresentação institucional, exames, processo de atendimento e contato em uma experiência contínua.',
    url: 'https://landing-page-carol-v3.vercel.app', repository: 'https://github.com/CorreaVictorHugo/landing_page_carol_V3',
    placeholder: false, tone: 'sage', ...image('carol-lab-v3', 'Carol Lab — V3'),
  },
  {
    slug: 'fast-cell', index: '02', title: 'Fast Cell',
    client: 'Fast Cell', category: 'Landing page · Peças e acessórios', year: '2025',
    description: 'Uma página comercial para apresentar peças, componentes e acessórios para celulares, com acesso direto ao atendimento.',
    challenge: 'Distribuir categorias de produtos e informações de compra em uma navegação simples para técnicos, assistências e visitantes.',
    solution: 'Identidade escura com acentos verdes, catálogo organizado por categorias, benefícios, perguntas frequentes e chamadas para WhatsApp.',
    outcome: 'Uma landing page responsiva com catálogo, apresentação da loja e acesso direto aos canais de atendimento.',
    url: 'https://fastcell.netlify.app/', repository: 'https://github.com/CorreaVictorHugo/Landing_Page_Fast_Cell',
    placeholder: false, tone: 'clay', ...image('fast-cell', 'Fast Cell'),
  },
  {
    slug: 'bushido', index: '03', title: 'Bushido Jiu-Jitsu',
    client: 'Bushido', category: 'Site institucional · Esporte', year: '2025',
    description: 'Uma experiência editorial para apresentar a identidade, a filosofia e a rotina de uma equipe de jiu-jitsu.',
    challenge: 'Comunicar a equipe como comunidade, dando espaço à sua identidade e aos princípios do treinamento.',
    solution: 'Fotografia em destaque, tipografia marcante e contraste entre preto, papel e vermelho. A narrativa passa por manifesto, pilares, rotina e memória.',
    outcome: 'Uma experiência institucional com identidade própria. O projeto está em desenvolvimento, com o acervo histórico e informações da equipe ainda em preparação.',
    url: 'https://bushido-jiu-jitsu-old-scholl.vercel.app/', repository: 'https://github.com/CorreaVictorHugo/site_bushido_jiu_jitsu',
    placeholder: false, tone: 'clay', ...image('bushido', 'Bushido Jiu-Jitsu'),
  },
  {
    slug: 'victor-automoveis', index: '04', title: 'Victor Automóveis',
    client: 'Victor Automóveis', category: 'Landing page · Serviços automotivos', year: '2024',
    description: 'Uma página para apresentar serviços de oficina e conduzir o visitante até a solicitação de atendimento.',
    challenge: 'Organizar serviços, etapas de avaliação e informações de contato em uma apresentação direta.',
    solution: 'Identidade automotiva em grafite e azul, seções de serviços e processo, além de formulário de contato com validação.',
    outcome: 'Uma landing page responsiva com apresentação dos serviços e fluxo de atendimento. A versão apresentada ainda utiliza dados demonstrativos de contato.',
    repository: 'https://github.com/CorreaVictorHugo/landing-page-mecanica',
    placeholder: false, tone: 'sage', ...image('victor-automoveis', 'Victor Automóveis'),
  },
  {
    slug: 'carol-lab-v2', index: '05', title: 'Carol Lab — V2',
    client: 'Carol Lab', category: 'Landing page · Versão V2', year: '2024',
    description: 'Uma segunda versão da apresentação do Carol Lab, centrada em análises veterinárias e informação para a rotina clínica.',
    challenge: 'Dar clareza à oferta de exames e ao fluxo de envio e resultado em uma página comercial.',
    solution: 'Seções de diferenciais, exames, processo, conteúdo para veterinários e contato, com hierarquia de leitura e chamadas distribuídas pela página.',
    outcome: 'Uma direção visual alternativa para o Carol Lab, com exames, processo de atendimento e informação para profissionais veterinários.',
    url: 'https://landin-page-carol-v2.vercel.app', repository: 'https://github.com/CorreaVictorHugo/landin_page_Carol_V2',
    placeholder: false, tone: 'clay', ...image('carol-lab-v2', 'Carol Lab — V2'),
  },
  {
    slug: 'carol-lab-v1', index: '06', title: 'Carol Lab — Caroline',
    client: 'Carol Lab', category: 'Landing page · Versão Caroline', year: '2023',
    description: 'Uma proposta de apresentação para o Carol Lab, com foco em exames e diagnóstico veterinário.',
    challenge: 'Estruturar a presença digital do laboratório com informação institucional, oferta de exames e canais de atendimento.',
    solution: 'Composição com hero, categorias de exames, etapas do processo, seção institucional e área de contato.',
    outcome: 'Uma proposta de página comercial que reúne exames, conteúdo institucional e canais de atendimento do laboratório.',
    url: 'https://landing-page-caroline-sigma.vercel.app/', repository: 'https://github.com/CorreaVictorHugo/Landing_Page_Caroline',
    placeholder: false, tone: 'sage', ...image('carol-lab-v1', 'Carol Lab — Caroline'),
  },
];

# Decisões técnicas e estado da implementação

## Base

React, TypeScript, Vite, React Router, CSS próprio e GSAP. Conteúdo em
`src/content`, com contratos em `src/types`. Não há sincronização automática
com o GitHub. Victor autorizou as páginas web; aplicações ficam para uma próxima etapa.

## Transição projeto → case

O primeiro protótipo usa View Transitions através do data router do React
Router. A composição selecionada recebe um `view-transition-name` único
somente durante a transição. Assim, a listagem e o hero podem compartilhar
a mesma identidade visual sem imagens duplicadas em overlays manuais.

Sem suporte à API, a navegação do router funciona normalmente. Reduced
motion desativa o pedido de transição. O botão de retorno aponta para
`/#work`; o histórico do navegador é preservado por ScrollRestoration.

GSAP Flip não foi adicionado ao protótipo: será considerado se a avaliação
com assets reais mostrar limitações. A escolha evita duas implementações
concorrentes antes de haver necessidade comprovada.

## Motion complementar

GSAP e ScrollTrigger gerenciam reveals e parallax moderado. Contextos são
revertidos no unmount e em mudanças de reduced motion. Parallax fica
restrito a telas maiores com ponteiro preciso. Não há scroll customizado,
cursor customizado ou loader artificial.

## Conteúdo provisório

Sete repositórios de páginas web substituíram os protótipos: Carol Lab V3,
Fast Cell, Bianca Cabral, Bushido, Victor Automóveis e duas outras versões
do Carol Lab. As versões são identificadas separadamente, sem tratá-las como
três clientes distintos. Capturas locais dos códigos públicos são otimizadas
em WebP com versões de capa de 720 e 1440 pixels.

`scripts/capture-projects.mjs` registra as fontes em `artifacts/project-sources.json`.
As cópias dos repositórios ficam em `.reference`, ignorada pelo Git e fora do build.
Os textos descrevem o conteúdo observado, sem métricas nem inferência de contratação.
Anos e contexto comercial ainda precisam de confirmação. Bushido e Victor
Automóveis possuem conteúdo provisório conforme seus próprios READMEs.
Textos comerciais são rascunhos. E-mail, WhatsApp, domínio e redes não fornecidos
permanecem pendentes; não há links falsos de contato.

## Apresentação da prévia com acabamento

Avisos de rascunho foram retirados da interface pública. Anos desconhecidos
permanecem TODO na fonte de conteúdo, mas não são exibidos. Os contatos ainda
não fornecidos são omitidos. Seus exemplos de configuração ficam comentados
em `src/content/site.ts`, conforme pedido de Victor.
Os screenshots mantêm sua proporção original no desktop e no mobile.
As fontes abertas DM Sans e Instrument Serif são servidas localmente por
Fontsource, eliminando a requisição de CSS ao Google Fonts.
O teste de transição verifica o nome compartilhado da imagem durante a
animação e seu encerramento, na abertura e no retorno. A demonstração está
salva em `artifacts/final-transition.webm`.

## Parallax durante a troca de rota

Os snapshots antigo e novo da imagem deslizam e variam de escala dentro de
uma moldura recortada. A moldura segue a interpolação nativa dos bounds;
o movimento interno em outro ritmo cria profundidade. A direção se inverte
no retorno à home. Após revisão de Victor, deslocamento desktop de 26%,
mobile de 10%; zoom de 1.58 e 1.24 respectivamente. A duração é de 1400 ms,
com easing da imagem diferente do easing da moldura. Reduced motion continua desativando a transição.
As regras específicas por projeto são geradas a partir do conteúdo centralizado.

## Combinação com o portfólio existente

Referência adicional fornecida por Victor: https://web-site-portifoliovictorhugo.vercel.app/.
Foram aproveitados os conceitos de navegação compacta, acento azul e organização
lateral dos trabalhos, preservando o tema claro e os textos comerciais atuais.
O hero tem uma malha discreta de fundo, sem canvas ou seção técnica.

Após esclarecimento de Victor, os projetos ficam em linhas empilhadas:
imagem horizontal à esquerda, nome e categoria à direita. No celular o texto
fica abaixo da imagem. Não há carrossel. O parallax e os textos permanecem.

O parallax da transição foi ampliado para 26%/zoom 1.58 no desktop e 10%/zoom
1.24 no mobile, com duração de 1400 ms. A expansão de uma capa pequena para
o hero reforça a diferença de escala. Reduced motion mantém navegação imediata.

## Publicação e SEO

A hospedagem deve servir `index.html` como fallback para rotas desconhecidas,
permitindo acesso direto e refresh em `/projects/:slug`. Domínio, canonical,
Open Graph com imagem, sitemap e robots dependem dos dados finais e do deploy.
Os metadados iniciais não substituem uma estratégia de prerender para os cases
caso compartilhamento social por projeto seja necessário.

## Verificação

Ver `08_VALIDATION.md` para os resultados realmente executados e pendências.

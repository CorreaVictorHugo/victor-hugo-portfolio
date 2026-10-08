# Continuidade — portfólio Victor Hugo

Atualizado em 06/10/2026, após aprovação da prévia da seção de contato.

## Como retomar com o assistente

Mensagem pronta para copiar:

> Continue este projeto a partir de CONTINUAR_AQUI.md. Esse documento resume o estado atual e as decisões aprovadas. Leia apenas este documento inicialmente e depois os arquivos necessários à tarefa. Não precisa reler todos os documentos nem refazer a análise inicial. Preserve o layout e os textos aprovados. Antes de mudar algo, aguarde meu próximo pedido.

Este arquivo é o ponto de entrada para **continuar** o trabalho. A ordem de leitura
do README e dos documentos 00–06 foi cumprida no início da implementação.
As decisões mais recentes abaixo atualizam aquela especificação inicial.

## Estado atual e decisões aprovadas

O site é um portfólio comercial de web design e desenvolvimento de Victor Hugo.
Já está implementado e funciona localmente. Não há nova tarefa pendente de
implementação: o usuário aprovou a última prévia dizendo “ficou bom”.

- Identidade editorial clara: fundo bege, texto escuro, detalhes azuis e grid discreto.
- Fontes locais DM Sans e Instrument Serif; preservar os textos atuais sobre trabalho com web.
- Homepage: apresentação, projetos, serviços, sobre, processo e contato.
- Projetos **um abaixo do outro**, com imagens horizontais à esquerda e nomes à direita no desktop. No celular, texto abaixo da imagem. O usuário usou a palavra “carrossel”, mas o layout final aprovado é essa lista; não reconstruir uma faixa horizontal automaticamente.
- Durante a rolagem, as imagens dos projetos “saltam” para frente: escala de 0,78 para 1,16 no desktop / 1,10 no celular, inclinação inicial de 14°, deslocamento vertical, impulso e sombra. O efeito repete ao entrar e sair da área de destaque.
- Ao abrir um projeto, a imagem conecta à capa do case por View Transitions, com efeito de profundidade. A navegação usa React Router.
- **Contato aprovado:** revelação como cortina no desktop, nome “VICTOR HUGO” gigante ao fundo, brilho azul, grid, faixa inclinada em movimento e botões com interação magnética. Textos: “Uma ideia em mente? Vamos dar forma.”
- Contato tem links reais para GitHub, retorno aos projetos e topo. A faixa pode ser pausada.
- No celular e com movimento reduzido, o contato fica no fluxo normal da página. Animações respeitam `prefers-reduced-motion`.
- O rodapé simples continua nos cases; na homepage, o contato inclui os créditos para evitar duplicação.
- **Não preencher e-mail ou WhatsApp agora.** O usuário pediu explicitamente para deixar o código comentado. Os campos estão vazios em `src/content/site.ts`.

## Projetos reais incluídos

GitHub do usuário: https://github.com/CorreaVictorHugo

Foram selecionadas todas as páginas web disponíveis; aplicações privadas serão
adicionadas pelo usuário depois. A seleção já foi autorizada, não precisa perguntar de novo.

1. Carol Lab — V3 (`carol-lab-v3`)
2. Fast Cell
3. Bianca Cabral
4. Bushido
5. Victor Automóveis
6. Carol Lab — V2
7. Carol Lab — Caroline (V1)

Os dados exatos, slugs e links estão em `src/content/projects.ts`; usar esse
arquivo como fonte de verdade. Screenshots reais estão em
`public/images/projects`, com versões WebP. Não inventar datas ou contexto
contratado/pessoal. Anos ainda não confirmados ficam ocultos da interface.

Referência anterior fornecida pelo usuário:
https://web-site-portifoliovictorhugo.vercel.app/
Foi consultada para inspiração; não é a publicação desta implementação.

## Stack e mapa de arquivos

React 19, TypeScript, Vite 8, React Router 7, GSAP 3 + ScrollTrigger,
CSS próprio, ESLint, Playwright e Sharp. Versões exatas no `package-lock.json`.

| Arquivo | Responsabilidade |
| --- | --- |
| `src/pages/Home.tsx` | Composição da homepage |
| `src/content/site.ts` | Textos, serviços, GitHub e contatos |
| `src/content/projects.ts` | Conteúdo dos sete projetos |
| `src/components/projects/ProjectLink.tsx` | Imagem e nome de cada projeto |
| `src/components/projects/ProjectVisual.tsx` | Capas e identificação para transição |
| `src/motion/usePageMotion.ts` | Entradas e salto dos projetos ao rolar |
| `src/motion/ProjectTransitionStyles.tsx` | Transição da capa para o case |
| `src/motion/useReducedMotion.ts` | Preferência de movimento reduzido |
| `src/components/layout/CinematicContact.tsx` | Contato com cortina e interações |
| `src/components/layout/cinematic-contact.css` | Visual e responsividade do contato |
| `src/components/layout/Layout.tsx` | Navegação, menu mobile, rodapé dos cases |
| `src/styles/global.css` | Tokens, layout e estilos gerais |
| `src/pages/ProjectCase.tsx` | Página individual de projeto |
| `src/app/router.tsx` | Rotas `/`, `/projects/:slug` e fallback |
| `tests/navigation.spec.ts` | Conteúdo, navegação, menu e responsividade |
| `tests/transition.spec.ts` | Abertura e retorno com transição |

## O que foi descartado

O usuário enviou por engano um componente de parallax com montanhas e o título
“Parallax”. **Foi totalmente descartado**: rota `/demo/parallax`, componente,
estilos, configuração shadcn/Tailwind e dependências adicionadas exclusivamente
para esse exemplo foram removidos. Não reinstalar Tailwind, shadcn ou Lenis
por causa daquele pedido antigo. O contato atual foi adaptado em CSS próprio
a partir de outro snippet de rodapé enviado depois.

## Levar para a máquina do trabalho

Copie o projeto atualizado inteiro, incluindo `src`, `public`, `docs`, `tests`,
`scripts`, arquivos de configuração, `package.json` e `package-lock.json`.
Inclua este documento. Não precisa copiar `node_modules`, `dist`,
`test-results`, `playwright-report` ou `.reference`.
`artifacts` contém capturas de revisão e é opcional; as imagens usadas pelo site
estão em `public`, que precisa ser levado.

O arquivo de continuidade não substitui o código. A nova máquina precisa receber
a versão atual dos arquivos. Este trabalho não publicou o site nem enviou as
alterações para um repositório remoto automaticamente.

Na nova máquina, tenha Node.js compatível com a versão de Vite do projeto e npm.
Na pasta do projeto:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5180 --strictPort
```

Abra http://127.0.0.1:5180/ . A seção de projetos fica em `/#work` e o contato
em `/#contact`. O servidor precisa continuar em execução. O endereço local da
máquina de casa não transfere o projeto para a máquina do trabalho.

## Validação e prévias

Último build e lint passaram. Os 11 testes Playwright passaram após a integração
do contato. Os ajustes finais de botões magnéticos e alinhamento da âncora foram
verificados com novo build/lint e checagem no Chromium. Desktop e celular foram
inspecionados; pausa da faixa, retorno aos projetos e movimento reduzido verificados.

```sh
npm run build
npm run lint
npx playwright install chromium
npm run test:e2e
```

Execute lint antes ou depois dos testes, evitando concorrência: o Playwright
recria `test-results`, o que já causou uma falha de leitura temporária no ESLint.

Capturas opcionais: `artifacts/cinematic-contact-desktop.png`,
`artifacts/cinematic-contact-mobile.png` e `artifacts/projects-pop-strong.png`.
Arquivos antigos em `artifacts` podem representar versões descartadas.

## Pendências futuras, sem iniciar automaticamente

- Usuário informar contatos e novos projetos/aplicações quando desejar.
- Confirmar anos e contexto dos projetos, sem inventar conteúdo.
- Definir domínio e publicação, metadados finais e configuração de rotas no host.
- Ampliar QA para Safari/Firefox, dispositivos reais, desempenho e cliques rápidos durante transições.

Os documentos 07 e 08 registram decisões e validações anteriores. Consulte os
documentos originais somente quando a tarefa seguinte exigir informação que
este resumo e o código atual não oferecem.

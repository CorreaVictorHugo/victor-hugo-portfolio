# Validação da primeira implementação

## Verificado

- TypeScript e build de produção passaram.
- ESLint passou.
- Chromium: abertura de case, refresh, próximo projeto, histórico e retorno.
- Reduced motion: conteúdo acessível, teclado e foco no título após navegação.
- Homepage e case sem overflow horizontal em 360, 768, 1024, 1440 e 1920 px.
- Menu mobile: abertura, Escape, navegação e fechamento.
- Rota desconhecida: página de fallback e retorno à homepage.
- Prévia desktop inspecionada visualmente no navegador integrado.
- Sete cases com capas e imagens de galeria carregadas, sem respostas HTTP de erro.
- Dez testes de navegação e conteúdo passaram no Chromium após a seleção.
- Após o acabamento, onze testes passaram, incluindo a transição com
  elemento compartilhado e vídeo da abertura/retorno.
- Projetos em linhas empilhadas, imagem à esquerda e texto à direita no desktop;
  no celular, texto abaixo. Transição com parallax preservada.

## Pendências para conclusão do produto

- Confirmação de contexto contratado/pessoal e anos dos projetos selecionados.
- Textos finais, branding e contatos. Screenshots dos sete sites já incluídos.
- Validação visual da transição usando os screenshots reais.
- Firefox, Edge e Safari; dispositivos touch reais.
- Auditoria de contraste, Core Web Vitals, conexão lenta e frames de animação.
- Auditoria final de fontes e imagens. DM Sans e Instrument Serif são servidas
  localmente via Fontsource, em WOFF2 com `font-display: swap`.
- Domínio, metadados finais, sitemap, robots e configuração de rotas no deploy.
- Navegação interrompida no meio de uma transição: a API pode cancelar a
  animação. É necessário ampliar QA de cliques rápidos e refresh nesse estado.

O primeiro protótipo não representa a conclusão do conteúdo nem publicação.

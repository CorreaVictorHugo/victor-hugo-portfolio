# 05 — Portfolio Specification

## Product Requirement

Criar um portfólio comercial de desenvolvimento web visualmente sofisticado e orientado à apresentação de trabalhos para clientes.

## Prioridades

### P0 — Obrigatório

- light mode;
- homepage;
- selected projects;
- project case routes;
- transição sofisticada entre projeto e case;
- parallax;
- responsividade;
- contato;
- acessibilidade básica;
- reduced motion;
- conteúdo facilmente editável;
- boa performance.

### P1 — Importante

- next-project transition;
- smooth scrolling;
- gallery editorial;
- animações de texto;
- process section;
- services section.

### P2 — Opcional

- WebGL;
- efeitos experimentais;
- loader complexo;
- áudio;
- shaders.

P2 só deve ser considerado depois de P0/P1 estáveis.

## Exclusões explícitas

Não implementar:

- cursor customizado;
- seção "Technologies";
- logos de frameworks como seção de destaque;
- skill bars;
- percentual de conhecimento;
- currículo completo;
- dark mode como visual padrão;
- clone pixel-perfect da referência.

## Dados

Projetos devem vir de estrutura centralizada.

Exemplo conceitual:

```js
{
  slug,
  index,
  title,
  client,
  category,
  year,
  cover,
  description,
  challenge,
  solution,
  gallery,
  url
}
```

Pode ser JS/TS/JSON/MDX conforme arquitetura escolhida.

Adicionar projeto não deve exigir alterar lógica de animação.

## Projetos

Não inventar projetos.

Criar placeholders marcados como TODO até assets/conteúdo serem fornecidos.

Projetos conhecidos podem ser sugeridos durante configuração, mas só inserir como conteúdo final após confirmação.

## Conteúdo

Separar:

- content/data;
- components;
- motion;
- pages;
- styles.

## SEO

Implementar:

- title;
- description;
- canonical quando aplicável;
- Open Graph;
- favicon placeholders;
- semantic headings;
- sitemap/robots conforme deploy.

## Acessibilidade

- navegação por teclado;
- focus-visible;
- alt text;
- landmarks;
- reduced motion;
- links semanticamente corretos;
- contraste.

## Performance

Evitar que o objetivo visual destrua Core Web Vitals.

Priorizar:
- image optimization;
- code splitting;
- font optimization;
- lazy loading;
- animações GPU-friendly.

## Browser Support

Versões modernas de:

- Chrome;
- Edge;
- Firefox;
- Safari.

Transitions avançadas devem possuir fallback.

## Responsive

Breakpoints devem responder ao conteúdo, não apenas dispositivos específicos.

Validar pelo menos:

- ~360px;
- ~768px;
- ~1024px;
- ~1440px;
- telas maiores.

## Qualidade

Não considerar pronto enquanto:

- não houver console errors;
- navegação não quebrar ao refresh;
- animações não duplicarem após route changes;
- mobile estiver utilizável;
- reduced motion funcionar;
- links e CTAs funcionarem.

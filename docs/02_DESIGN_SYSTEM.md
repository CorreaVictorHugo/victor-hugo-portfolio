# 02 — Design System

## 1. Princípios

1. Light first.
2. Alto contraste.
3. Muito espaço negativo.
4. Tipografia como elemento visual.
5. Projetos e screenshots fornecem a maior parte das cores.
6. Poucos elementos decorativos.
7. Movimento não deve compensar layout fraco.

## 2. Cores — proposta inicial

Tokens devem ser CSS variables.

```css
:root {
  --color-bg: #F3F0E9;
  --color-surface: #FFFFFF;
  --color-text: #141414;
  --color-text-muted: #6E6E68;
  --color-border: #D8D5CE;
  --color-accent: #35B7E8;
}
```

A cor accent é provisória e deve ser fácil de substituir globalmente.

Não espalhar hex codes pelos componentes.

## 3. Tipografia

Buscar contraste editorial entre display e texto funcional.

### Roles

- Display XL — hero;
- Display — títulos de projeto;
- H1;
- H2;
- H3;
- Body Large;
- Body;
- Small;
- Label;
- Project Index.

Preferir tipografias web licenciadas/open-source.

Não copiar fontes proprietárias da referência sem verificar licença.

## 4. Escala responsiva

Preferir `clamp()`.

Exemplo:

```css
font-size: clamp(3.5rem, 10vw, 10rem);
```

Evitar dezenas de media queries apenas para tipografia.

## 5. Spacing

Base: 8px.

Escala:

- 4
- 8
- 16
- 24
- 32
- 48
- 64
- 96
- 128
- 160

## 6. Layout

Desktop:

- conteúdo fluido;
- margens generosas;
- grid de 12 colunas quando necessário;
- largura máxima para textos longos;
- imagens podem extrapolar o container editorial.

Tablet:

- reduzir offsets;
- preservar hierarquia.

Mobile:

- layout prioritariamente vertical;
- não tentar reproduzir literalmente efeitos desktop;
- preservar narrativa e legibilidade.

## 7. Bordas

Usar bordas finas e discretas.

Evitar excesso de cards encapsulados.

## 8. Radius

Baixo ou moderado.

Imagens de projetos podem utilizar radius discreto.

Evitar estética excessivamente "SaaS".

## 9. Sombras

Usar apenas quando necessárias para profundidade.

Parallax e sobreposição podem criar profundidade sem sombras fortes.

## 10. Componentes principais

### Navigation

- minimalista;
- logo/nome;
- Work;
- About;
- Contact;
- menu mobile dedicado.

### Project Showcase

Deve suportar:

- índice;
- título;
- categoria;
- ano;
- imagem;
- link;
- motion hooks.

### CTA

Texto grande e direto.

### Buttons / Links

Estados:

- default;
- hover;
- focus-visible;
- active;
- disabled quando aplicável.

### Footer

Simples.

Pode conter:

- contato;
- redes;
- copyright;
- back to top.

## 11. Imagens

Screenshots dos projetos são assets principais.

Requisitos:

- formatos modernos quando possível;
- `srcset`/responsive images;
- lazy loading fora do primeiro viewport;
- dimensões declaradas;
- evitar layout shift.

## 12. Acessibilidade visual

- contraste WCAG adequado;
- foco visível;
- não depender apenas de cor;
- textos nunca devem existir somente dentro de animações/canvas.

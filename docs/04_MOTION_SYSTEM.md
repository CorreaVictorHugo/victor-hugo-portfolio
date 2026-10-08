# 04 — Motion System

## 1. Importância

Motion é requisito funcional deste projeto, não decoração posterior.

A principal inspiração do projeto está na qualidade das transições e na sensação contínua da referência.

## 2. Princípios

1. Movimento deve indicar relação espacial.
2. Objetos relacionados devem parecer conectados.
3. Animação nunca deve impedir navegação.
4. Performance é parte do design.
5. Mobile pode usar versões simplificadas.
6. Reduced motion é obrigatório.

## 3. Stack sugerida

Avaliar antes de instalar tudo.

Preferência:

- GSAP;
- GSAP ScrollTrigger;
- React Router ou solução equivalente;
- Framer Motion somente onde trouxer benefício real;
- smooth scrolling apenas se não prejudicar acessibilidade/performance.

WebGL/Three.js NÃO é requisito.

Adicionar WebGL somente se houver um efeito claramente definido que justifique custo e complexidade.

## 4. Smooth Scroll

Objetivo:
movimento fluido sem sensação pesada.

Não alterar agressivamente comportamento nativo.

Validar:
- mouse wheel;
- trackpad;
- teclado;
- touch;
- anchor links.

## 5. Hero Reveal

Sequência sugerida:

1. página pronta;
2. máscara/overlay revela viewport;
3. headline entra;
4. supporting copy;
5. elementos secundários;
6. usuário assume controle.

Não exceder duração desnecessária.

## 6. Text Reveal

Preferências:

- clipping/mask;
- translateY;
- opacity secundária.

Evitar animar cada caractere em todo o site.

## 7. Image Reveal

Possíveis técnicas:

- clip-path;
- overflow mask;
- scale;
- translate;
- shared element transition.

Evitar blur pesado em grandes imagens.

## 8. Parallax

Aplicar principalmente a:

- hero;
- imagens de projetos;
- detalhes editoriais;
- gallery.

Amplitude moderada.

O usuário deve perceber profundidade, não dificuldade de leitura.

## 9. Project Hover

Desktop:

Ao hover:
- imagem pode alterar escala discretamente;
- título reage;
- metadados mudam;
- indicador pode aparecer.

Cursor continua sendo o cursor padrão.

Não criar follower, blob ou cursor customizado.

## 10. Project Open Transition

REQUISITO DE ALTA PRIORIDADE.

Objetivo:
fazer a imagem/listagem selecionada parecer se transformar no hero do projeto.

Fluxo conceitual:

```text
PROJECT LIST
     ↓
selected visual receives priority
     ↓
surrounding UI exits/reduces
     ↓
selected image changes bounds/scale
     ↓
route changes while visual continuity is maintained
     ↓
PROJECT HERO
```

Implementação pode usar:

- shared layout;
- FLIP;
- View Transitions API com fallback;
- GSAP Flip;
- combinação controlada.

Escolher a abordagem mais robusta após protótipo técnico.

## 11. Project Close / Back

Idealmente reversível conceitualmente.

Não exigir reversão perfeita se isso gerar fragilidade.

Priorizar transição convincente e consistente.

## 12. Next Project Transition

No fim do case:

- revelar próximo projeto;
- usuário aciona;
- visual atual sai;
- próximo visual assume viewport;
- conteúdo do próximo case entra.

## 13. Scroll-triggered Animations

Usar gatilhos claros.

Evitar dezenas de listeners independentes.

Preferir timelines e lifecycle cleanup.

Todo ScrollTrigger deve ser destruído corretamente no unmount.

## 14. Timing Tokens

Valores iniciais:

```text
instant       120ms
fast          200ms
normal        400ms
slow          700ms
cinematic     1000–1400ms
```

São guias, não números absolutos.

## 15. Easing

Centralizar easings.

Sugestões conceituais:

- standard;
- enter;
- exit;
- cinematic.

Não usar easings aleatórios em cada componente.

## 16. Reduced Motion

Detectar:

```css
@media (prefers-reduced-motion: reduce)
```

Nesse modo:

- remover parallax;
- remover smooth scroll customizado;
- reduzir transforms;
- manter fades curtos quando apropriado;
- garantir navegação imediata.

## 17. Mobile

Não forçar animações desktop em touch.

Remover:
- hover-only interactions;
- movimentos excessivos;
- efeitos que causem jank.

Preservar:
- reveal;
- hierarquia;
- transições leves;
- narrativa.

## 18. Performance Target

Buscar:

- 60 FPS em hardware adequado;
- transforms e opacity para animações frequentes;
- evitar layout thrashing;
- evitar animação de propriedades caras;
- lazy load de assets;
- cleanup correto.

## 19. Regra

Antes de implementar todas as páginas, construir um protótipo com:

Home project item
→ click
→ project transition
→ project hero
→ back

Validar essa transição primeiro.

Ela é uma das características mais importantes do produto.

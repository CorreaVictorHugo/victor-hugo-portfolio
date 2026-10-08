# 06 — Implementation Plan

## Regra geral

Não implementar tudo em uma única passagem.

A maior incerteza técnica é a transição entre projeto e case. Resolver isso cedo.

## Fase 0 — Leitura e planejamento

Codex deve:

1. ler todos os documentos;
2. resumir requisitos;
3. identificar ambiguidades;
4. propor stack;
5. propor estrutura;
6. listar dependências;
7. não começar com efeitos experimentais.

## Fase 1 — Bootstrap

Criar projeto.

Sugestão inicial:

- React;
- Vite;
- TypeScript;
- CSS/Tailwind conforme decisão;
- router;
- GSAP.

Não adicionar bibliotecas sem função definida.

## Fase 2 — Foundations

Implementar:

- tokens;
- typography;
- reset;
- containers;
- grid;
- breakpoints;
- focus;
- data model.

## Fase 3 — Static Experience

Construir sem motion complexo:

- navigation;
- hero;
- project list;
- services;
- about;
- process;
- contact;
- project case.

Validar hierarquia primeiro.

## Fase 4 — Critical Motion Prototype

Implementar SOMENTE:

```text
project item
→ project open transition
→ project hero
→ back
```

Testar abordagens.

Critérios:

- robusto;
- não pisca;
- refresh funciona;
- back funciona;
- resize não quebra;
- cleanup correto;
- fallback possível.

Documentar decisão técnica.

## Fase 5 — Motion System

Adicionar progressivamente:

- hero reveal;
- text reveal;
- image reveal;
- parallax;
- scroll timelines;
- project hover;
- next project.

## Fase 6 — Responsive

Revisar cada seção.

Não apenas "diminuir desktop".

Criar comportamento apropriado para touch.

## Fase 7 — Accessibility

Validar:

- keyboard;
- focus;
- headings;
- alt;
- reduced motion;
- semantic HTML.

## Fase 8 — Performance

Auditar:

- imagens;
- fontes;
- bundle;
- long tasks;
- animation frame drops;
- layout shifts.

## Fase 9 — Content

Substituir TODOs pelos dados reais fornecidos.

Não inventar métricas, clientes ou depoimentos.

## Fase 10 — QA

Checklist:

- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Edge
- [ ] Safari quando disponível
- [ ] Mobile viewport
- [ ] Touch
- [ ] Keyboard
- [ ] prefers-reduced-motion
- [ ] direct URL project route
- [ ] browser back
- [ ] refresh
- [ ] resize
- [ ] slow connection
- [ ] no console errors
- [ ] no broken assets

## Definition of Done

O projeto só está pronto quando:

1. experiência visual é coerente;
2. transição de projetos funciona de forma confiável;
3. identidade não parece cópia literal da referência;
4. light mode está consistente;
5. não existe cursor customizado;
6. não existe seção de tecnologias;
7. projetos são fáceis de adicionar;
8. mobile funciona;
9. reduced motion funciona;
10. build de produção passa sem erros.

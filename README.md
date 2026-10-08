# Portfolio Web — Victor Hugo

Pacote de especificação para implementação com Codex.

## Objetivo

Construir um portfólio comercial de web design/desenvolvimento para apresentar trabalhos feitos para clientes.

A principal referência de experiência e motion é:

https://ewan-kerboas.fr/

A referência NÃO deve ser clonada. Ela deve orientar ritmo, composição, transições, navegação por projetos e sensação de continuidade. O resultado precisa ter identidade própria.

## Ordem de leitura

1. `docs/00_PROJECT_CONTEXT.md`
2. `docs/01_REFERENCE_ANALYSIS.md`
3. `docs/02_DESIGN_SYSTEM.md`
4. `docs/03_APP_FLOW.md`
5. `docs/04_MOTION_SYSTEM.md`
6. `docs/05_PORTFOLIO_SPEC.md`
7. `docs/06_IMPLEMENTATION_PLAN.md`

## Instrução inicial para o Codex

Leia integralmente todos os arquivos da pasta `docs/` antes de implementar.

Trate `00_PROJECT_CONTEXT.md` e `05_PORTFOLIO_SPEC.md` como requisitos de produto, `02_DESIGN_SYSTEM.md` como fonte de verdade visual e `04_MOTION_SYSTEM.md` como fonte de verdade para animações.

Não copie código, textos, imagens, identidade visual ou assets do site de referência.

Antes de implementar, apresente:
- resumo do entendimento;
- arquitetura proposta;
- dependências necessárias;
- estrutura de pastas;
- etapas de implementação.

Depois implemente por fases, validando responsividade, acessibilidade e performance.

## Executar a implementação local

```sh
npm install
npm run dev
```

Outros comandos:

- `npm run build`: verificação TypeScript e build de produção.
- `npm run lint`: análise estática.
- `npm run test:e2e`: testes locais de navegação e responsividade com Chromium.
  Instale o navegador com `npx playwright install chromium` se necessário.

Os projetos e contatos ficam em `src/content`. As páginas web selecionadas
estão incluídas com screenshots locais; aplicações serão adicionadas depois.
Anos, contexto comercial e contatos permanecem TODO até confirmação.

Decisões técnicas: `docs/07_TECHNICAL_DECISIONS.md`.
Resultados de validação e pendências: `docs/08_VALIDATION.md`.

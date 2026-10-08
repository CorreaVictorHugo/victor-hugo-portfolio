# 03 — App Flow

## Sitemap inicial

```text
/
├── Home
├── Work / Projects
├── About
├── Services
└── Contact

/projects/:slug
└── Project Case
```

As seções podem coexistir em uma homepage longa, enquanto os projetos possuem rotas próprias.

## Home

### 1. Loader

Somente se necessário.

Não criar loader artificial para esconder bundle pesado.

Se utilizado:
- curto;
- elegante;
- não bloquear desnecessariamente.

### 2. Hero

Objetivo:
comunicar imediatamente criação de experiências/sites.

Conteúdo provisório:

```text
TODO: headline
Web Design & Development
TODO: supporting copy
```

Hero deve introduzir o sistema de movimento.

### 3. Selected Work

Principal seção do site.

Mostrar poucos projetos fortes.

Cada projeto contém:

- número;
- título;
- categoria;
- ano;
- imagem principal;
- CTA implícito/explícito.

### 4. Services

Sugestão inicial:

- Landing Pages
- Sites Institucionais
- Redesign
- Aplicações Web

Não exibir lista de frameworks.

### 5. About

Texto curto.

Foco:
- quem está por trás do trabalho;
- forma de trabalhar;
- atenção ao projeto do cliente.

Evitar currículo completo.

### 6. Process

Exemplo:

1. Discovery
2. Direction
3. Design
4. Development
5. Delivery

Pode ser alterado posteriormente.

### 7. Contact

CTA forte.

```text
Have a project in mind?
Let's build it.
```

Versão final pode ser PT-BR.

Links reais permanecem TODO até fornecidos.

## Project Case

### Hero

- índice;
- título;
- categoria;
- ano;
- imagem principal.

### Context

- cliente;
- desafio;
- objetivo.

### Solution

Explicar abordagem sem jargão desnecessário.

### Gallery

Screenshots grandes.

Possibilidades:

- fullscreen;
- duas colunas;
- sticky image;
- parallax suave.

### Outcome

Resultados ou entrega.

Não inventar métricas.

### Next Project

Transição para próximo projeto deve fazer parte da experiência.

## Navegação

Usuário deve conseguir:

Home
→ projeto
→ case
→ próximo projeto
→ voltar aos projetos

sem sensação de quebra brusca.

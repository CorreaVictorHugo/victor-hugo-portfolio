# 📝 Como editar o site

Guia rápido de onde fazer cada alteração. Após editar, o site atualiza assim que você der o push (deploy automático).

---

## 1️⃣ Contatos (WhatsApp, e-mail, Instagram...)

**Arquivo:** `src/content/site.ts`

```ts
export const site = {
  name: 'Victor Hugo',

  // Textos principais do site (hero, seções)
  headline: ['Design com intenção.', 'Sites com presença.'],
  intro: 'Web design e desenvolvimento para transformar ideias em experiências digitais claras, marcantes e fáceis de usar.',

  // 🔗 Redes sociais — troque pelos seus links reais
  github: 'https://github.com/CorreaVictorHugo',
  linkedin: 'https://linkedin.com/in/SEU-USUARIO',      // ← seu LinkedIn
  instagram: 'https://instagram.com/SEU-USUARIO',       // ← seu Instagram

  // ✉️ Contatos — APAGUE os placeholders e coloque os seus
  email: 'seu-email@gmail.com',                         // ← seu e-mail real
  whatsapp: 'https://wa.me/55DDDNUMERO',                // ← seu WhatsApp (formato: 55 + DDD + número)
  domain: 'seu-site.com',                               // ← seu domínio (se tiver)

  // Sobre (seção 03 / SOBRE)
  about: 'Sou Victor Hugo e trabalho com design e desenvolvimento de páginas web...',

  // Serviços (seção 02 / SERVIÇOS) — pode adicionar, remover ou editar
  services: [
    { title: 'Landing pages', text: 'Uma página com foco na sua oferta e no próximo passo do visitante.' },
    { title: 'Sites institucionais', text: 'Uma presença digital que apresenta sua empresa com clareza.' },
    { title: 'Redesign', text: 'Uma nova direção para o visual e a experiência do seu site.' },
    { title: 'Aplicações web', text: 'Interfaces pensadas para as necessidades do seu negócio.' },
    // ✨ Para adicionar um novo serviço, copie uma linha acima e edite:
    // { title: 'SEO', text: 'Seu site encontrado no Google.' },
  ],

  // Etapas do processo (seção 04 / PROCESSO)
  process: ['Descoberta', 'Direção', 'Design', 'Desenvolvimento', 'Entrega'],
};
```

**Onde aparece no site:**
- `email` e `whatsapp` → botões da seção de contato (CinematicContact)
- `linkedin`, `instagram`, `github` → links do rodapé (páginas de projeto)
- WhatsApp usa formato internacional: `55` (Brasil) + DDD + número sem espaços
  - Exemplo: `(11) 99999-9999` → `https://wa.me/5511999999999`

---

## 2️⃣ Adicionar um novo projeto

**Arquivo:** `src/content/projects.ts`

Copie o bloco abaixo e cole dentro de `export const projects: Project[] = [...]`,
ajuste `index` (posição na lista) e preencha seus dados:

```ts
{
  slug: 'meu-novo-projeto',          // ← URL do projeto: /projects/meu-novo-projeto (SEM acento/espaço)
  index: '07',                        // ← número da posição (01, 02, 03...)
  title: 'Nome do Projeto',           // ← título que aparece no site
  client: 'Nome do Cliente',          // ← cliente (ou seu próprio nome)
  category: 'Landing page · Categoria', // ← tipo do projeto (aparece no card)
  year: '2026',                       // ← ano de publicação

  // Textos do case (página interna do projeto)
  description: 'Uma página para...',           // resumo (título do case)
  challenge: 'O desafio era...',               // seção "O desafio"
  solution: 'A solução foi...',                // seção "A solução"
  outcome: 'O resultado...',                   // seção "ENTREGA"

  // Links (opcional — apague a linha se não tiver)
  url: 'https://meu-projeto.vercel.app',       // botão "Visitar o site"
  repository: 'https://github.com/USER/repo',  // botão "Ver repositório"

  placeholder: false,                  // false = tem imagem, true = usa placeholder
  tone: 'sage',                       // cor do card sem imagem: 'sage' (roxo) ou 'clay' (amarelo)
  ...image('meu-novo-projeto', 'Nome do Projeto'), // ← deve igualar o slug acima
}
```

### 📁 Imagens do projeto

Crie a pasta: `public/images/projects/SEU-SLUG/` com 3 arquivos:

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| `cover.webp` | 1440×960 | Capa (desktop) |
| `cover-720.webp` | 720×480 | Capa (mobile) |
| `detail.webp` | 1440×960 | Galeria (página do case) |

> Dica: `webp` comprime bem. Use `sharp` ou [squoosh.app](https://squoosh.app) para converter.

---

## 3️⃣ Remover um projeto

Apague o bloco inteiro do projeto em `src/content/projects.ts` e
renombre os `index` dos projetos seguintes (se quiser manter a sequência 01, 02, 03...).

As imagens em `public/images/projects/NOME/` também podem ser apagadas.

---

## 4️⃣ Editar textos das seções da home

| Seção | Arquivo |
|-------|---------|
| Hero (nome, tagline, eyebrow) | `src/pages/Home.tsx` → `<PathDrawingHero ... />` |
| Títulos das seções (01/PROJETOS etc) | `src/pages/Home.tsx` → `<div className="section-heading">` |
| Texto de cada serviço | `src/content/site.ts` → `services` |
| Explicação no hover dos serviços | `src/components/services/ServiceCards.tsx` |
| Contato (título "Uma ideia em mente?") | `src/components/layout/CinematicContact.tsx` |
| Sobre (texto) | `src/content/site.ts` → `about` |

---

## 5️⃣ Publicar as alterações

```bash
git add .
git commit -m "descreva o que mudou"
git push
```

> O push dispara o deploy automático na Vercel.
> Em ~40 segundos o site atualiza em: **https://victor-hugo-portfolio-mocha.vercel.app**

---

## ⚠️ Antes de divulgar

- [ ] Trocar `email`, `whatsapp`, `instagram`, `linkedin` pelos reais (arquivo `site.ts`)
- [ ] Conferir anos dos projetos (`year` em `projects.ts`)
- [ ] Testar o site: `npm run dev` → http://localhost:5173

# Manutenção do portfólio

## Contatos e textos

Edite `src/content/site.ts` para atualizar apresentação, serviços e etapas de trabalho. Campos opcionais de contato podem ficar vazios. Não use números, e-mails ou perfis fictícios: e-mail, WhatsApp, LinkedIn e Instagram só devem receber canais confirmados e autorizados para divulgação.

O WhatsApp deve usar o formato `https://wa.me/` seguido de DDI, DDD e número, somente com dígitos. O LinkedIn deve apontar para o perfil profissional completo.

## Adicionar um projeto

1. Crie uma pasta em `public/images/projects/` com um identificador sem espaços ou acentos.
2. Inclua `cover.webp` e `detail.webp` com 1440 × 960 pixels, além de `cover-720.webp` com 720 × 480 pixels.
3. Adicione uma entrada ao array `projects` em `src/content/projects.ts`, seguindo um projeto existente e usando o mesmo identificador no campo `slug` e na função `image`.
4. Preencha título, cliente, categoria, ano, descrição, desafio, solução e entrega com informações verificadas. Os campos `url` e `repository` são opcionais.
5. Use um `slug` único. A página será acessível em `/projects/slug`.

Se usar imagens em outras dimensões, ajuste os campos de largura e altura correspondentes. Escreva descrições alternativas que representem a imagem. Confirme a autorização para divulgar materiais e a disponibilidade dos links externos.

## Conferir as alterações

```bash
npm ci
npm run lint
npm run build
npm run preview
```

Na prévia, confira a página inicial e os estudos de caso em computador e celular. Teste o menu, os links de contato, a navegação por teclado e a preferência de redução de movimento. Verifique também o acesso direto a uma rota de projeto e a exibição de uma página não encontrada para identificadores inválidos.

## Publicação

Na Vercel, use o preset Vite, o comando de build `npm run build` e a pasta de saída `dist`. Se houver integração com Git, confirme no painel qual branch publica em produção antes de enviar mudanças. O nome da branch principal deste repositório é `master`.

A navegação usa React Router no navegador: a hospedagem precisa encaminhar as rotas da aplicação para `index.html`. Ao configurar outra hospedagem, confira esse comportamento para que links diretos de estudos de caso funcionem.

Não versione `node_modules/`, `dist/`, arquivos `.env` ou configurações locais de autenticação da hospedagem. Se o domínio mudar, atualize o endereço no README e no campo Website do repositório.

## Capturas de apresentação

As imagens em `media/` ilustram o README e não são recursos da aplicação. Atualize-as após mudanças visuais relevantes. Evite adicionar arquivos de edição, capturas de teste ou documentos internos à raiz pública do repositório.

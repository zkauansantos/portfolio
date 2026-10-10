# The Lane — portfólio do Kauan Santos

Um portfólio em pixel art onde a página é uma **lane de MOBA**: uma equipe de minions constrói cada bloco que você vê, as seções são objetivos capturados conforme você empurra a lane, e tem 20 segredos escondidos pelo caminho.

## Stack

- **Next.js 16** (App Router) + **React 19** + TypeScript
- **CSS Modules**, sem framework de UI
- Fonte **Silkscreen** (via `@fontsource/silkscreen`, self-hosted)
- Animações em **canvas 2D puro**, sem bibliotecas de animação

## Como funciona

- `lib/pixels.ts` transforma elementos reais do DOM em blocos: texto é rasterizado com a própria fonte e amostrado pixel a pixel, imagens são reduzidas a blocos, caixas viram borda + ladrilhos e SVGs viram um bloco por `<rect>`.
- `lib/crew.ts` é a equipe de minions: cada um recebe uma fatia dos blocos, voa até lá e coloca bloco por bloco. Quando um elemento fica completo, o HTML real aparece no lugar (`[data-build]` → `[data-built]`) e os blocos somem.
- `components/BuildZone.tsx` embrulha qualquer trecho da página; a equipe começa a construir quando ele entra na tela.
- Tudo marcado com `data-build` é construído. `data-spot` + `data-say="fala 1|fala 2"` fazem o companheiro comentar o elemento.
- Respeita `prefers-reduced-motion` (sem animação, tudo visível), tem "Skip intro" (Esc) e não repete a intro na segunda visita (`?intro` força).

## Editando o conteúdo

Todo o texto do site, em inglês e português, está em **`lib/content.ts`**: perfil, redes, projetos (`ITEMS`), experiências (`MATCHES`) e textos de interface (`COPY`). Os segredos ficam em `lib/game.ts`.

O retrato em pixel (`public/assets/portrait.png`) foi gerado a partir da foto antiga, com 36px de largura e 14 cores.

## Rodando localmente

```bash
npm install
npm run dev
```

Sem acesso ao GitHub, use `CONTRIB_MOCK=1 npm run dev` para gerar um gráfico de contribuições falso.

## Variáveis de ambiente

| Variável | Para quê |
| --- | --- |
| `RESEND_API_KEY` | Envio dos recados do terminal por email ([Resend](https://resend.com)). Sem ela, o terminal abre o app de email do visitante. |
| `CONTACT_TO` | Email que recebe os recados. |
| `CONTACT_FROM` | Remetente (opcional; padrão `onboarding@resend.dev`). |
| `NEXT_PUBLIC_SITE_URL` | URL pública, usada nas meta tags (padrão `https://kauansantos.vercel.app`). |

## Deploy

Na Vercel, o preset do projeto deve ser **Next.js**. Se o projeto antigo estava configurado como Vite (`dist`), troque em *Settings → Build and Deployment*.

## Créditos

Inspirado no processo descrito por Samuel Rizzon em [How this site was built](https://www.samuelrizzon.dev/log/how-this-site-was-built). O código e a metáfora são próprios.

O site antigo (Vite + styled-components) está em `legacy/`.

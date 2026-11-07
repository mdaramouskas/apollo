# tpl-corporate — notes for agents

Reusable template for **T1 Corporate & presentation sites** (also restaurants /
beach bars via the menu page). Derived from a client project, fully neutralised.

- Stack: Next.js 16 (App Router, TS strict, Tailwind v4), Framer Motion, Resend.
  **No database** — the only server work is `/api/contact` and `/api/newsletter`.
- Read `node_modules/next/dist/docs/` before writing Next.js code — this version
  differs from training data (middleware is `proxy.ts`, `params` is a Promise…).
- Config: `site.config.ts` (client data, plan, theme, flags) → `src/config/modules.ts`
  (price-list registry) → `src/config/features.ts` (`isOn(id)`). Flag names ARE
  the price-list module ids. A disabled module renders nothing and its routes 404.
- Copy: `src/i18n/<lang>.ts`. Content files: `src/content/**`. Themes: `globals.css`.
- Demo mode: build and run must work with an **empty `.env`**. Never require an
  env var at import time; throw only inside the code path of an enabled module.
- Never commit `.env*`. Deploy by pushing to `main`, not `vercel deploy` from a
  working dir with `.env` (see `.vercelignore`).
- Before delivering: `npm run build`, `npx tsc --noEmit`, `npm run check:template`.
- Keep `TODO-CLIENT` markers on everything a new client must replace.
- Never write fake reviews or invented business facts into a client build.

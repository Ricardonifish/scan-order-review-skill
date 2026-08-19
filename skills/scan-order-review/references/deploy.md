# Deploy pitfalls (Vercel + GitHub)

## Vercel must-haves

1. **`includeFiles`** in `vercel.json` must list every static asset the serverless handler needs (`*.html`, `*.css`, `*.js`, `menu.json`, `brand.css`, `assets/**`). Missing CSS → white unstyled HTML.
2. **Deployment Protection / Vercel Authentication OFF** for the customer QR URL (or visitors hit a login wall and think the site is “wrong”).
3. **Root Directory**: if the app lives in a monorepo subfolder, set Vercel Root Directory to that folder (e.g. `starbucks-link` or `my-store-link`).
4. **Env**: prefer `ZHIPU_API_KEY` (+ optional `ZHIPU_MODEL=glm-4-flash`). Template also accepts `BIGMODEL_API_KEY`, `SILICONFLOW_API_KEY`, `LLM_API_KEY`, etc. Never commit `.env`.
5. After `vercel --prod`, open the **production** URL (not a preview that still has auth).

## Smoke on production

```text
- [ ] Home CSS + logo/hero 200
- [ ] /order.html?from=qr&table=A8 loads menu
- [ ] Add to cart → submit → pickup code
- [ ] compose.html opens; polish returns (or local-fallback notice)
```

## Local

- Default port `5173`. If `EADDRINUSE`, use `$env:PORT=5174; npm start`.
- `npm start` from the **app folder** (the copied template), not the skill repo root.

## Git push flaky

If `git push` / `vercel` network fails repeatedly on Windows: retry, or use `gh api` Contents API / Vercel dashboard deploy. Do not paste API keys into commit messages.

## QR for the store

Give the merchant: `https://<app>.vercel.app/order.html?from=qr&table=A8`  
(optional short path `/scan?table=A8` redirects to order).

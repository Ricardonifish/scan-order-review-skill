---
name: scan-order-review
description: >-
  One-shot build and deploy a QR-scan web mini-program: Heytea-style in-page ordering
  (menu.json + cart + checkout), link-in-bio home, AI review compose, and Xiaohongshu
  publish handoff. Use when the user provides store/menu materials and wants a deployable
  webpage, or mentions 扫码点单, 喜茶点单, menu.json, 一键部署, Vercel link-in-bio order page.
---

# Scan · Order · Review (one-shot deploy)

You turn **user-provided materials** into a working mobile web app and **deploy it**.

This skill ships with a ready template at repo root `template/` (or `../template/` relative to this skill). Prefer **copy + customize template** over rewriting from scratch.

## End state

User can open:

- `/` — brand link-in-bio (follow / rate / order CTA)
- `/order.html?from=qr&table=A8` — scan-to-order mini-app
- `/compose.html?platform=xiaohongshu` — AI polish → copy → open XHS publish page

Deployed on Vercel with public access (no login wall).

## Materials the user should provide

Collect missing items briefly; do not block if optional.

**Required**
- Store display name (zh + optional en)
- At least 4–8 menu items with prices
- One LLM key for polish (prefer `ZHIPU_API_KEY`, model `glm-4-flash`)

**Optional**
- Hours, address, table/QR examples
- Categories, option groups (size/ice/sweetness)
- Social links (Xiaohongshu / TikTok / Instagram)
- Brand colors / emoji per item
- GitHub username, Vercel team (if not already logged in)

Intake checklist: [references/materials.md](references/materials.md)  
Menu schema: [references/menu-schema.md](references/menu-schema.md)  
XHS publish notes: [references/xhs-publish.md](references/xhs-publish.md)

## One-shot workflow (follow in order)

Copy this checklist and tick as you go:

```text
- [ ] 1. Locate template/
- [ ] 2. Create project folder from template
- [ ] 3. Fill menu.json + index social links from materials
- [ ] 4. Write .env (local) — never commit secrets
- [ ] 5. npm install && npm start — smoke test
- [ ] 6. Init git + push NEW or EXISTING GitHub repo
- [ ] 7. vercel link + env + --prod
- [ ] 8. Disable Vercel Authentication / Deployment Protection
- [ ] 9. Set Root Directory if monorepo; verify CSS loads
- [ ] 10. Give user public URLs + QR URL pattern
```

### 1) Locate template

From this skill repo:

```bash
# skill repo root contains template/
ls template/package.json template/menu.json template/order.html
```

If the user only installed the skill folder without `template/`, clone:

```bash
git clone https://github.com/Ricardonifish/scan-order-review-skill.git
```

### 2) Create working app

```bash
cp -R template my-store-link
cd my-store-link
npm install
```

On Windows PowerShell:

```powershell
Copy-Item -Recurse template my-store-link
cd my-store-link
npm install
```

### 3) Apply materials

1. Edit `menu.json` (store + categories + items + optionGroups).
2. Update social URLs in `index.html` if provided.
3. Keep bilingual fields when possible (`name` / `nameZh`).
4. Do **not** add homepage hint text like `扫码进店 → 网页点单 → …` unless asked.

### 4) Env

Copy `.env.example` → `.env`:

```env
ZHIPU_API_KEY=...
ZHIPU_MODEL=glm-4-flash
```

### 5) Local smoke

```bash
npm start
# http://localhost:5173/
# http://localhost:5173/order.html?from=qr&table=A8
# POST /api/orders with a sample cart should return pickup code
```

Confirm `styles.css` and `order.css` load (not a white unstyled page).

### 6) GitHub

```bash
git init
git add .
git commit -m "Initial scan-order-review store page."
gh repo create <name> --public --source=. --remote=origin --push
```

If creating under an existing monorepo, put the app in a subfolder and remember Vercel Root Directory.

### 7) Vercel deploy

```bash
npx vercel login
npx vercel link --yes
# add envs for production + preview
printf '%s' "$ZHIPU_API_KEY" | npx vercel env add ZHIPU_API_KEY production
printf '%s' "glm-4-flash" | npx vercel env add ZHIPU_MODEL production
npx vercel --prod --yes
```

Critical:

- `vercel.json` must `includeFiles` static assets (`*.css`, `menu.json`, html/js) or CSS 404s.
- Disable **Vercel Authentication** on the project so QR users are not blocked.
- Public URL pattern: `https://<project>.vercel.app/order.html?from=qr&table=A8`

### 8) Hand off to user

Return:

1. Home URL  
2. Order QR URL (with example table)  
3. Compose/review URL  
4. What was filled from their materials  
5. Reminder: rotate any keys pasted in chat  

## Architecture (do not invent a parallel stack)

| Piece | Path |
|-------|------|
| Home | `index.html`, `styles.css` |
| Order UI | `order.html`, `order.css`, `order.js` |
| Menu | `menu.json` via `GET /api/menu` |
| Orders | `POST /api/orders` → demo store in `data/orders.json` or `/tmp` on Vercel |
| Reviews | `compose.html` + `/api/polish` + `/api/publish` |
| XHS open | `https://creator.xiaohongshu.com/publish/imgNote` + clipboard |

Orders are **demo** (pickup code, no real payment) unless user explicitly asks to integrate payments.

## When user only wants edits

If the app already exists, skip scaffold/deploy: just edit `menu.json` / UI and redeploy.

## Optional Xiaohongshu CDP auto-fill

Only if user asks for browser auto-fill. Prefer project copy+open handoff first. See [references/xhs-publish.md](references/xhs-publish.md). Draft-by-default; never click 发布 unless user says 直接发布 / publish now.

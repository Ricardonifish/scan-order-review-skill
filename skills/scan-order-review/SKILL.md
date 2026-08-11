---
name: scan-order-review
description: >-
  One-shot build/deploy a QR scan-to-order web mini-program (一点点-style shell):
  menu.json cart checkout, link-in-bio, AI review polish, Xiaohongshu copy+open.
  Supports AI color design or uploaded logo/hero assets with /frontend-design.
  Use when user mentions 扫码点单, 一点点, 喜茶点单, 一键部署, menu.json, 配色,
  上传logo/背景, Vercel order page, or gives store materials to ship a page.
---

# Scan · Order · Review

Turn **store materials** into a mobile web app and **deploy** it.  
Always **copy `template/`** — do not rebuild from scratch.

Template path: repo `template/` (clone https://github.com/Ricardonifish/scan-order-review-skill if missing).

## Route (pick one)

| User intent | Do this |
|-------------|---------|
| New store / 一键部署 | Full workflow below |
| Only menu/prices | Edit `menu.json` → smoke → redeploy |
| Only look (colors/logo) | [brand-look.md](references/brand-look.md) + [visual-shell.md](references/visual-shell.md) → redeploy |
| Only publish/review bugs | [xhs-publish.md](references/xhs-publish.md) |

## Non‑negotiables

- **Shell fixed**: black page · hero · round logo · white social pills · white Rate cards. See [visual-shell.md](references/visual-shell.md).
- **Brand flexible**: Mode A colors / Mode B uploads / Mode C both. See [brand-look.md](references/brand-look.md).
- **Design companion**: use `/frontend-design` for palette/type only — never replace product IA. See [companion-design-skills.md](references/companion-design-skills.md).
- No Starbucks art on other brands. No「扫码进店 → …」hint unless asked.
- Orders are **demo** (pickup code). No real payment unless user asks.
- Never commit `.env` / API keys.

## Materials

Intake form: [materials.md](references/materials.md) · Menu shape: [menu-schema.md](references/menu-schema.md)

**Blocking (ask if missing):** store name (zh), ≥4 priced items.  
**For polish on Vercel:** `ZHIPU_API_KEY` (optional locally — local-fallback works).  
**Visual:** color taste and/or logo + hero paths. If neither given, invent a dark tea-friendly palette and show hex before coding (unless user said 直接做).

## Full workflow

```text
- [ ] 1 Copy template → working folder
- [ ] 2 Apply materials (menu + brand look + socials)
- [ ] 3 .env (if key provided)
- [ ] 4 npm install && npm start — smoke
- [ ] 5 GitHub push
- [ ] 6 Vercel prod + public (no auth wall) + includeFiles
- [ ] 7 Hand off URLs
```

### 1) Scaffold (Windows)

```powershell
Copy-Item -Recurse template my-store-link
cd my-store-link
npm install
```

### 2) Apply materials

1. `menu.json` — store, categories, items, optionGroups ([menu-schema.md](references/menu-schema.md)).
2. `index.html` — wordmark, socials, logo img if uploaded.
3. Brand look ([brand-look.md](references/brand-look.md)):
   - Colors → propose 4–6 tokens → CSS variables → retint hero/buttons.
   - Uploads → `assets/logo.*`, `assets/hero.*` → wire CSS; add to `vercel.json` `includeFiles`.
   - Call `/frontend-design` when inventing look.
4. Keep bilingual `name` / `nameZh` when possible.

### 3) Env

```env
ZHIPU_API_KEY=...
ZHIPU_MODEL=glm-4-flash
```

### 4) Smoke

```powershell
npm start
# http://localhost:5173/
# http://localhost:5173/order.html?from=qr&table=A8
```

Must pass: CSS loads (not white unstyled HTML); add-to-cart + submit order returns code; compose page opens.

### 5) GitHub

```powershell
git init
git add .
git commit -m "Initial scan-order-review store page."
gh repo create <name> --public --source=. --remote=origin --push
```

Monorepo: set Vercel **Root Directory** to the app folder.

### 6) Vercel

```powershell
npx vercel link --yes
# pipe secrets into: npx vercel env add ZHIPU_API_KEY production
npx vercel --prod --yes
```

Critical: `includeFiles` for html/css/js/`menu.json`/`assets/**`; disable Deployment Protection / Vercel Authentication; QR URL `https://<app>.vercel.app/order.html?from=qr&table=A8`.

### 7) Hand off

Return: home URL · order QR URL · compose URL · palette/assets used · remind key rotation if pasted in chat.

## Architecture (do not invent a parallel stack)

| Piece | Path |
|-------|------|
| Home | `index.html`, `styles.css` |
| Order | `order.html`, `order.css`, `order.js` |
| Menu | `menu.json` → `GET /api/menu` |
| Orders | `POST /api/orders` |
| Reviews | `compose.*` + `/api/polish` + `/api/publish` |
| XHS | copy + `https://creator.xiaohongshu.com/publish/imgNote` |

## Xiaohongshu

Default = clipboard + open publish page. CDP auto-fill only if user asks. [xhs-publish.md](references/xhs-publish.md).

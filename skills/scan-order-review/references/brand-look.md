# Brand look: colors OR uploads

Shell stays fixed ([visual-shell.md](visual-shell.md)). Identity = Mode A / B / C.

## Mode A — AI palette

User gives taste only (「墨绿+奶茶金」「少女粉但不要土」「黑白+一个亮色」).

1. If `/frontend-design` exists, use it for direction.
2. Output **4–6 named hex tokens**: `pageBg`, `heroBg`, `primary`, `accent`, `card`, `mutedText`.
3. Show palette once before coding (skip if user said 直接做).
4. Map into `styles.css` / `order.css` variables; retint hero CSS art; buttons use `primary`.
5. Cards stay white on black page.

## Mode B — Uploads

| Asset | Target |
|-------|--------|
| Logo | `assets/logo.*` → circular logo in `index.html` |
| Hero / page bg | `assets/hero.*` → `.hero` / `.hero-art` `background-image` |
| Favicon | `assets/favicon.*` optional |

- `background-size: cover; background-position: center;` + dark scrim if text must read.
- Add `assets/**` to `vercel.json` `includeFiles`.
- Logo-only: keep black page; derive gradient from brand vibe.

## Mode C — Hybrid

Logo upload + 「颜色你来配」→ palette from brand name/logo vibe + uploaded logo on designed hero.

## Forbidden

- Starbucks cup/logo on other brands  
- Ignoring uploaded hero  
- Light full-page bg / dark Rate cards (breaks shell)  
- New product IA / random marketing landing

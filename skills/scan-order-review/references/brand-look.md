# Brand look: colors OR uploaded assets

Any brand can use this product. The **page shell stays** (black page, hero, round logo, white social pills, white Rate cards).  
Visual identity comes from **Mode A (AI designs colors)** or **Mode B (user uploads assets)** — or both.

## Mode A — Tell colors / ask AI to design palette

User may say only preferences, e.g.:
- 「主色想要墨绿，辅色奶茶金」
- 「偏少女粉但不要土」
- 「只要黑白灰 + 一个亮色，你帮我配」

Agent must:

1. Propose a **4–6 color token set** (named + hex), e.g.:
   - `pageBg`, `heroBg`, `primary`, `accent`, `card`, `mutedText`
2. Show the palette to the user in one short block before coding (unless they said 「直接做」).
3. Map tokens into `styles.css` / `order.css` CSS variables.
4. Retint hero CSS art (cup/mug) to `primary` / `accent` — **do not keep Starbucks green** for other brands.
5. Rate us / CTA buttons use `primary`; cards stay white on black page.

If `/frontend-design` (Anthropic) or `/brand-guidelines` / `/theme-factory` is available, **use it** for palette + type taste, then apply into this shell.

## Mode B — Upload own materials

Accept local paths or URLs:

| Asset | Where it goes |
|-------|----------------|
| Logo (png/svg/webp) | Circular logo in `index.html` (replace SVG) → prefer `assets/logo.*` |
| Page / hero background | `.hero` or `.hero-art` `background-image` → `assets/hero.*` |
| Optional favicon / app icon | `assets/favicon.*` |

Rules:
- Create `assets/` if missing; add files to `vercel.json` `includeFiles` when deploying.
- Background: `background-size: cover; background-position: center;` dark scrim if text must stay readable.
- Keep Rate us **white cards**; don't make the whole page the hero photo.
- If only logo uploaded: keep black page + design gradient from logo-dominant colors (sample description from user or approximate).

## Mode C — Hybrid (recommended)

User uploads logo + says 「颜色你来配」 → extract vibe from logo description / brand name, propose palette, apply with uploaded logo on designed hero.

## Forbidden

- Reusing Starbucks cup/logo for non-Starbucks brands
- Ignoring uploaded hero and shipping stock green template
- Turning Rate us into dark cards on a light full-page background (breaks the shell)
- Inventing a totally new IA (this is still scan-order-review product)

## Prompt snippets for users

**Only colors:**
```text
品牌：一点点。不要星巴克绿。
颜色：你帮我设计一套偏茶感的深色系（主色+辅色+点缀），先给我看色板再改网页。
```

**Only uploads:**
```text
品牌：某某奶茶。
Logo：C:\path\logo.png
头图背景：C:\path\hero.jpg
请换成我的素材，布局壳保持一点点式。
```

# Companion design skill (chosen default)

## Default: `frontend-design` (Anthropic)

**This is the single recommended companion** for scan-order-review.

Why it fits this product:
- User often says「颜色你帮我设计」→ it forces a real palette/type plan before code
- Avoids generic AI landing-page looks (purple gradients, Inter, random marketing pages)
- Works for any brand while **scan-order-review keeps the fixed shell** (black page, hero, round logo, white Rate cards)
- Most widely installed design skill on skills.sh / Anthropic skills

### How to use together

1. Invoke `/frontend-design` when inventing or refining look (Mode A colors, or hybrid with logo).
2. Invoke `/scan-order-review` for menu, order flow, assets wiring, and deploy.
3. Never let frontend-design replace the product IA with a new landing page — only tokens: color, type accents, hero treatment inside the shell.

### Install

From [anthropics/skills → frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design):

```powershell
git clone --depth 1 https://github.com/anthropics/skills.git "$env:TEMP\anthropic-skills"
Copy-Item -Recurse "$env:TEMP\anthropic-skills\skills\frontend-design" "$HOME\.cursor\skills\frontend-design"
```

Or: `npx skills add anthropics/skills --skill frontend-design`

## Not the default (optional later)

| Skill | When you might add it |
|-------|------------------------|
| brand-guidelines | Multi-page brand voice docs |
| theme-factory | Many alternate themes |
| web-design-guidelines | A11y audit after UI ships |
| impeccable | If your agent only has the deprecated frontend-design stub |

Do **not** install a pile of design skills by default — one strong companion + this product skill is enough.

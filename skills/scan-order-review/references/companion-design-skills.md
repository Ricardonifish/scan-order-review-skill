# Companion design skills (widely used)

Install these **alongside** `scan-order-review` when you want stronger auto web design / art direction.

## Most widely used (start here)

| Skill | Why | Install |
|-------|-----|---------|
| **frontend-design** | Anthropic official; skills.sh top design skill (hundreds of thousands of installs). Anti-AI-slop UI, palette/type/layout planning before code. | Copy from [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) → `~/.cursor/skills/frontend-design` or `npx skills add anthropics/skills --skill frontend-design` |
| **web-design-guidelines** | Vercel; high leaderboard activity for a11y/UX audit of UI code | From skills.sh / Vercel skills |
| **impeccable** | Community successor/expansion of frontend-design ideas (if frontend-design stub redirects) | `npx impeccable skills update` or GitHub `pbakaus/impeccable` |

## Also useful for branding / art

| Skill | Use for |
|-------|---------|
| **brand-guidelines** (anthropics/skills) | Apply consistent brand voice + visual rules |
| **theme-factory** (anthropics/skills) | Theme / token variations |
| **canvas-design** (anthropics/skills) | Poster-like / visual composition artifacts |
| **algorithmic-art** (anthropics/skills) | Generative art backgrounds (optional hero texture) |
| **design-taste-frontend** | Extra anti-slop frontend taste (skills.sh) |
| **ui-ux-pro-max** / **high-end-visual-design** | Heavier visual polish skills on skills.sh |

## How to combine with this product skill

1. User fills materials (colors **or** uploads) per [brand-look.md](brand-look.md).  
2. Agent runs **frontend-design** (or brand-guidelines) to propose palette/type.  
3. Agent applies result into `scan-order-review` **fixed shell** (black page, hero, logo, white Rate cards).  
4. Deploy.

Do not let frontend-design replace the scan-order IA with a random landing page — only the **look tokens** inside the shell.

## Quick install (Cursor, Windows)

```powershell
git clone --depth 1 https://github.com/anthropics/skills.git "$env:TEMP\anthropic-skills"
Copy-Item -Recurse "$env:TEMP\anthropic-skills\skills\frontend-design" "$HOME\.cursor\skills\frontend-design"
Copy-Item -Recurse "$env:TEMP\anthropic-skills\skills\brand-guidelines" "$HOME\.cursor\skills\brand-guidelines"
Copy-Item -Recurse "$env:TEMP\anthropic-skills\skills\theme-factory" "$HOME\.cursor\skills\theme-factory"
```

Then in Agent chat:

```text
/frontend-design
/scan-order-review
品牌：…… 颜色你来配 / 或附上 logo 与背景图路径
```

# Companion: frontend-design only

**Default companion = `/frontend-design`** (Anthropic, most-used design skill).

Use it to invent palette/type when user asks for colors or hybrid branding.  
Then apply tokens inside scan-order-review’s fixed shell — do not rebuild a new landing page.

Install: https://github.com/anthropics/skills/tree/main/skills/frontend-design  

```powershell
git clone --depth 1 https://github.com/anthropics/skills.git "$env:TEMP\anthropic-skills"
Copy-Item -Recurse "$env:TEMP\anthropic-skills\skills\frontend-design" "$HOME\.cursor\skills\frontend-design"
```

Skip other design skills unless user explicitly wants brand docs / a11y audits later.

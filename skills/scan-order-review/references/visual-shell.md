# Visual shell (layout stays; brand changes)

This product uses a **一点点 / Mixue-style link-in-bio shell**.  
Different brands (Starbucks vs 一点点) change **logo / hero art / colors / copy** — **not** the page structure.

## Fixed layout (do not redesign)

1. **Page background**: solid black (`#000`), full mobile column  
2. **Hero banner**: full-width dark brand plane (gradient or image) + optional cup/mug illustration  
3. **Brand wordmark** under hero art (e.g. `A LITTLE TEA` / `STARBUCKS`)  
4. **Circular logo** overlapping the banner bottom (white ring)  
5. **Social row**: white pill buttons (icon + name + chevron)  
6. **Rate us**: white cards on black (`2×2`), pink hearts optional; buttons use **brand primary** (not always Starbucks green)  
7. **Order CTA** + about/contact below  

Do **not** turn the home into a flat green marketing page.  
Do **not** remove the black page + white Rate cards pattern unless user asks.

## What changes per brand

| Token | Starbucks example | 一点点 example |
|-------|-------------------|----------------|
| Hero art | Green cup / beans | Mug with `1` / tea steam |
| Wordmark | STARBUCKS | A LITTLE TEA |
| Round logo | Siren-style mark | `1点点` mark |
| Primary button | `#00704A` | brand black/green from materials |
| Social labels | rednote / TikTok / IG | as provided |

## Files to edit for branding

- `index.html` — wordmark, logo SVG/img, social labels/links  
- `styles.css` — `--sb-*` / brand CSS variables, `.hero` / `.hero-art` background  
- Optional: `assets/hero.*`, `assets/logo.*` if user supplies images  

Rate us **card background stays white**; only page/hero/button accents follow brand.

## If user supplies background materials

Prefer in this order:

1. Hero **image file or URL** → set as `.hero` / `.hero-art` background  
2. Else **primary + secondary hex** → CSS gradient on hero  
3. Else keep template dark gradient + simple cup/mug CSS art retinted to brand color  

Never leave Rate us on a light full-page background.

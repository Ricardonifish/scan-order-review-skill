# Xiaohongshu publish

Default for this product: **copy text + open publish page** (no CDP).

URL: `https://creator.xiaohongshu.com/publish/imgNote`

1. Copy final copy (sync `execCommand` + clipboard API fallback)  
2. `window.open` in the same click turn when possible  
3. User pastes; never claim auto-posted  

CDP / `xiaohongshu-publisher` only if user asks. Draft-first; click 发布 only on 直接发布 / publish now.  
Keep review polarity in `/api/polish` — no fake praise from negative drafts.  
After order: **satisfaction gate** — 👍 opens compose/public platforms; 👎 posts `/api/feedback` in-house only (market “差评拦截” lite).  
Local fallback reads store name from `menu.json`.  
Avoid false negatives:「不太甜」must not trigger “太甜”.  
Titles short (~20 XHS display units).  
Staff scripts: [floor-ops.md](floor-ops.md).

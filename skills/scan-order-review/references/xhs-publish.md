# Xiaohongshu publish

Default for this product: **copy text + open publish page** (no CDP).

URL: `https://creator.xiaohongshu.com/publish/imgNote`

1. Copy final copy (sync `execCommand` + clipboard API fallback)  
2. `window.open` in the same click turn when possible  
3. User pastes; never claim auto-posted  

CDP / `xiaohongshu-publisher` only if user asks. Draft-first; click 发布 only on 直接发布 / publish now.  
Keep review polarity in `/api/polish` — no fake praise from negative drafts.  
Titles short (~20 XHS display units).

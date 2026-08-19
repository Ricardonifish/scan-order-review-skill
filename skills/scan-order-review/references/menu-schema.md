# menu.json schema

Canonical fields match `template/order.js`. Prefer **`choices` + `price`**.  
Also accepted: `options` + `priceDelta` (normalized at runtime).

## Top level

```json
{
  "store": {
    "id": "",
    "name": "",
    "nameZh": "",
    "hours": "",
    "hoursZh": "",
    "address": "",
    "addressZh": "",
    "tagline": "",
    "taglineZh": ""
  },
  "currency": "¥",
  "categories": [],
  "optionGroups": []
}
```

## Category

```json
{
  "id": "milk-tea",
  "name": "Milk Tea",
  "nameZh": "牛乳茶",
  "items": []
}
```

`id` must be stable; `optionGroups.appliesTo` references category `id`s.

## Item

```json
{
  "id": "classic-milk",
  "name": "Classic Milk Tea",
  "nameZh": "经典牛乳茶",
  "desc": "Assam black tea with fresh milk",
  "descZh": "阿萨姆红茶配鲜牛乳",
  "price": 16,
  "tag": "HOT",
  "tagZh": "人气",
  "color": "#1a6b5c",
  "emoji": "🧋"
}
```

- `id`: kebab-case, unique across menu  
- `price`: number (base before option add-ons)  
- `color` / `emoji`: tile when no photo  
- empty `tag` / `tagZh` hides badge  
- `available: false`: sold out — greyed out, cannot add (omit or `true` = on sale)  
- `allergens`: string or string[] — e.g. `"牛奶,大豆"` / `["dairy","soy"]` shown under desc  
- `diet`: optional tags e.g. `"少糖可选"` / `vegan`  
- `image`: optional URL/path under `assets/` for menu thumb  

## Store extras (optional on `store`)

```json
"waitMinutesPerOrder": 4,
"queueHint": true
```

Used for lite「预计等待」= `openOrders × waitMinutesPerOrder` (min 0).

```json
{
  "id": "sugar",
  "name": "Sugar",
  "nameZh": "糖度",
  "required": true,
  "appliesTo": ["milk-tea", "fruit"],
  "choices": [
    { "id": "s100", "name": "100%", "nameZh": "正常糖", "price": 0 },
    { "id": "s70", "name": "70%", "nameZh": "少糖", "price": 0 }
  ]
}
```

| Field | Rule |
|-------|------|
| `appliesTo` | Category ids. **Omit or `[]` → applies to all categories.** |
| `choices` | Preferred. Alias: `options`. |
| choice `price` | Add-on yuan. Alias: `priceDelta`. |
| `required` | UI hint; first choice is default selected. |

Food-only groups: list only food category ids in `appliesTo`.

## QR URLs（商家要贴两种）

```
/order.html?from=qr              # 门店码 · 外带/自提
/order.html?from=qr&table=A8     # 桌码 · 堂食
/scan?table=A8                   # 短链 → order
```

Table shows in the order header and is stored on submitted orders.

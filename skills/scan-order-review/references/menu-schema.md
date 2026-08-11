# menu.json schema

Edit this file to change what customers see after scanning.

## Top level

```json
{
  "store": { "id": "", "name": "", "nameZh": "", "hours": "", "hoursZh": "", "address": "", "addressZh": "", "tagline": "", "taglineZh": "" },
  "currency": "¥",
  "categories": [ /* Category */ ],
  "optionGroups": [ /* OptionGroup */ ]
}
```

## Category

```json
{
  "id": "classic",
  "name": "Classic Coffee",
  "nameZh": "经典咖啡",
  "items": [ /* Item */ ]
}
```

`id` must be stable; `optionGroups.appliesTo` references it.

## Item

```json
{
  "id": "latte",
  "name": "Caffè Latte",
  "nameZh": "拿铁",
  "desc": "Espresso with steamed milk",
  "descZh": "丝滑牛奶裹住浓缩",
  "price": 32,
  "tag": "NEW",
  "tagZh": "上新",
  "color": "#00704A",
  "emoji": "🥛"
}
```

- `id`: kebab-case, unique across menu
- `price`: number (base price before option add-ons)
- `color` / `emoji`: visual tile when no product photo
- empty `tag` / `tagZh` hides badge

## OptionGroup

```json
{
  "id": "size",
  "name": "Size",
  "nameZh": "杯型",
  "required": true,
  "appliesTo": ["classic", "seasonal"],
  "choices": [
    { "id": "tall", "name": "Tall", "nameZh": "中杯", "price": 0 },
    { "id": "grande", "name": "Grande", "nameZh": "大杯", "price": 3 }
  ]
}
```

Food-only categories: omit them from `appliesTo`.

## QR URL examples

```
/order.html?from=qr&table=A8
/scan?table=A8
```

Table shows in the order header and is stored on submitted orders.

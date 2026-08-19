---
name: scan-order-review
description: >-
  One-shot: from store materials, custom-design a mobile H5 (not a reused Mixue
  shell) then deploy QR order + pickup code + AI review polish. Use /frontend-design
  and pick a distinct layout per shop. Keep template APIs. Triggers: 扫码点单, 帮我设计,
  一键部署, 喜茶/一点点, menu.json, logo, 配色, 种草评价.
---

# Scan · Order · Review

材料 → **为这家店设计界面** → 部署可扫码点单 + 评价种草的 H5。

产品能力复制 `template/`（API 不要换栈）。  
**外观默认全新设计**：不要把模板的黑底圆 Logo 白胶囊当成每家店的样子。

模板仓库：https://github.com/Ricardonifish/scan-order-review-skill → `template/`

## Route

| Intent | Do |
|--------|----|
| 新店 / 一键部署 / 帮我设计 | 全流程 + **必做版式设计** |
| 只要换皮 | [brand-look.md](references/brand-look.md) 例外条款 |
| 只改菜单 | [menu-schema.md](references/menu-schema.md) |
| 部署故障 | [deploy.md](references/deploy.md) |
| 评价/小红书 | [xhs-publish.md](references/xhs-publish.md) |
| 店主验收 / 贴码 | [acceptance.md](references/acceptance.md) · [floor-ops.md](references/floor-ops.md) |
| 商家诉求 / 以后再做 | [merchant-needs.md](references/merchant-needs.md) · [roadmap.md](references/roadmap.md) |

## Non‑negotiables

- **功能固定**：点单规格、取餐号、排队提示、满意度分流、润色、门店码+桌码。  
- **视觉不固定**：每店选一个 [design-directions.md](references/design-directions.md) 方向（或自创），用 `/frontend-design` 做身份，**重写首页 HTML/CSS**。  
- 只有用户说「跟模板一样」才保留 Mixue 壳。  
- 清掉演示店名（一叶茶等）。  
- 订单默认到吧台结账；不承诺支付/打印/美团验券。  
- 不提交密钥。

## Materials

[materials.md](references/materials.md)

| | |
|--|--|
| **必填** | 中文店名，≥4 个带价商品 |
| **设计** | 气质/参考/忌讳/Logo/图 — 没有也要**发明一个贴品类的方向**（先 brief 除非直接做） |
| **可演** | 地址、社交、激励 |

## Full workflow

```text
- [ ] 1 复制 template/
- [ ] 2 menu.json + 清演示文案
- [ ] 3 选设计方向 → brief → 重写 index/styles/brand，并统一点单/评价视觉
- [ ] 4 .env
- [ ] 5 冒烟（功能 + 看起来不像模板壳）
- [ ] 6 GitHub
- [ ] 7 公开 Vercel
- [ ] 8 交付双码 + 话术 + 设计说明（方向名）
```

### 设计（默认，不要跳）

1. 读 `/frontend-design` 与 [design-directions.md](references/design-directions.md)。  
2. 选方向 A–H 之一（或自创），**禁止无理由再用模板构图**。  
3. Brief：方向、首屏线框、色板、字体、一个签名元素。  
4. 重写 `index.html` + `styles.css`；token 进 `brand.css`；图进 `assets/`。  
5. 点单/评价页跟同一套气质（字体+主色；结构可改）。  
6. 自检：换店名后若版式仍像「黑底三胶囊」，重做。

细节：[brand-look.md](references/brand-look.md) · [visual-shell.md](references/visual-shell.md)

### Scaffold

```powershell
Copy-Item -Recurse template my-store-link
cd my-store-link
npm install
```

### Smoke

```powershell
npm start
# /order.html?from=qr  与  ?from=qr&table=A8
```

功能：规格、取餐号、售罄、compose。视觉：首页不是未改的模板壳。

### Handoff

门店码 + 桌码、compose、**用了哪个设计方向**、floor-ops、公开 URL。

## Anti‑patterns

- 每家店同一套一点点链接页只改绿/粉  
- 用 Next 重写整站  
- 只改 `brand.css` 却声称「已设计」  
- Vercel 登录墙；宣称小红书已自动发布  

## Architecture

| Piece | Path |
|-------|------|
| Home | `index.html` `styles.css` `brand.css`（**可整页重写**） |
| Order / reviews | `order.*` `compose.*`（可改样式，保留 JS API） |
| Menu / orders | `menu.json` `GET/POST /api/*` |

Restyle freely; do not replace the Express cart APIs.

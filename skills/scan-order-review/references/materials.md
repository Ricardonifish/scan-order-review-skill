# Materials checklist (give this to the AI)

Paste into chat when installing this skill on another AI:

```text
【一键部署材料】
1. 店铺中文名：
2. 店铺英文名 / 英文 wordmark（可选）：
3. 营业时间：
4. 地址（可选）：
5. 菜单（每行一个）：
   - 分类 | 中文名 | 英文名 | 价格 | 简介 | 标签(可选) | 是否要杯型/冰量/甜度
6. 社交链接（可选）：
   - 小红书：
   - TikTok / 官网：
   - Instagram：
7. 【视觉 / 背景素材】（重要：布局固定为一点点式黑底壳，只换品牌）
   - 品牌主色 hex：
   - 品牌辅色 hex（可选）：
   - 头图/Banner 背景图（本地路径或 URL，可选）：
   - 圆形 Logo 图（本地路径或 URL，可选）：
   - 头图示意（杯子/茶饮 CSS 或说明，可选）：
   - Rate us 区：保持白卡片黑底（默认是）；按钮用品牌主色
8. 智谱 Key（ZHIPU_API_KEY，用于评价润色）：
9. GitHub 仓库名（可选，默认 scan-order-store）：
10. 是否公开部署到 Vercel：是 / 否
```

Minimal example（一点点）：

```text
店铺中文名：1点点
店铺英文名：A LITTLE TEA
营业时间：10:00–22:00
品牌主色：#1A1A1A
辅色：#2F5D50
头图说明：深色 banner + 带蒸汽的杯子图标（中间数字 1）
圆形 Logo：1点点 字标
菜单：
茶饮 | 一声乌龙 | Oolong Tea | 14 | 清香回甘 | 人气 | 要冰量甜度
茶饮 | 奶茶三兄弟 | Milk Tea | 16 | 经典奶茶 |  | 要冰量甜度杯型
ZHIPU_API_KEY：（粘贴）
公开部署：是
```

说明：不提供头图时，AI 用品牌色做深色渐变头图，**页面仍为黑底 + 白 Rate 卡片**，不要做成星巴克绿底整页。

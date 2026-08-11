# Materials checklist (give this to the AI)

Paste into chat when installing this skill on another AI:

```text
【一键部署材料】
1. 店铺中文名：
2. 店铺英文名（可选）：
3. 营业时间：
4. 地址（可选）：
5. 菜单（每行一个）：
   - 分类 | 中文名 | 英文名 | 价格 | 简介 | 标签(可选) | 是否要杯型/冰量/甜度
6. 社交链接（可选）：
   - 小红书：
   - TikTok：
   - Instagram：
7. 智谱 Key（ZHIPU_API_KEY，用于评价润色）：
8. GitHub 仓库名（可选，默认 scan-order-store）：
9. 是否公开部署到 Vercel：是 / 否
```

Minimal example:

```text
店铺中文名：星巴克演示店
营业时间：6:00–21:00
菜单：
经典咖啡 | 冰美式 | Iced Americano | 28 | 干净冰爽 | 人气 | 要杯型冰量
经典咖啡 | 拿铁 | Latte | 32 | 丝滑牛奶 |  | 要杯型冰量
季节特饮 | 抹茶拿铁 | Matcha Latte | 36 | 清苦回甘 | 上新 | 要杯型冰量甜度
轻食 | 可颂 | Croissant | 22 | 酥香 |  | 不要规格
ZHIPU_API_KEY：（粘贴）
公开部署：是
```

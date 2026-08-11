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
7. 【视觉】二选一或组合（布局壳固定：黑底 + 头图 + 圆 Logo + 白 Rate 卡片）
   A. 颜色模式（告诉 AI 喜好，让它设计色板）：
      - 风格关键词（茶感/甜酷/极简/复古…）：
      - 喜欢的主色/辅色（可模糊说「墨绿+奶茶金」）：
      - 忌讳色（可选）：
   B. 上传素材模式：
      - Logo 文件路径或 URL：
      - 网页/头图背景 路径或 URL：
      - 其他（favicon 等，可选）：
8. 智谱 Key（ZHIPU_API_KEY，用于评价润色）：
9. GitHub 仓库名（可选）：
10. 是否公开部署到 Vercel：是 / 否
```

### 例 1：只要 AI 配色

```text
品牌：1点点 / A LITTLE TEA
颜色模式：茶感深色，主色偏墨绿，辅色米金，不要星巴克绿。先出色板再改网页。
菜单：……
ZHIPU_API_KEY：……
公开部署：是
```

### 例 2：自己上传素材

```text
品牌：某某奶茶
Logo：C:\Users\me\Desktop\logo.png
头图背景：C:\Users\me\Desktop\hero.jpg
颜色：可按 Logo 自动提色微调
菜单：……
公开部署：是
```

配套设计 skill（装得越多网页越好看）：见 [companion-design-skills.md](companion-design-skills.md)  
颜色/上传细则：见 [brand-look.md](brand-look.md)

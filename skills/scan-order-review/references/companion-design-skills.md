# Companion: frontend-design

**必用** `/frontend-design`（除非用户明确只要换皮）。

角色：给**这一家店**做视觉身份，而不是给「奶茶 H5」套通用模板。  
实现：可以整页改 HTML/CSS；**不要**换 Express / `menu.json` / 购物车 API。

安装：https://github.com/anthropics/skills/tree/main/skills/frontend-design

```powershell
git clone --depth 1 https://github.com/anthropics/skills.git "$env:TEMP\anthropic-skills"
Copy-Item -Recurse "$env:TEMP\anthropic-skills\skills\frontend-design" "$HOME\.cursor\skills\frontend-design"
```

方向库：[design-directions.md](design-directions.md)。  
若 `/frontend-design` 未安装：仍按该文件选方向并重做版式，不要退回 Mixue 壳。

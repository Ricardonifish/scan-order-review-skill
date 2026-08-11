# Scan · Order · Review Skill

给另一个 AI（Cursor / Claude Code 等）安装后：**你只提供店铺/菜单材料 → AI 按 skill 一键生成并部署**扫码点单 + 评价网页。

## 仓库结构

```text
skills/scan-order-review/   # Agent Skill（SKILL.md）
template/                   # 可直接复制部署的网页模板
```

## 给另一个 AI 的最短指令

把下面整段复制给已能读取本仓库的 AI：

```text
请读取并遵循本仓库 skills/scan-order-review/SKILL.md。
以 template/ 为模板，根据我下面的材料生成项目并部署到 Vercel（公开可访问）。
材料：
（粘贴 skills/scan-order-review/references/materials.md 里的填写结果）
```

## 在 Cursor 里安装

**方式 A — 克隆后当用户 skill**

```powershell
git clone https://github.com/Ricardonifish/scan-order-review-skill.git
Copy-Item -Recurse scan-order-review-skill\skills\scan-order-review $HOME\.cursor\skills\scan-order-review
```

然后在 Agent 聊天输入：

```text
/scan-order-review
```

**方式 B — 打开本仓库当工作区**  
直接让 Agent：`阅读 skills/scan-order-review/SKILL.md 并按材料部署`。

## 本地预览模板

```powershell
cd template
npm install
npm start
```

- 首页：http://localhost:5173/  
- 点单：http://localhost:5173/order.html?from=qr&table=A8  

## 安全

- 不要把 `.env` / API Key 提交进 git  
- 聊天里发过的 Key 建议事后轮换  

## 来源

模板来自实习项目 `starbucks-link`；小红书发布要点参考开源 skill（见 `references/xhs-publish.md`）。

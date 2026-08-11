# Scan · Order · Review Skill

给 AI：**店铺材料 → 一键生成并部署**扫码点单 + 评价页。

```text
skills/scan-order-review/   # Skill
template/                   # 网页模板（直接复制）
```

## 丢给另一个 AI

```text
请遵循 skills/scan-order-review/SKILL.md。
如已安装请用 /frontend-design 做色板（只改视觉，不改产品结构）。
复制 template/，按材料部署到公开 Vercel。
视觉：颜色你来配 或 我上传了 Logo/背景（材料第 7 项）。
材料：
（粘贴 references/materials.md 填空）
```

## 安装到 Cursor

```powershell
git clone https://github.com/Ricardonifish/scan-order-review-skill.git
Copy-Item -Recurse .\scan-order-review-skill\skills\scan-order-review $HOME\.cursor\skills\scan-order-review
```

聊天：`/scan-order-review`

本地预览：`cd template && npm install && npm start` → http://localhost:5173/

不要提交 `.env`；聊天里的 Key 事后轮换。

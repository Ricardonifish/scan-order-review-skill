# Scan · Order · Review Skill

材料 → **按店设计一套界面** → 部署扫码点单 + 评价种草。  
模板只提供功能，不提供「所有店共用皮肤」。

```text
skills/scan-order-review/
template/                   # 功能骨架；新店请重做版式
```

## 丢给另一个 AI

```text
请遵循 skills/scan-order-review/SKILL.md。
复制 template/ 只保留点单/评价 API。
必须用 /frontend-design，并从 references/design-directions.md 选一个方向，
重写首页（不要黑底圆Logo白胶囊套娃）。
只有我说「跟模板一样」才只换皮。
材料：
（粘贴 references/materials.md）
```

## 安装

```powershell
git clone https://github.com/Ricardonifish/scan-order-review-skill.git
Copy-Item -Recurse .\scan-order-review-skill\skills\scan-order-review $HOME\.cursor\skills\scan-order-review
```

聊天：`/scan-order-review`

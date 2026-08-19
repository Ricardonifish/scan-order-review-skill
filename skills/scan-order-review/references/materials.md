# Materials checklist

Copy to the AI:

```text
【一键部署材料】（茶饮/咖啡单店轻量 H5：点单+链接页+评价种草；非收银/支付系统）
1. 店铺中文名：（必填）
2. 英文名 / wordmark：（可选）
3. 营业时间 / 地址：（可选，缺则演示文案）
4. 场景：堂食桌码 / 外带门店码 / 都要：（默认都要）
5. 菜单（≥4，每行）：
   分类 | 中文名 | 英文名 | 价格 | 简介 | 标签 | 糖冰小料 | 售罄? | 过敏原?
6. 社交：（可选）小红书 / TikTok / Instagram / 美团或点评链接
7. 评价激励文案：（可选，如「发笔记下次减3元」—仅展示，不核销）
8. 视觉 / 设计（默认：按店重新设计版式+配色，不要套模板黑底胶囊；「跟模板一样」才只换皮）
   - 气质 / 参考感觉 / 忌讳（可写：新中式、夜市、手冲、少女、杂志封面…）
   - Logo、头图、门店/产品图
   - 直接做 / 先出 brief
9. 团购：美团/点评 → 到吧台核销（系统不自动验券）
10. 单均制作分钟：（可选，用于排队提示，默认 4）
11. ZHIPU_API_KEY / GitHub / 公开 Vercel（关 Authentication）
```

**市场常见但默认不做：** 真实收款、杯贴打印、美团 API 验券、会员储值、预约日历。见 [roadmap.md](roadmap.md)。

菜单字段：[menu-schema.md](menu-schema.md) · 商家诉求：[merchant-needs.md](merchant-needs.md) · 地推：[floor-ops.md](floor-ops.md)

**设计例：** `清棠茶室，新中式纸感，不要黑底胶囊风。桌码+门店码。请按店设计一版首页再部署。`

细则：[design-directions.md](design-directions.md) · [brand-look.md](brand-look.md) · [deploy.md](deploy.md) · [acceptance.md](acceptance.md)

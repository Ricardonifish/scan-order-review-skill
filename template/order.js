(() => {
  const params = new URLSearchParams(window.location.search);
  const table = (params.get("table") || params.get("desk") || "").trim();
  const fromQr = params.has("qr") || params.get("from") === "qr" || Boolean(table);

  let lang = localStorage.getItem("sb_order_lang");
  if (lang !== "zh" && lang !== "en") {
    lang = (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  let menu = null;
  let activeCat = null;
  let cart = loadCart();
  let draft = null;
  let fulfillment = table ? "dine_in" : "takeaway";

  const $ = (id) => document.getElementById(id);

  function tName(obj) {
    if (!obj) return "";
    return lang === "zh" ? obj.nameZh || obj.name : obj.name || obj.nameZh;
  }

  function tDesc(obj) {
    if (!obj) return "";
    return lang === "zh" ? obj.descZh || obj.desc || "" : obj.desc || obj.descZh || "";
  }

  function tTag(obj) {
    if (!obj) return "";
    return lang === "zh" ? obj.tagZh || obj.tag || "" : obj.tag || obj.tagZh || "";
  }

  function formatAllergens(item) {
    const a = item?.allergens;
    if (!a) return "";
    return Array.isArray(a) ? a.join(lang === "zh" ? "、" : ", ") : String(a);
  }

  function openOrderCount(orders) {
    return (orders || []).filter((o) => {
      const st = o.status || "received";
      return st !== "ready" && st !== "done" && st !== "cancelled";
    }).length;
  }

  async function refreshQueueHint() {
    const el = $("queueHint");
    if (!el || !menu) return;
    const store = menu.store || {};
    if (store.queueHint === false) {
      el.hidden = true;
      return;
    }
    let open = 0;
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      open = openOrderCount(data.orders || []);
    } catch {
      open = 0;
    }
    const per = Number(store.waitMinutesPerOrder) || 4;
    const mins = open * per;
    if (!open) {
      el.textContent = lang === "zh" ? "现在下单，很快制作" : "Order now — little to no wait";
    } else {
      el.textContent =
        lang === "zh"
          ? `前方约 ${open} 单制作中 · 预计约 ${Math.max(per, mins)} 分钟`
          : `About ${open} orders ahead · ~${Math.max(per, mins)} min`;
    }
    el.hidden = false;
  }

  const STATUS_FLOW = ["received", "making", "ready", "done"];
  function statusLabel(st) {
    const map =
      lang === "zh"
        ? { received: "已接单", making: "制作中", ready: "请取餐", done: "已完成", cancelled: "已取消" }
        : { received: "Received", making: "Making", ready: "Ready", done: "Done", cancelled: "Cancelled" };
    return map[st] || st;
  }

  function money(n) {
    const cur = menu?.currency || "¥";
    return `${cur}${Number(n).toFixed(Number.isInteger(n) ? 0 : 2)}`;
  }

  function resetFeedbackGate() {
    const gate = $("feedbackGate");
    const priv = $("feedbackPrivate");
    const review = $("reviewAfterOrder");
    if (gate) gate.hidden = false;
    if (priv) {
      priv.hidden = true;
      const ta = $("feedbackPrivateText");
      if (ta) ta.value = "";
    }
    if (review) review.hidden = true;
    const q = $("feedbackQ");
    if (q) q.textContent = lang === "zh" ? "这次体验怎么样？" : "How was it?";
  }

  function syncFulfillChips() {
    document.querySelectorAll(".fulfill-chip").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-fulfill") === fulfillment);
    });
    const hint = $("payHint");
    if (hint) {
      hint.textContent =
        lang === "zh"
          ? "演示单：提交后出示取餐号，到吧台取餐/结账"
          : "Demo: show pickup code at the counter to pay & collect";
    }
  }

  function bindFeedbackGate() {
    $("feedbackGood")?.addEventListener("click", () => {
      $("feedbackGate").hidden = true;
      $("feedbackPrivate").hidden = true;
      const link = $("reviewAfterOrder");
      if (link) {
        link.hidden = false;
        window.location.href = link.href;
      }
    });
    $("feedbackBad")?.addEventListener("click", () => {
      $("feedbackGate").hidden = true;
      $("reviewAfterOrder").hidden = true;
      $("feedbackPrivate").hidden = false;
    });
    $("feedbackPrivateSend")?.addEventListener("click", async () => {
      const text = ($("feedbackPrivateText")?.value || "").trim();
      try {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table, text, sentiment: "negative" }),
        });
      } catch {
        /* ignore */
      }
      toast(lang === "zh" ? "已收到，我们内部改进" : "Thanks — we'll improve in-house");
      $("successSheet").hidden = true;
    });
  }

  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 1800);
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem("sb_cart_v1") || "[]");
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem("sb_cart_v1", JSON.stringify(cart));
    renderCartBar();
  }

  function cartCount() {
    return cart.reduce((s, x) => s + x.qty, 0);
  }

  function cartTotal() {
    return Math.round(cart.reduce((s, x) => s + x.unitPrice * x.qty, 0) * 100) / 100;
  }

  function findItem(itemId) {
    for (const cat of menu.categories || []) {
      const hit = (cat.items || []).find((i) => i.id === itemId);
      if (hit) return { item: hit, category: cat };
    }
    return null;
  }

  function optionGroupsFor(categoryId) {
    return (menu.optionGroups || []).filter((g) => {
      const scope = g.appliesTo;
      if (!scope || !scope.length) return true; // no appliesTo → all categories
      return scope.includes(categoryId);
    });
  }

  function groupChoices(g) {
    return g.choices || g.options || [];
  }

  function choicePrice(c) {
    return Number(c.price ?? c.priceDelta) || 0;
  }

  async function loadMenu() {
    const res = await fetch("/api/menu");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "菜单加载失败");
    menu = data.menu;
    activeCat = menu.categories?.[0]?.id || null;
    renderStore();
    renderCats();
    renderMenu();
    renderCartBar();
    refreshQueueHint();
  }

  function renderStore() {
    const store = menu.store || {};
    $("storeName").textContent = tName(store) || "川渝小炒肉";
    $("storeKicker").textContent = fromQr
      ? lang === "zh"
        ? "扫码点单"
        : "Scan to order"
      : lang === "zh"
        ? store.taglineZh || "在线点单"
        : store.tagline || "Order online";

    const bits = [];
    if (table) bits.push(lang === "zh" ? `桌号 ${table}` : `Table ${table}`);
    bits.push(lang === "zh" ? store.hoursZh || store.hours : store.hours || store.hoursZh);
    $("storeSub").textContent = bits.filter(Boolean).join(" · ");
    $("langBtn").textContent = lang === "zh" ? "EN" : "中文";
    const brand = tName(store) || (lang === "zh" ? "川渝小炒肉" : "Chuanyu Stir-Fry");
    document.title = lang === "zh" ? `扫码点单 · ${brand}` : `Order · ${brand}`;
  }

  function renderCats() {
    const wrap = $("catList");
    wrap.innerHTML = "";
    (menu.categories || []).forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `cat-btn${cat.id === activeCat ? " active" : ""}`;
      btn.textContent = tName(cat);
      btn.addEventListener("click", () => {
        activeCat = cat.id;
        renderCats();
        const section = document.getElementById(`sec-${cat.id}`);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      wrap.appendChild(btn);
    });
  }

  function renderMenu() {
    const root = $("menuSections");
    root.innerHTML = "";
    (menu.categories || []).forEach((cat) => {
      const sec = document.createElement("section");
      sec.className = "menu-section";
      sec.id = `sec-${cat.id}`;
      sec.innerHTML = `<h2>${tName(cat)}</h2>`;
      (cat.items || []).forEach((item) => {
        const soldOut = item.available === false;
        const row = document.createElement("article");
        row.className = `item${soldOut ? " sold-out" : ""}`;
        const tag = soldOut
          ? lang === "zh"
            ? "售罄"
            : "Sold out"
          : tTag(item);
        const allergen = formatAllergens(item);
        const diet = item.diet || item.dietZh || "";
        const dietLabel = lang === "zh" ? item.dietZh || item.diet || "" : item.diet || item.dietZh || "";
        const art = item.image
          ? `<div class="item-art img" style="background-image:url('${item.image}')"></div>`
          : `<div class="item-art" style="background:${item.color || "#1E3932"}">${item.emoji || "★"}</div>`;
        row.innerHTML = `
          ${art}
          <div class="item-body">
            <h3>${tName(item)}${tag ? `<span class="tag">${tag}</span>` : ""}</h3>
            <p>${tDesc(item)}</p>
            ${allergen || dietLabel ? `<p class="item-meta">${[allergen && (lang === "zh" ? `含${allergen}` : `Contains ${allergen}`), dietLabel].filter(Boolean).join(" · ")}</p>` : ""}
            <p class="item-price">${money(item.price)}</p>
          </div>
          <button type="button" class="add-btn" aria-label="${soldOut ? "售罄" : "添加"}" ${soldOut ? "disabled" : ""}>+</button>
        `;
        if (!soldOut) {
          row.querySelector(".add-btn").addEventListener("click", () => openSpec(item, cat));
        }
        sec.appendChild(row);
      });
      root.appendChild(sec);
    });
  }

  function openSpec(item, category) {
    const groups = optionGroupsFor(category.id);
    const selected = {};
    groups.forEach((g) => {
      selected[g.id] = groupChoices(g)[0]?.id || null;
    });
    draft = { item, category, selected, qty: 1, note: "" };
    $("specHero").style.background = item.color || "#1E3932";
    $("specHero").textContent = item.emoji || "★";
    $("specTitle").textContent = tName(item);
    $("specDesc").textContent = tDesc(item);
    $("itemNote").value = "";
    $("qtyValue").textContent = "1";
    renderSpecOptions();
    updateAddBtn();
    $("specSheet").hidden = false;
  }

  function renderSpecOptions() {
    const wrap = $("specOptions");
    wrap.innerHTML = "";
    const groups = optionGroupsFor(draft.category.id);
    groups.forEach((g) => {
      const box = document.createElement("div");
      box.className = "opt-group";
      box.innerHTML = `<h3>${tName(g)}</h3>`;
      const row = document.createElement("div");
      row.className = "opt-row";
      (groupChoices(g) || []).forEach((c) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `chip${draft.selected[g.id] === c.id ? " active" : ""}`;
        const delta = choicePrice(c);
        const extra = delta ? ` +${money(delta)}` : "";
        chip.textContent = `${tName(c)}${extra}`;
        chip.addEventListener("click", () => {
          draft.selected[g.id] = c.id;
          renderSpecOptions();
          updateAddBtn();
        });
        row.appendChild(chip);
      });
      box.appendChild(row);
      wrap.appendChild(box);
    });
  }

  function calcUnitPrice() {
    if (!draft) return 0;
    let price = Number(draft.item.price) || 0;
    const groups = optionGroupsFor(draft.category.id);
    groups.forEach((g) => {
      const choice = groupChoices(g).find((c) => c.id === draft.selected[g.id]);
      if (choice) price += choicePrice(choice);
    });
    return price;
  }

  function selectedOptionLabels() {
    const labels = {};
    const groups = optionGroupsFor(draft.category.id);
    groups.forEach((g) => {
      const choice = groupChoices(g).find((c) => c.id === draft.selected[g.id]);
      if (choice) labels[g.id] = tName(choice);
    });
    return labels;
  }

  function updateAddBtn() {
    const unit = calcUnitPrice();
    const qty = draft?.qty || 1;
    $("addCartBtn").textContent =
      lang === "zh"
        ? `加入购物车 · ${money(unit * qty)}`
        : `Add · ${money(unit * qty)}`;
  }

  function addToCart() {
    if (!draft) return;
    const unitPrice = calcUnitPrice();
    const options = selectedOptionLabels();
    const note = ($("itemNote").value || "").trim();
    const key = JSON.stringify({
      id: draft.item.id,
      selected: draft.selected,
      note,
    });
    const existing = cart.find((x) => x.key === key);
    if (existing) {
      existing.qty += draft.qty;
    } else {
      cart.push({
        key,
        id: draft.item.id,
        name: tName(draft.item),
        qty: draft.qty,
        unitPrice,
        options,
        note,
      });
    }
    saveCart();
    $("specSheet").hidden = true;
    toast(lang === "zh" ? "已加入购物车" : "Added to cart");
  }

  function renderCartBar() {
    const count = cartCount();
    const bar = $("cartBar");
    if (!count) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    $("cartCount").textContent = String(count);
    $("cartTotalLabel").textContent = money(cartTotal());
    $("checkoutBtn").textContent = lang === "zh" ? "去结算" : "Checkout";
  }

  function renderCartSheet() {
    const wrap = $("cartItems");
    if (!cart.length) {
      wrap.innerHTML = `<p class="empty">${lang === "zh" ? "购物车是空的" : "Cart is empty"}</p>`;
      return;
    }
    wrap.innerHTML = "";
    cart.forEach((line, idx) => {
      const opts = Object.values(line.options || {}).join(" / ");
      const el = document.createElement("div");
      el.className = "cart-line";
      el.innerHTML = `
        <div>
          <h3>${line.name} × ${line.qty}</h3>
          <p>${[opts, line.note].filter(Boolean).join(" · ")}</p>
        </div>
        <div class="cart-line-price">${money(line.unitPrice * line.qty)}</div>
      `;
      el.addEventListener("dblclick", () => {
        cart.splice(idx, 1);
        saveCart();
        renderCartSheet();
      });
      wrap.appendChild(el);
    });
  }

  async function submitOrder() {
    if (!cart.length) {
      toast(lang === "zh" ? "请先加点东西" : "Cart is empty");
      return;
    }
    const btn = $("submitOrderBtn");
    btn.disabled = true;
    btn.textContent = lang === "zh" ? "提交中…" : "Submitting…";
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table,
          fulfillment,
          remark: ($("orderRemark").value || "").trim(),
          items: cart.map((x) => ({
            id: x.id,
            name: x.name,
            qty: x.qty,
            unitPrice: x.unitPrice,
            options: x.options,
            note: x.note,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "下单失败");

      cart = [];
      saveCart();
      $("cartSheet").hidden = true;
      $("successCode").textContent =
        lang === "zh" ? `取餐号 ${data.order.code}` : `Pickup #${data.order.code}`;
      const modeLabel =
        fulfillment === "takeaway"
          ? lang === "zh"
            ? "外带"
            : "Takeaway"
          : lang === "zh"
            ? "堂食"
            : "Dine-in";
      $("successMsg").textContent =
        lang === "zh"
          ? `${data.message || "门店已收到"} · ${modeLabel} · 凭取餐号到吧台（演示单，未在线收款）`
          : `${data.message || "Order received"} · ${modeLabel} · Show code at counter (demo, no online pay)`;
      resetFeedbackGate();
      if (data.next?.reviewUrl) {
        $("reviewAfterOrder").href = data.next.reviewUrl;
      }
      $("successSheet").hidden = false;
      loadOrders();
      refreshQueueHint();
    } catch (err) {
      toast(err.message || "下单失败");
    } finally {
      btn.disabled = false;
      btn.textContent = lang === "zh" ? "提交订单" : "Place order";
    }
  }

  async function loadOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      const list = data.orders || [];
      const wrap = $("ordersList");
      if (!list.length) {
        wrap.innerHTML = `<p class="empty">${lang === "zh" ? "还没有单，先点个回锅肉" : "No orders yet"}</p>`;
        refreshQueueHint();
        return;
      }
      wrap.innerHTML = "";
      list.slice(0, 20).forEach((o) => {
        const card = document.createElement("article");
        card.className = "order-card";
        const when = new Date(o.createdAt).toLocaleString();
        const st = o.status || "received";
        const mode = o.fulfillment === "takeaway" ? (lang === "zh" ? "外带" : "Takeaway") : (lang === "zh" ? "堂食" : "Dine-in");
        const lines = (o.items || [])
          .map((i) => `<li>${i.name} × ${i.qty}</li>`)
          .join("");
        card.innerHTML = `
          <div class="order-card-top">
            <h3>${lang === "zh" ? "取餐号" : "#"} ${o.code}</h3>
            <button type="button" class="status-chip" data-id="${o.id}" data-status="${st}">${statusLabel(st)}</button>
          </div>
          <p class="meta">${when} · ${mode}${o.table ? ` · ${lang === "zh" ? "桌号" : "Table"} ${o.table}` : ""} · ${o.currency || "¥"}${o.total}</p>
          <ul>${lines}</ul>
          <p class="meta dim">${lang === "zh" ? "店员点击状态：接单→制作→请取餐→完成" : "Staff: tap status to advance"}</p>
        `;
        card.querySelector(".status-chip")?.addEventListener("click", async () => {
          const cur = card.querySelector(".status-chip").getAttribute("data-status") || "received";
          const idx = STATUS_FLOW.indexOf(cur);
          const next = STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
          if (next === cur) return;
          try {
            const r = await fetch("/api/orders/status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: o.id, status: next }),
            });
            const j = await r.json();
            if (!r.ok) throw new Error(j.error || "更新失败");
            loadOrders();
            refreshQueueHint();
          } catch (e) {
            toast(e.message || "更新失败");
          }
        });
        wrap.appendChild(card);
      });
      refreshQueueHint();
    } catch {
      /* ignore */
    }
  }

  function switchTab(name) {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === name);
    });
    $("panelMenu").classList.toggle("active", name === "menu");
    $("panelOrders").classList.toggle("active", name === "orders");
    $("panelReview").classList.toggle("active", name === "review");
    if (name === "orders") loadOrders();
  }

  function bind() {
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });

    $("langBtn").addEventListener("click", () => {
      lang = lang === "zh" ? "en" : "zh";
      localStorage.setItem("sb_order_lang", lang);
      renderStore();
      renderCats();
      renderMenu();
      renderCartBar();
      if (!$("cartSheet").hidden) renderCartSheet();
    });

    $("closeSpec").addEventListener("click", () => {
      $("specSheet").hidden = true;
    });
    $("closeCart").addEventListener("click", () => {
      $("cartSheet").hidden = true;
    });
    $("closeSuccess").addEventListener("click", () => {
      $("successSheet").hidden = true;
    });
    $("keepOrdering").addEventListener("click", () => {
      $("successSheet").hidden = true;
      switchTab("menu");
    });

    $("qtyMinus").addEventListener("click", () => {
      if (!draft) return;
      draft.qty = Math.max(1, draft.qty - 1);
      $("qtyValue").textContent = String(draft.qty);
      updateAddBtn();
    });
    $("qtyPlus").addEventListener("click", () => {
      if (!draft) return;
      draft.qty = Math.min(99, draft.qty + 1);
      $("qtyValue").textContent = String(draft.qty);
      updateAddBtn();
    });
    $("addCartBtn").addEventListener("click", addToCart);

    $("openCartBtn").addEventListener("click", () => {
      syncFulfillChips();
      renderCartSheet();
      $("cartSheet").hidden = false;
    });
    $("checkoutBtn").addEventListener("click", () => {
      syncFulfillChips();
      renderCartSheet();
      $("cartSheet").hidden = false;
    });
    document.querySelectorAll(".fulfill-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        fulfillment = btn.getAttribute("data-fulfill") || "takeaway";
        syncFulfillChips();
      });
    });
    bindFeedbackGate();
    syncFulfillChips();
    $("clearCart").addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCartSheet();
      $("cartSheet").hidden = true;
    });
    $("submitOrderBtn").addEventListener("click", submitOrder);

    // 菜单滚动时高亮分类
    const scroller = $("menuScroll");
    scroller?.addEventListener(
      "scroll",
      () => {
        const sections = [...document.querySelectorAll(".menu-section")];
        let current = activeCat;
        for (const sec of sections) {
          const top = sec.getBoundingClientRect().top;
          if (top < 140) current = sec.id.replace(/^sec-/, "");
        }
        if (current && current !== activeCat) {
          activeCat = current;
          renderCats();
        }
      },
      { passive: true }
    );
  }

  bind();
  loadMenu().catch((err) => {
    toast(err.message || "菜单加载失败");
    $("menuSections").innerHTML = `<p class="empty">${err.message || "菜单加载失败"}</p>`;
  });
})();

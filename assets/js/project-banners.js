(() => {
  "use strict";
  const attached = new WeakSet();
  function localizePromotions() {
    const lang = document.documentElement.lang.split("-")[0];
    document.querySelectorAll(".project-banner-slot").forEach(slot => {
      const caption = slot.querySelector(".project-banner-caption");
      const image = slot.querySelector("img");
      if (caption && image) {
        caption.textContent = caption.dataset[lang] || caption.dataset.ja || caption.textContent;
        image.alt = caption.textContent;
      }
    });
    document.querySelectorAll("[data-project-label]").forEach(node => {
      node.setAttribute("aria-label", node.getAttribute("data-label-" + lang) || node.getAttribute("data-label-ja"));
    });
    queueRailLayout();
  }
  function syncGroup(slot) {
    const group = slot.closest(".project-banner-group");
    if (group) group.hidden = !Array.from(group.querySelectorAll(".project-banner-slot")).some(item => !item.hidden);
  }
  let railFrame = 0;
  function queueRailLayout() {
    if (railFrame) return;
    railFrame = requestAnimationFrame(() => { railFrame = 0; layoutRails(); });
  }
  let commonRail = null;
  let slimReady = false;
  let slimRequested = false;
  function prepareSlimImages() {
    if (slimRequested || window.innerWidth < 1200) return;
    slimRequested = true;
    const files = ["book", "game"];
    let loaded = 0;
    files.forEach(kind => {
      const image = new Image();
      image.onload = () => {
        if (image.naturalWidth !== 280 || image.naturalHeight !== 1360) return;
        if (++loaded === 2) { slimReady = true; queueRailLayout(); }
      };
      image.src = `/assets/banners/${kind}-slim.png`;
    });
  }
  function initCommonRail() {
    const shell = document.querySelector(".page-shell");
    const footer = shell?.querySelector(":scope > .site-footer");
    if (!shell || !footer) return;
    const content = document.createElement("div");
    content.className = "project-layout-content";
    Array.from(shell.children).filter(node => node !== footer).forEach(node => content.append(node));
    const rail = document.createElement("aside");
    rail.className = "project-common-rail project-banner-group";
    rail.hidden = true;
    rail.setAttribute("data-project-label", "");
    const labels = {ja:"別提供のアプリ・制作中ゲーム",en:"A separate app and a game in development",zh:"独立应用与开发中的游戏",ko:"별도 앱과 개발 중인 게임"};
    Object.entries(labels).forEach(([lang,label]) => rail.setAttribute("data-label-" + lang,label));
    const captions = {
      book: {ja:"ビュッ｜別提供アプリ",en:"Byu — a separate app",zh:"独立应用 Byu",ko:"별도 앱 Byu"},
      game: {ja:"温泉すごろく｜開発中",en:"Hot spring game — In development",zh:"温泉双六 — 开发中",ko:"온천 게임 — 개발 중"}
    };
    rail.innerHTML = ["book", "game"].map(kind => {
      const attributes = Object.entries(captions[kind]).map(([lang,text]) => `data-${lang}="${text}"`).join(" ");
      return `<div class="project-banner-slot" hidden><a class="project-banner-link" href="https://esunastudio-viewer.pages.dev/${kind === "book" ? "viewer/" : ""}" target="_blank" rel="noopener noreferrer" data-analytics-link="${kind}-project" data-analytics-area="common-project-rail"><picture><source data-common-slim media="not all" srcset="/assets/banners/${kind}-slim.png"><source media="(min-width:768px)" srcset="/assets/banners/${kind}-wide.png"><img src="/assets/banners/${kind}-card.png" width="780" height="900" alt="${captions[kind].ja}" loading="eager" decoding="async"></picture><span class="project-banner-caption" ${attributes}>${captions[kind].ja}</span></a></div>`;
    }).join("");
    shell.append(content, rail, footer);
    commonRail = {shell,content,rail,footer};
    new ResizeObserver(queueRailLayout).observe(content);
  }
  function layoutRails() {
    if (!commonRail) return;
    prepareSlimImages();
    const {shell, content, rail} = commonRail;
    const main = content.querySelector("main");
    if (!main) return;
    const contentBox = content.getBoundingClientRect();
    const offset = Math.max(0, main.getBoundingClientRect().top - contentBox.top);
    // Keep both banners within the content row; short pages use their lower pair instead.
    const active = slimReady && window.innerWidth >= 1200 && document.body.clientWidth >= 1140 &&
      contentBox.height - offset >= 1600;
    shell.classList.toggle("project-layout-shell--rail", active);
    rail.style.setProperty("--project-common-offset", offset + "px");
    rail.querySelectorAll("[data-common-slim]").forEach(source => {
      const media = active ? "(min-width:1200px)" : "not all";
      if (source.media !== media) source.media = media;
    });
    const hasLowerPair = !!content.querySelector(".project-promo-section:not(.project-promo-top) .project-banner-group");
    rail.hidden = !(active || !hasLowerPair);
  }
  function attach(scope) {
    scope.querySelectorAll(".project-banner-slot").forEach(slot => {
      const image = slot.querySelector("img");
      if (!image || attached.has(image)) return;
      attached.add(image);
      const update = () => {
        slot.hidden = !(image.complete && image.naturalWidth > 0);
        syncGroup(slot);
        queueRailLayout();
      };
      image.addEventListener("load", update);
      image.addEventListener("error", () => { slot.hidden = true; syncGroup(slot); });
      update();
    });
  }
  initCommonRail();
  attach(document);
  localizePromotions();
  new MutationObserver(localizePromotions).observe(document.documentElement, {attributes: true, attributeFilter: ["lang"]});
  queueRailLayout();
  window.addEventListener("resize", queueRailLayout);
  window.addEventListener("load", queueRailLayout);
  const titleApp = document.getElementById("titleApp");
  if (titleApp) new MutationObserver(() => attach(titleApp)).observe(titleApp, {childList: true, subtree: true});
})();

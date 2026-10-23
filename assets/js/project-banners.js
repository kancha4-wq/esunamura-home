(() => {
  "use strict";
  const attached = new WeakSet();
  // Load every format before switching a product to its translated artwork.
  // A missing or malformed translation falls back to the original Japanese set.
  const bannerFormats = {wide:[1400,500],card:[780,900],strip:[1400,280],slim:[280,1360]};
  const readyBannerSets = new Set();
  const requestedBannerSets = new Set();
  function prepareBannerSet(kind, lang) {
    const key = `${lang}:${kind}`;
    if (requestedBannerSets.has(key)) return;
    requestedBannerSets.add(key);
    Promise.all(Object.entries(bannerFormats).map(([format, size]) => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image.naturalWidth === size[0] && image.naturalHeight === size[1]);
      image.onerror = () => resolve(false);
      image.src = `/assets/banners/${lang}/${kind}-${format}.png`;
    }))).then(results => {
      const ready = results.every(Boolean);
      document.documentElement.dataset[`${kind}${lang.toUpperCase()}Images`] = ready ? "ready" : "pending";
      if (ready) { readyBannerSets.add(key); localizePromotions(); }
    });
  }
  // Only the two app/game promotion types are in scope. Keep all existing
  // tracking parameters and fragments; language changes must not touch stores.
  const readerPaths = {ja:"/viewer/",en:"/viewer/en/",zh:"/viewer/zh-Hans/",ko:"/viewer/ko/"};
  function localizeProjectLinks(lang) {
    const language = Object.hasOwn(readerPaths, lang) ? lang : "ja";
    document.querySelectorAll('.project-banner-link[data-analytics-link="book-project"], .project-banner-link[data-analytics-link="game-project"], .project-reader-note a[data-analytics-link="book-project"]').forEach(link => {
      const original = link.dataset.projectOriginalHref || link.getAttribute("href");
      if (!original) return;
      const target = new URL(original, document.baseURI);
      if (target.origin !== "https://esunastudio-viewer.pages.dev") return;
      const book = link.dataset.analyticsLink === "book-project";
      if (book ? !Object.values(readerPaths).includes(target.pathname) : target.pathname !== "/") return;
      link.dataset.projectOriginalHref = original;
      if (book) target.pathname = readerPaths[language];
      // Explicit ja also overrides a previously saved language on the game HP.
      else target.searchParams.set("lang", language);
      if (link.getAttribute("href") !== target.href) link.setAttribute("href", target.href);
    });
  }
  function localizeBannerImages(lang) {
    const translated = ["en", "zh", "ko"].includes(lang);
    document.querySelectorAll('.project-banner-link[data-analytics-link="book-project"], .project-banner-link[data-analytics-link="game-project"]').forEach(link => {
      const kind = link.dataset.analyticsLink === "book-project" ? "book" : "game";
      const ready = translated && readyBannerSets.has(`${lang}:${kind}`);
      link.querySelectorAll("picture source, picture img").forEach(image => {
        const attribute = image.tagName === "SOURCE" ? "srcset" : "src";
        const original = image.dataset.projectOriginalSource || image.getAttribute(attribute);
        if (!original || !original.startsWith(`/assets/banners/${kind}-`)) return;
        image.dataset.projectOriginalSource = original;
        const wanted = ready ? original.replaceAll(`/assets/banners/${kind}-`, `/assets/banners/${lang}/${kind}-`) : original;
        if (image.getAttribute(attribute) !== wanted) image.setAttribute(attribute, wanted);
      });
      if (translated) prepareBannerSet(kind, lang);
    });
  }
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
    localizeProjectLinks(lang);
    localizeBannerImages(lang);
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
    const presetRail = shell.querySelector(":scope > .dlsite-category-rail");
    const content = document.createElement("div");
    content.className = "project-layout-content";
    Array.from(shell.children).filter(node => node !== footer && node !== presetRail).forEach(node => content.append(node));
    const rail = presetRail || document.createElement("aside");
    if (presetRail) {
      rail.classList.add("project-common-rail");
    } else {
      rail.className = "dlsite-category-rail project-common-rail";
      rail.setAttribute("aria-labelledby", "dlsite-category-title");
      rail.innerHTML = `
        <div class="header-project-bars project-banner-group" data-project-label data-label-ja="書籍アプリとゲーム" data-label-en="Book app and game" data-label-zh="书籍应用与游戏" data-label-ko="도서 앱과 게임" aria-label="書籍アプリとゲーム">
          <div class="project-banner-slot" hidden><a class="project-banner-link" href="https://esunastudio-viewer.pages.dev/viewer/" target="_blank" rel="noopener noreferrer" data-analytics-link="book-project" data-analytics-area="header-project-bars"><picture><img src="/assets/banners/book-slim.png" width="280" height="1360" alt="ビュッ｜別提供アプリ" loading="eager" decoding="async"></picture></a></div>
          <div class="project-banner-slot" hidden><a class="project-banner-link" href="https://esunastudio-viewer.pages.dev/" target="_blank" rel="noopener noreferrer" data-analytics-link="game-project" data-analytics-area="header-project-bars"><picture><img src="/assets/banners/game-slim.png" width="280" height="1360" alt="温泉すごろく｜開発中" loading="eager" decoding="async"></picture></a></div>
        </div>
        <div class="dlsite-category-panel">
          <p class="dlsite-category-brand">DLsite</p>
          <h2 id="dlsite-category-title" data-ja="内容カテゴリから探す" data-en="Browse by category" data-zh="按内容分类浏览" data-ko="콘텐츠 카테고리로 찾기">内容カテゴリから探す</h2>
          <nav class="dlsite-link-explorer" id="dlsiteLinkExplorer" aria-label="DLsite affiliate link explorer"></nav>
          <p class="dlsite-affiliate-disclosure" data-ja="※リンクにはアフィリエイトIDを含みます" data-en="Affiliate links are used." data-zh="※链接含推广ID" data-ko="※제휴 링크가 포함됩니다">※リンクにはアフィリエイトIDを含みます</p>
        </div>`;
    }
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
    const isCategoryRail = rail.classList.contains("dlsite-category-rail");
    const active = isCategoryRail
      ? window.innerWidth >= 1230 && document.body.clientWidth >= 1230
      : slimReady && window.innerWidth >= 1200 && document.body.clientWidth >= 1140 && contentBox.height - offset >= 1600;
    shell.classList.toggle("project-layout-shell--rail", active);
    shell.classList.toggle("project-layout-shell--dlsite", active && isCategoryRail);
    rail.style.setProperty("--project-common-offset", (isCategoryRail ? 0 : offset) + "px");
    rail.querySelectorAll("[data-common-slim]").forEach(source => {
      const media = active ? "(min-width:1200px)" : "not all";
      if (source.media !== media) source.media = media;
    });
    const hasLowerPair = !!content.querySelector(".project-promo-section:not(.project-promo-top) .project-banner-group");
    rail.hidden = isCategoryRail ? false : !(active || !hasLowerPair);
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
  if (document.getElementById("dlsiteLinkExplorer") && !document.querySelector('script[src*="dlsite-link-explorer.js"]')) {
    const explorerScript = document.createElement("script");
    explorerScript.src = "/assets/js/dlsite-link-explorer.js?v=20261023-locale-sync";
    document.head.append(explorerScript);
  }
  attach(document);
  document.querySelectorAll('[data-analytics-link="book-project"] .project-banner-caption').forEach(caption => {
    caption.dataset.en = caption.dataset.en.replace(/\bByu(?: app)?\b/, "Byu: Manga, EPUB & Read Aloud");
    caption.dataset.en += " — PC sample UI; Android capture pending";
  });
  localizePromotions();
  new MutationObserver(localizePromotions).observe(document.documentElement, {attributes: true, attributeFilter: ["lang"]});
  queueRailLayout();
  window.addEventListener("resize", queueRailLayout);
  window.addEventListener("load", queueRailLayout);
  const titleApp = document.getElementById("titleApp");
  if (titleApp) new MutationObserver(records => {
    attach(titleApp);
    // Only rendered elements can introduce a new reader link; caption text
    // changes must not recursively trigger localization.
    if (records.some(record => Array.from(record.addedNodes).some(node => node.nodeType === 1))) {
      localizeProjectLinks(document.documentElement.lang.split("-")[0]);
      localizeBannerImages(document.documentElement.lang.split("-")[0]);
    }
  }).observe(titleApp, {childList: true, subtree: true});
})();

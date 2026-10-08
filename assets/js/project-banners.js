(() => {
  "use strict";
  const attached = new WeakSet();
  // English artwork is supplied separately. Keep the approved Japanese artwork
  // until every required English format has loaded at its expected dimensions.
  const bookFormats = {wide:[1400,500],card:[780,900],strip:[1400,280],slim:[280,1360]};
  let englishBookReady = false;
  let englishBookRequested = false;
  function prepareEnglishBooks() {
    if (englishBookRequested) return;
    englishBookRequested = true;
    Promise.all(Object.entries(bookFormats).map(([format, size]) => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image.naturalWidth === size[0] && image.naturalHeight === size[1]);
      image.onerror = () => resolve(false);
      image.src = `/assets/banners/en/book-${format}.png`;
    }))).then(results => {
      englishBookReady = results.every(Boolean);
      document.documentElement.dataset.readerEnglishImages = englishBookReady ? "ready" : "pending";
      if (englishBookReady) localizePromotions();
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
  function localizeBookImages(lang) {
    const english = lang === "en" && englishBookReady;
    document.querySelectorAll('.project-banner-link[data-analytics-link="book-project"]').forEach(link => {
      link.querySelectorAll("picture source, picture img").forEach(image => {
        const attribute = image.tagName === "SOURCE" ? "srcset" : "src";
        const original = image.dataset.readerOriginalSource || image.getAttribute(attribute);
        if (!original || !original.includes("/assets/banners/book-")) return;
        image.dataset.readerOriginalSource = original;
        const wanted = english ? original.replaceAll("/assets/banners/book-", "/assets/banners/en/book-") : original;
        if (image.getAttribute(attribute) !== wanted) image.setAttribute(attribute, wanted);
      });
    });
    if (lang === "en") prepareEnglishBooks();
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
    localizeBookImages(lang);
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
      localizeBookImages(document.documentElement.lang.split("-")[0]);
    }
  }).observe(titleApp, {childList: true, subtree: true});
})();

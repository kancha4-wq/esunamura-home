(() => {
  "use strict";
  const attached = new WeakSet();
  function localizePromotions() {
    const lang = document.documentElement.lang.split("-")[0];
    document.querySelectorAll(".project-banner-slot").forEach(slot => {
      const caption = slot.querySelector(".project-banner-caption");
      const image = slot.querySelector("img");
      if (caption && image) image.alt = caption.dataset[lang] || caption.dataset.ja || image.alt;
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
  function layoutRails() {
    document.querySelectorAll(".project-banner-slot[data-project-rail]").forEach(slot => {
      const shell = slot.closest(".page-shell");
      const main = slot.closest("main");
      const source = slot.querySelector("[data-project-rail-source]");
      const caption = slot.querySelector(".project-banner-caption");
      if (!shell || !main || !source) return;
      shell.classList.add("project-banner-rail-shell");
      const shellBox = shell.getBoundingClientRect();
      const mainBox = main.getBoundingClientRect();
      const slotBox = slot.getBoundingClientRect();
      const railTop = mainBox.top + 8;
      const width = Math.min(document.documentElement.clientWidth, document.body.clientWidth);
      const margin = getComputedStyle(slot);
      const normalSpace = slot.classList.contains("project-banner-slot--rail") ? 0 :
        slotBox.height + parseFloat(margin.marginTop || 0) + parseFloat(margin.marginBottom || 0);
      const context = slot.querySelector(".project-context-label");
      const requiredHeight = 750 + (caption?.getBoundingClientRect().height || 44) +
        (context ? context.getBoundingClientRect().height + 8 : 0) + 2;
      // Evaluate remaining content without the normal banner, so short pages cannot oscillate.
      const fits = width >= 1900 && width - shellBox.right >= 224 &&
        mainBox.bottom - normalSpace - railTop >= requiredHeight + 24;
      slot.style.setProperty("--project-rail-left", `${shellBox.width + 24 - shell.clientLeft}px`);
      slot.style.setProperty("--project-rail-top", `${railTop - shellBox.top - shell.clientTop}px`);
      slot.classList.toggle("project-banner-slot--rail", fits);
      const media = fits ? "(min-width: 0px)" : "not all";
      if (source.media !== media) source.media = media;
    });
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
  attach(document);
  localizePromotions();
  new MutationObserver(localizePromotions).observe(document.documentElement, {attributes: true, attributeFilter: ["lang"]});
  queueRailLayout();
  window.addEventListener("resize", queueRailLayout);
  window.addEventListener("load", queueRailLayout);
  const titleApp = document.getElementById("titleApp");
  if (titleApp) new MutationObserver(() => attach(titleApp)).observe(titleApp, {childList: true, subtree: true});
})();

(() => {
  "use strict";
  const attached = new WeakSet();
  function syncGroup(slot) {
    const group = slot.closest(".project-banner-group");
    if (group) group.hidden = !Array.from(group.querySelectorAll(".project-banner-slot")).some(item => !item.hidden);
  }
  function attach(scope) {
    scope.querySelectorAll(".project-banner-slot").forEach(slot => {
      const image = slot.querySelector("img");
      if (!image || attached.has(image)) return;
      attached.add(image);
      const update = () => {
        slot.hidden = !(image.complete && image.naturalWidth > 0);
        syncGroup(slot);
      };
      image.addEventListener("load", update);
      image.addEventListener("error", () => { slot.hidden = true; syncGroup(slot); });
      update();
    });
  }
  attach(document);
  const titleApp = document.getElementById("titleApp");
  if (titleApp) new MutationObserver(() => attach(titleApp)).observe(titleApp, {childList: true, subtree: true});
})();

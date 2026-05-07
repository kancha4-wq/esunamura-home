(function () {
  const triggerSelector = [
    ".research-intro-trigger",
    "a.research-image-link",
    "a.research-sample-thumb",
    ".sample-gallery a",
    ".prompt-sample-gallery a",
    ".prompt-hero-gallery a"
  ].join(",");
  let lightbox = null;
  let lightboxImage = null;
  let closeButton = null;
  let activeTrigger = null;
  let previousBodyOverflow = "";

  function isImageUrl(url) {
    return /\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i.test(url || "");
  }

  function ensureLightbox() {
    if (lightbox) return;
    lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "画像の拡大表示");
    lightbox.innerHTML = `
      <div class="image-lightbox__inner">
        <button class="image-lightbox__close" type="button" aria-label="拡大表示を閉じる">×</button>
        <img class="image-lightbox__image" src="" alt="" decoding="async">
      </div>
    `;
    document.body.append(lightbox);
    closeButton = lightbox.querySelector(".image-lightbox__close");
    lightboxImage = lightbox.querySelector(".image-lightbox__image");

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  function imageDataFromTrigger(trigger) {
    const image = trigger.querySelector("img");
    const source = trigger.dataset.fullSrc || trigger.getAttribute("href") || image?.currentSrc || image?.src || "";
    return {
      source,
      alt: trigger.dataset.fullAlt || image?.alt || ""
    };
  }

  function openLightbox(trigger) {
    const { source, alt } = imageDataFromTrigger(trigger);
    if (!source || !isImageUrl(source)) return false;

    ensureLightbox();
    activeTrigger = trigger;
    lightboxImage.src = source;
    lightboxImage.alt = alt;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightbox.classList.add("is-open");
    closeButton.focus();
    return true;
  }

  function closeLightbox() {
    if (!lightbox?.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = previousBodyOverflow;
    if (activeTrigger) activeTrigger.focus();
    activeTrigger = null;
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(triggerSelector);
    if (!trigger) return;
    if (!openLightbox(trigger)) return;
    event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();

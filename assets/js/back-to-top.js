(function () {
  const threshold = 520;
  const button = document.createElement("button");
  button.className = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "ページ上部へ戻る");
  button.textContent = "TOP";
  document.body.append(button);

  function updateVisibility() {
    button.classList.toggle("is-visible", window.scrollY > threshold);
  }

  button.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
})();

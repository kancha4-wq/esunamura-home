(function () {
  const root = document.querySelector("#outfitCategories");
  const data = window.outfitPromptData;
  const languageButtons = document.querySelectorAll(".lang-button");

  if (!root || !data?.categories) return;

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function currentLanguage() {
    try {
      return window.localStorage.getItem("archiveLang") || "ja";
    } catch (error) {
      return "ja";
    }
  }

  function localized(value, language = currentLanguage()) {
    if (!value || typeof value !== "object") return value || "";
    return value[language] || value.ja || "";
  }

  function renderCard(item, category) {
    const label = item.label || item.code;
    const alt = `SDXL 服装プロンプト検証 Vol.1：${localized(category.title, "ja")}「${label}」の生成サンプル`;
    return `
      <article class="outfit-candidate-card">
        <a class="research-image-link outfit-candidate-image" href="${escapeHTML(item.src)}" data-full-alt="${escapeHTML(alt)}">
          <img src="${escapeHTML(item.src)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async" width="720" height="1234">
        </a>
        <div class="outfit-candidate-caption">
          <strong>${escapeHTML(item.code)}</strong>
          <span>${escapeHTML(label)}</span>
        </div>
      </article>
    `;
  }

  function render() {
    const language = currentLanguage();
    root.innerHTML = data.categories.map((category) => `
      <section class="research-section outfit-category-section" id="${escapeHTML(category.id)}">
        <div class="section-heading-row">
          <div>
            <p class="eyebrow">${escapeHTML(category.code)} Outfit Set</p>
            <h2>${escapeHTML(localized(category.title, language))}</h2>
          </div>
          <p>${escapeHTML(localized(category.lead, language))}</p>
        </div>
        <div class="outfit-candidate-grid">
          ${category.items.map((item) => renderCard(item, category)).join("")}
        </div>
      </section>
    `).join("");
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.requestAnimationFrame(render);
    });
  });

  render();
})();

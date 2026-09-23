(async function () {
  const root = document.querySelector("#costumeCategories");
  const filters = document.querySelector("#costumeFilters");
  const rootPrefix = document.body.dataset.rootPrefix || "../../";
  const dataFile = document.body.dataset.costumeData;
  if (!root || !filters || !dataFile) return;

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[char]);
  const language = () => { try { return window.localStorage.getItem("archiveLang") || "ja"; } catch (_) { return "ja"; } };
  const ui = {
    all: { ja: "すべて", en: "All", zh: "全部", ko: "전체" },
    positive: { ja: "Positive Prompt", en: "Positive Prompt", zh: "正向提示词", ko: "긍정 프롬프트" },
    result: { ja: "検証メモ", en: "Test note", zh: "验证说明", ko: "검증 메모" },
    note: { ja: "背景・照明・ポーズを含めず、服装の形と構成だけを比較するプロンプトです。", en: "This prompt compares costume shape and construction without scene, lighting, or pose directions.", zh: "仅比较服装造型与结构，不包含背景、灯光或姿势指令。", ko: "배경·조명·포즈 없이 의상 형태와 구성만 비교하는 프롬프트입니다." }
  };
  const localized = (value) => value?.[language()] || value?.ja || value || "";
  let data;
  try {
    const response = await fetch(`${rootPrefix}assets/data/${dataFile}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (_) {
    root.innerHTML = '<p class="research-empty">データを読み込めませんでした。</p>';
    return;
  }

  let activeGroup = "all";
  const itemLabel = (item) => language() === "ja" ? item.label_ja : item.label_en;
  const groupLabel = (group) => language() === "ja" ? group.label_ja : group.label_en;
  function renderFilters() {
    const groups = [{ id: "all", label_ja: "すべて", label_en: "All", count: data.count }, ...data.groups];
    filters.innerHTML = groups.map((group) => `<button class="research-section-tab${activeGroup === group.id ? " is-active" : ""}" type="button" data-costume-group="${escapeHTML(group.id)}"><span>${escapeHTML(group.id === "all" ? localized(ui.all) : groupLabel(group))}</span><strong>${escapeHTML(group.count)}</strong></button>`).join("");
    filters.querySelectorAll("[data-costume-group]").forEach((button) => button.addEventListener("click", () => { activeGroup = button.dataset.costumeGroup; renderFilters(); renderItems(); }));
  }
  function card(item) {
    const label = itemLabel(item);
    const src = String(item.src).replace(/^(?:\.\.\/)+assets\//, `${rootPrefix}assets/`);
    return `<article class="research-candidate-card outfit-log-card cosplay-log-card" id="${escapeHTML(item.code.toLowerCase())}"><div class="research-candidate-media"><a class="research-image-link" href="${escapeHTML(src)}" data-full-alt="${escapeHTML(label)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHTML(src)}" alt="SDXL costume prompt: ${escapeHTML(label)}" loading="lazy" decoding="async" width="720" height="926"></a></div><div class="research-candidate-copy"><div class="research-card-heading"><h3>${escapeHTML(label)}</h3><span class="cosplay-code">${escapeHTML(item.code)}</span></div><dl class="research-meta-list"><div><dt>${escapeHTML(localized(ui.result))}</dt><dd>${escapeHTML(localized(ui.note))}</dd></div></dl><div class="research-prompt-stack research-prompt-stack-static"><section class="research-prompt-panel"><h4>${escapeHTML(localized(ui.positive))}</h4><pre>${escapeHTML(item.prompt)}</pre></section></div></div></article>`;
  }
  function renderItems() {
    const items = activeGroup === "all" ? data.items : data.items.filter((item) => item.group === activeGroup);
    root.innerHTML = `<section class="research-section cosplay-category-section"><div class="research-candidate-grid">${items.map(card).join("")}</div></section>`;
    window.installPromptCopyButtons?.(root);
  }
  document.querySelectorAll(".lang-button").forEach((button) => button.addEventListener("click", () => window.requestAnimationFrame(() => { renderFilters(); renderItems(); })));
  renderFilters(); renderItems();
})();

(function () {
  const data = window.researchSampleCandidates;
  const pageSection = document.body.dataset.researchSection || "";
  const rootPrefix = document.body.dataset.rootPrefix || "../";
  const sectionsRoot = document.querySelector("#researchSections");
  const contactRoot = document.querySelector("#researchContactSheets");
  const languageButtons = document.querySelectorAll(".lang-button");
  const translatableNodes = document.querySelectorAll("[data-ja]");

  const sectionCopy = {
    hairstyle: {
      title: "髪型プロンプト検証",
      lead: "候補画像とプロンプトを1件ずつ確認できます。"
    },
    bangs: {
      title: "前髪プロンプト検証",
      lead: "顔まわりの印象差を候補画像ごとに確認できます。"
    },
    hair_color: {
      title: "髪色プロンプト検証",
      lead: "色味とキャラへの馴染みを候補画像ごとに確認できます。"
    }
  };

  const sectionContactIds = {
    hairstyle: ["hairstyle"],
    hairstyle_test19: ["hairstyle_test19_selected", "test19_all_contact"],
    bangs_test20: ["test20_selected_contact", "test20_all_contact"],
    bangs: ["bangs_selected_contact_test18", "test18_overview"],
    hair_color: ["hair_color_test21", "hair_color"]
  };

  const pageSectionGroups = {
    hairstyle: ["hairstyle_test19", "hairstyle"],
    bangs: ["bangs_test20", "bangs"],
    hair_color: ["hair_color_test21", "hair_color"]
  };

  function withPagePrefix(path) {
    return `${rootPrefix}${path}`;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function itemsFor(sectionId) {
    return data.items
      .filter((item) => item.section === sectionId && !item.public_hidden)
      .sort((a, b) => a.order - b.order);
  }

  function textOrUnset(value) {
    return value && String(value).trim() ? String(value) : "未設定";
  }

  function promptBlock(label, value) {
    return `${label}:\n${textOrUnset(value)}`;
  }

  function visiblePromptParts(parts) {
    return parts
      .filter((part) => part.value && String(part.value).trim() && String(part.value).trim() !== "hidden")
      .map((part) => promptBlock(part.label, part.value));
  }

  function stripWeight(text) {
    return String(text || "")
      .replace(/[()]/g, "")
      .replace(/:\d+(?:\.\d+)?/g, "")
      .trim();
  }

  function importantTagFor(item) {
    if (item.important_tags) return item.important_tags;
    const prompt = item.positive_hair_prompt || item.positive_prompt || "";
    if (item.section.startsWith("hair_color")) {
      const colorTag = prompt.split(",").map(stripWeight).find((part) => part.includes("hair"));
      return colorTag || item.theme.replaceAll("_", " ");
    }
    if (item.section === "bangs") {
      const bangsTags = [
        "see-through bangs",
        "side-swept bangs",
        "full straight bangs",
        "curtain bangs",
        "long face framing bangs",
        "heavy eye-covering bangs"
      ];
      return bangsTags.find((tag) => prompt.includes(tag)) || item.theme.replaceAll("_", " ");
    }
    const hairstyleTags = [
      { checks: ["short bob", "side braid"], label: "short bob + side braid" },
      { checks: ["low side ponytail", "side braid"], label: "low side ponytail + side braid" },
      { checks: ["long loose hair", "side braid"], label: "long hair + side braid" },
      { checks: ["short bob"], label: "short bob" },
      { checks: ["low side ponytail"], label: "low side ponytail" }
    ];
    const matched = hairstyleTags.find((tag) => tag.checks.every((check) => prompt.includes(check)));
    return matched?.label || item.theme.replaceAll("_", " ");
  }

  function renderPromptDetails(item) {
    const positivePrompt = visiblePromptParts([
      { label: "positive_hair_prompt", value: item.positive_hair_prompt || item.positive_prompt },
      { label: "fixed_bangs_prompt", value: item.fixed_bangs_prompt },
      { label: "fixed_face_prompt", value: item.fixed_face_prompt }
    ]).join("\n\n") || "未設定";
    const negativePrompt = promptBlock("negative_hair_prompt", item.negative_hair_prompt || item.negative_prompt);
    return `
      <div class="research-prompt-stack">
        <details class="research-prompt-details">
          <summary>positive prompt</summary>
          <pre>${escapeHTML(positivePrompt)}</pre>
        </details>
        <details class="research-prompt-details">
          <summary>negative prompt</summary>
          <pre>${escapeHTML(negativePrompt)}</pre>
        </details>
      </div>
    `;
  }

  function renderCandidateCard(item) {
    return `
      <article class="research-candidate-card">
        <a class="research-image-link" href="${escapeHTML(withPagePrefix(item.asset_path))}" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHTML(withPagePrefix(item.asset_path))}" alt="${escapeHTML(item.jp_label)}" loading="lazy" decoding="async">
        </a>
        <div class="research-candidate-copy">
          <h3>${escapeHTML(item.jp_label)}</h3>
          <dl class="research-meta-list">
            <div><dt>重要タグ</dt><dd>${escapeHTML(importantTagFor(item))}</dd></div>
            <div><dt>検証結果</dt><dd>${escapeHTML(item.verification_note || item.reason)}</dd></div>
          </dl>
          ${renderPromptDetails(item)}
        </div>
      </article>
    `;
  }

  function contactSheetsFor(sectionId) {
    const ids = sectionContactIds[sectionId] || [];
    return (data.contact_sheets || []).filter((sheet) => ids.includes(sheet.id));
  }

  function renderContactSheets(sectionId) {
    if (!contactRoot) return;
    const sheets = contactSheetsFor(sectionId);
    contactRoot.innerHTML = sheets.map((sheet) => `
      <a class="research-contact-card" href="${escapeHTML(withPagePrefix(sheet.path))}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHTML(withPagePrefix(sheet.path))}" alt="${escapeHTML(sheet.label)}" loading="lazy" decoding="async">
        <span>${escapeHTML(sheet.label)}</span>
      </a>
    `).join("");
  }

  function renderSectionPage(sectionId) {
    const copy = sectionCopy[sectionId];
    const items = itemsFor(sectionId);
    if (!copy) return "";
    return `
      <section class="research-section" id="${escapeHTML(sectionId)}">
        <div class="section-heading-row">
          <div>
            <h2>${escapeHTML(copy.title)}</h2>
          </div>
          <p>${escapeHTML(copy.lead).replaceAll("\n", "<br>")}</p>
        </div>
        <div class="research-candidate-grid">
          ${items.map(renderCandidateCard).join("")}
        </div>
      </section>
    `;
  }

  function renderPageSections(sectionId) {
    if (!sectionsRoot) return;
    const sectionIds = pageSectionGroups[sectionId] || [sectionId];
    if (sectionIds.length > 1) {
      const copy = sectionCopy[sectionId];
      const seenTags = new Set();
      const items = sectionIds.flatMap(itemsFor).filter((item) => {
        const tag = importantTagFor(item);
        const key = `${item.section.startsWith("hairstyle") ? "hairstyle" : item.section.startsWith("bangs") ? "bangs" : item.section.startsWith("hair_color") ? "hair_color" : item.section}:${tag}`;
        if (seenTags.has(key)) return false;
        seenTags.add(key);
        return true;
      });
      sectionsRoot.innerHTML = `
        <section class="research-section" id="${escapeHTML(sectionId)}">
          <div class="section-heading-row">
            <div>
              <h2>${escapeHTML(copy.title)}</h2>
            </div>
            <p>${escapeHTML(copy.lead).replaceAll("\n", "<br>")}</p>
          </div>
          <div class="research-candidate-grid">
            ${items.map(renderCandidateCard).join("")}
          </div>
        </section>
      `;
    } else {
      sectionsRoot.innerHTML = sectionIds.map(renderSectionPage).join("");
    }
    renderContactSheets(sectionId);
  }

  function setLanguage(language) {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("archiveLang", language);
    } catch (error) {
      // The visible page still updates when localStorage is unavailable.
    }
    translatableNodes.forEach((node) => {
      const value = node.dataset[language] || node.dataset.ja;
      if (node.classList.contains("lead")) {
        node.innerHTML = escapeHTML(value).replaceAll("&lt;br&gt;", "<br>");
        return;
      }
      node.textContent = value;
    });
    languageButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === language);
    });
    if (pageSection) {
      renderPageSections(pageSection);
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
  setLanguage(window.localStorage?.getItem("archiveLang") || "ja");

  if (!pageSection) return;
  if (!data || !Array.isArray(data.items)) {
    sectionsRoot.innerHTML = "<p>研究データを読み込めませんでした。</p>";
    return;
  }
})();

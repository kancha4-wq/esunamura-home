(function () {
  const root = document.querySelector("#outfitCategories");
  const data = window.outfitPromptData;
  const selectedCategoryId = document.body.dataset.outfitCategory || "";
  const rootPrefix = document.body.dataset.rootPrefix || "../../";
  const languageButtons = document.querySelectorAll(".lang-button");

  if (!root || !data?.categories) return;

  const uiText = {
    importantTags: {
      ja: "重要タグ",
      en: "Key tag",
      zh: "重要标签",
      ko: "중요 태그"
    },
    verificationResult: {
      ja: "検証結果",
      en: "Result note",
      zh: "验证结果",
      ko: "검증 결과"
    },
    unset: {
      ja: "未設定",
      en: "Not set",
      zh: "未设置",
      ko: "미설정"
    },
    sampleAltPrefix: {
      ja: "SDXL 服装プロンプト検証",
      en: "SDXL outfit prompt verification",
      zh: "SDXL 服装 Prompt 验证",
      ko: "SDXL 의상 프롬프트 검증"
    },
    sampleAltSuffix: {
      ja: "の生成サンプル",
      en: " generation sample",
      zh: "生成样本",
      ko: "생성 샘플"
    }
  };

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

  function clothingPromptText(prompt) {
    return String(prompt || "")
      .replace(/^adult woman character,\s*/i, "")
      .trim();
  }

  function titleCase(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b[a-z]/g, (char) => char.toUpperCase());
  }

  function promptLabel(item) {
    const prompt = clothingPromptText(item.prompt)
      .replace(/,\s*all-ages outfit reference.*$/i, "")
      .replace(/,\s*clean anime illustration.*$/i, "");
    const first = prompt.split(",").slice(0, 2).join(",").trim();
    return titleCase(first || item.code);
  }

  function itemLabel(item, language = currentLanguage()) {
    if (language === "ja") return item.label || item.code;
    return item[`label_${language}`] || promptLabel(item);
  }

  function hasAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  function japaneseVerificationNote(item, category) {
    const prompt = clothingPromptText(item.prompt).toLowerCase();
    const label = item.label || item.code;
    const observations = [];

    if (hasAny(prompt, ["button", "collar", "piping", "zip", "drawstring", "strap", "neckline", "obi", "sash", "panel line"])) {
      if (category?.id === "wasou") {
        observations.push("衿合わせや帯まわりの情報が、和装らしい構造として残るかを確認。");
      } else if (category?.id === "swimwear") {
        observations.push("ストラップやネックラインの違いが、シルエット差として読めるかを確認。");
      } else {
        observations.push("襟・前開き・縁取りなど、部屋着のディテールがどこまで読み取れるかを確認。");
      }
    }
    if (hasAny(prompt, ["long-sleeve", "short-sleeve", "three-quarter", "full-length", "shorts", "mini", "midi", "long skirt", "wide-leg", "hakama"])) {
      observations.push("袖丈や裾丈の差が、ポーズに埋もれず残るかを見る指定です。");
    }
    if (hasAny(prompt, ["stripe", "plaid", "floral", "polka-dot", "plain", "pattern", "motif", "gradation"])) {
      observations.push("柄の方向や密度が崩れすぎず、服装差として読めるかを見ています。");
    }
    if (hasAny(prompt, ["satin", "silk", "gauze", "flannel", "fleece", "waffle", "cotton", "jersey", "rib", "linen", "lace", "chiffon", "matte", "glossy", "sheer"])) {
      observations.push("布の厚みや光沢、やわらかさの違いが出るかを比較しやすい項目です。");
    }
    if (hasAny(prompt, ["robe", "cardigan", "haori", "cover-up", "hoodie", "rash guard", "pareo", "apron", "stole"])) {
      observations.push("重ね着や羽織り要素が、単なる色替えではなく別パーツとして出るかを確認。");
    }
    if (hasAny(prompt, ["ribbon", "bow", "hat", "sandals", "sunglasses", "bag", "hair ornament", "geta"])) {
      observations.push("小物を足したときに、主役の服装より目立ちすぎないかも見ています。");
    }

    if (category?.id === "pajama") {
      observations.push("室内着らしいゆるさと、上下セットのまとまりを確認するための服装プロンプトです。");
    } else if (category?.id === "wasou") {
      observations.push("和装らしい合わせ・帯・柄の情報が、キャラクター性を崩さず残るかを確認しています。");
    } else if (category?.id === "swimwear") {
      observations.push("露出量ではなく、シルエット・ストラップ・リゾート感の違いを比較するための指定です。");
    } else {
      observations.push("固定キャラクターの印象を保ったまま、衣装差だけを読み取れるかを確認しています。");
    }

    const unique = observations.filter((text, index) => observations.indexOf(text) === index);
    const selected = unique.slice(0, 2);
    if (!selected.length) return `${label}として、衣装の輪郭や素材感が安定して出るかを確認しています。`;
    return selected.join("");
  }

  function verificationNote(item, category, language = currentLanguage()) {
    if (language === "ja") return japaneseVerificationNote(item, category);
    const label = itemLabel(item, language);
    const templates = {
      en: `${label} outfit prompt test. Useful for comparing the clothing shape, material feel, and scene fit while keeping the character identity stable.`,
      zh: `${label} 服装 prompt 验证。用于比较在保持角色辨识度的同时，服装轮廓、材质感和场景适配是否稳定。`,
      ko: `${label} 의상 프롬프트 검증입니다. 캐릭터 인상을 유지하면서 의상 형태, 소재감, 장면 적합성이 안정적인지 비교하기 좋습니다.`
    };
    return templates[language] || templates.en;
  }

  function assetSrc(src) {
    return String(src || "").replace(/^(?:\.\.\/)+assets\//, `${rootPrefix}assets/`);
  }

  function renderPromptPanel(title, prompt) {
    const text = prompt || localized(uiText.unset);
    return `
      <section class="research-prompt-panel">
        <h4>${escapeHTML(title)}</h4>
        <pre>${escapeHTML(text)}</pre>
      </section>
    `;
  }

  function renderCard(item, category) {
    const language = currentLanguage();
    const label = itemLabel(item, language);
    const tag = itemLabel(item, language);
    const alt = `${localized(uiText.sampleAltPrefix, language)}: ${localized(category.title, language)} "${label}"${localized(uiText.sampleAltSuffix, language)}`;
    const imageSrc = assetSrc(item.src);
    const positivePrompt = clothingPromptText(item.prompt) || localized(uiText.unset, language);
    const negativePrompt = item.negative || localized(uiText.unset, language);
    const verification = verificationNote(item, category, language);
    return `
      <article class="research-candidate-card outfit-log-card" id="${escapeHTML(item.code.toLowerCase())}">
        <div class="research-candidate-media">
          <a class="research-image-link" href="${escapeHTML(imageSrc)}" data-full-alt="${escapeHTML(alt)}" target="_blank" rel="noopener noreferrer">
            <img src="${escapeHTML(imageSrc)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async" width="720" height="1234">
          </a>
        </div>
        <div class="research-candidate-copy">
          <div class="research-card-heading">
            <h3>${escapeHTML(label)}</h3>
          </div>
          <dl class="research-meta-list">
            <div><dt>${escapeHTML(localized(uiText.importantTags, language))}</dt><dd>${escapeHTML(tag)}</dd></div>
            <div><dt>${escapeHTML(localized(uiText.verificationResult, language))}</dt><dd>${escapeHTML(verification)}</dd></div>
          </dl>
          <div class="research-prompt-stack research-prompt-stack-static">
            ${renderPromptPanel("positive prompt", positivePrompt)}
            ${renderPromptPanel("negative prompt", negativePrompt)}
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const language = currentLanguage();
    const categories = selectedCategoryId
      ? data.categories.filter((category) => category.id === selectedCategoryId)
      : [];
    root.innerHTML = categories.map((category) => `
      <section class="research-section outfit-category-section" id="${escapeHTML(category.id)}">
        <div class="section-heading-row">
          <div>
            <p class="eyebrow">${escapeHTML(category.code)} Outfit Set</p>
            <h2>${escapeHTML(localized(category.title, language))}</h2>
          </div>
          <p>${escapeHTML(localized(category.lead, language))}</p>
        </div>
        <div class="research-candidate-grid">
          ${category.items.map((item) => renderCard(item, category)).join("")}
        </div>
      </section>
    `).join("");
    window.installPromptCopyButtons?.(root);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.requestAnimationFrame(render);
    });
  });

  render();
})();

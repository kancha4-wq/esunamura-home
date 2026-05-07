(function () {
  const data = window.researchSampleCandidates;
  const pageSection = document.body.dataset.researchSection || "";
  const rootPrefix = document.body.dataset.rootPrefix || "../";
  const sectionsRoot = document.querySelector("#researchSections");
  const contactRoot = document.querySelector("#researchContactSheets");
  const languageButtons = document.querySelectorAll(".lang-button");
  const translatableNodes = document.querySelectorAll("[data-ja]");
  let currentLanguage = "ja";

  const sectionCopy = {
    hairstyle: {
      ja: {
        title: "髪型プロンプト検証",
        lead: "候補画像とプロンプトを1件ずつ確認できます。"
      },
      en: {
        title: "Hairstyle Prompt Verification",
        lead: "Check each candidate image together with its prompt notes."
      },
      zh: {
        title: "发型 Prompt 验证",
        lead: "可以逐一查看候选图像与对应的 prompt 记录。"
      },
      ko: {
        title: "헤어스타일 프롬프트 검증",
        lead: "후보 이미지와 프롬프트 기록을 하나씩 확인할 수 있습니다."
      }
    },
    bangs: {
      ja: {
        title: "前髪プロンプト検証",
        lead: "顔まわりの印象差を候補画像ごとに確認できます。"
      },
      en: {
        title: "Bangs Prompt Verification",
        lead: "Compare how each candidate changes the impression around the face."
      },
      zh: {
        title: "刘海 Prompt 验证",
        lead: "可以按候选图像比较脸部周围印象的差异。"
      },
      ko: {
        title: "앞머리 프롬프트 검증",
        lead: "후보 이미지별로 얼굴 주변 인상이 어떻게 달라지는지 확인할 수 있습니다."
      }
    },
    hair_color: {
      ja: {
        title: "髪色プロンプト検証",
        lead: "色味とキャラへの馴染みを候補画像ごとに確認できます。"
      },
      en: {
        title: "Hair Color Prompt Verification",
        lead: "Compare each candidate for color tone stability and character fit."
      },
      zh: {
        title: "发色 Prompt 验证",
        lead: "可以按候选图像比较色味稳定性和角色适配度。"
      },
      ko: {
        title: "헤어 컬러 프롬프트 검증",
        lead: "후보 이미지별로 색감 안정성과 캐릭터와의 어울림을 비교할 수 있습니다."
      }
    }
  };

  const uiText = {
    importantTags: {
      ja: "重要タグ",
      en: "Key Tags",
      zh: "重要标签",
      ko: "중요 태그"
    },
    verificationResult: {
      ja: "検証結果",
      en: "Verification Result",
      zh: "验证结果",
      ko: "검증 결과"
    },
    unset: {
      ja: "未設定",
      en: "Not set",
      zh: "未设置",
      ko: "미설정"
    }
  };

  const sectionContactIds = {
    hairstyle: ["hairstyle_test25_selected", "hairstyle"],
    hairstyle_test19: ["hairstyle_test19_selected", "test19_all_contact"],
    hairstyle_test25: ["hairstyle_test25_selected"],
    bangs_test20: ["test20_selected_contact", "test20_all_contact"],
    bangs: ["bangs_selected_contact_test18", "test18_overview"],
    hair_color: ["hair_color_test21", "hair_color"]
  };

  const shareText = {
    research: "SDXL / illustriousXL 系モデル向けのプロンプト検証ログをまとめました。\n髪型、前髪、髪色、背景など、AIイラスト用の指定を比較しています。",
    hairstyle: "SDXL / illustriousXL 系モデル向けの髪型プロンプト検証をまとめました。\nショートボブ、姫カット、ツインテール、お団子など、AIイラスト用の髪型表現を比較しています。",
    bangs: "SDXL / illustriousXL 系モデル向けの前髪プロンプト検証をまとめました。\nシースルー前髪、流し前髪、重め前髪、片目隠れ前髪などを比較しています。",
    hair_color: "SDXL / illustriousXL 系モデル向けの髪色プロンプト検証をまとめました。\nピンク系、ブロンド系、青系、紫系、緑系などの髪色表現を比較しています。",
    background: "SDXL / illustriousXL 系モデル向けの背景プロンプト検証をまとめました。\n京都風、和風町並み、温泉旅館、海辺、リゾートなどの背景表現を比較しています。"
  };

  const pageSectionGroups = {
    hairstyle: ["hairstyle_test25", "hairstyle_test19", "hairstyle"],
    bangs: ["bangs_test20", "bangs"],
    hair_color: ["hair_color_test21", "hair_color"]
  };

  function withPagePrefix(path) {
    return `${rootPrefix}${path}`;
  }

  function pageShareUrl() {
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    return canonical || window.location.href.split("#")[0];
  }

  function shareIntentUrl(topic) {
    const params = new URLSearchParams({
      text: shareText[topic] || shareText.research,
      url: pageShareUrl()
    });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  }

  function updateShareLinks() {
    document.querySelectorAll(".research-share-button").forEach((link) => {
      const topic = link.dataset.shareTopic || document.body.dataset.shareTopic || pageSection || "research";
      link.href = shareIntentUrl(topic);
    });
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function slugFor(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "candidate";
  }

  function itemsFor(sectionId) {
    return data.items
      .filter((item) => item.section === sectionId && !item.public_hidden)
      .sort((a, b) => a.order - b.order);
  }

  function textOrUnset(value) {
    return value && String(value).trim() ? String(value) : localizedText(uiText.unset);
  }

  function cleanPromptText(value) {
    const text = String(value ?? "").replace(/\r\n?/g, "\n").trim();
    if (!text) return "";
    return text
      .split("\n")
      .map((line) => line.replace(/^\s*[a-z][a-z0-9_]*_prompt\s*:\s*/i, "").trim())
      .filter(Boolean)
      .join("\n");
  }

  function visiblePromptParts(parts) {
    return parts
      .filter((part) => part.value && String(part.value).trim() && String(part.value).trim() !== "hidden")
      .map((part) => cleanPromptText(part.value))
      .filter(Boolean);
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

  function localizedText(values) {
    return values?.[currentLanguage] || values?.ja || "";
  }

  function localizedSectionCopy(sectionId) {
    const copy = sectionCopy[sectionId] || {};
    return copy[currentLanguage] || copy.ja || { title: "", lead: "" };
  }

  function sectionKind(item) {
    if (item.section.startsWith("hair_color")) return "hair_color";
    if (item.section.startsWith("bangs")) return "bangs";
    if (item.section.startsWith("hairstyle")) return "hairstyle";
    return "research";
  }

  function localizedVerificationNote(item) {
    if (currentLanguage === "ja") return item.verification_note || item.reason || "";
    const tag = importantTagFor(item);
    const kind = sectionKind(item);
    const templates = {
      hairstyle: {
        en: `Candidate using "${tag}". This entry is useful for checking whether the hairstyle silhouette and character impression stay readable.`,
        zh: `使用“${tag}”的候选。适合确认发型轮廓是否清晰，以及角色印象是否保持稳定。`,
        ko: `"${tag}"를 사용한 후보입니다. 헤어스타일 실루엣이 잘 보이는지, 캐릭터 인상이 안정적으로 유지되는지 확인하기 좋습니다.`
      },
      bangs: {
        en: `Candidate using "${tag}". This entry is useful for comparing how the bangs change the face-framing impression.`,
        zh: `使用“${tag}”的候选。适合比较刘海如何改变脸部周围的印象。`,
        ko: `"${tag}"를 사용한 후보입니다. 앞머리가 얼굴 주변 인상을 어떻게 바꾸는지 비교하기 좋습니다.`
      },
      hair_color: {
        en: `Candidate using "${tag}". This entry is useful for checking color stability and how naturally the color fits the character.`,
        zh: `使用“${tag}”的候选。适合确认色味稳定性，以及该发色与角色的自然契合度。`,
        ko: `"${tag}"를 사용한 후보입니다. 색감 안정성과 캐릭터에 자연스럽게 어울리는지를 확인하기 좋습니다.`
      },
      research: {
        en: `Candidate using "${tag}". This entry is useful for comparing the generated result with the prompt.`,
        zh: `使用“${tag}”的候选。适合将生成结果与 prompt 进行比较。`,
        ko: `"${tag}"를 사용한 후보입니다. 생성 결과와 프롬프트를 비교하기 좋습니다.`
      }
    };
    return templates[kind]?.[currentLanguage] || item.verification_note || item.reason || "";
  }

  function renderPromptDetails(item) {
    const positivePrompt = visiblePromptParts([
      { label: "positive_hair_prompt", value: item.positive_hair_prompt || item.positive_prompt },
      { label: "fixed_bangs_prompt", value: item.fixed_bangs_prompt },
      { label: "fixed_face_prompt", value: item.fixed_face_prompt }
    ]).join("\n\n") || "未設定";
    const negativePrompt = cleanPromptText(item.negative_hair_prompt || item.negative_prompt) || localizedText(uiText.unset);
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

  function candidateImages(item) {
    const samples = Array.isArray(item.samples)
      ? item.samples.filter((sample) => sample.asset_path)
      : [];
    if (samples.length) return samples;
    return [{
      asset_path: item.asset_path,
      label: item.role || "main",
      filename: item.filename
    }];
  }

  function renderCandidateMedia(item) {
    const images = candidateImages(item);
    const mainImage = images[0];
    const mainAlt = `${item.jp_label}${mainImage.label ? ` ${mainImage.label}` : ""}`;
    const thumbs = images.slice(1);
    return `
      <div class="research-candidate-media${thumbs.length ? " has-samples" : ""}">
        <a class="research-image-link" href="${escapeHTML(withPagePrefix(mainImage.asset_path))}" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHTML(withPagePrefix(mainImage.asset_path))}" alt="${escapeHTML(mainAlt)}" loading="lazy" decoding="async">
        </a>
        ${thumbs.length ? `
          <div class="research-sample-thumbs" aria-label="${escapeHTML(item.jp_label)}の追加サンプル">
            ${thumbs.map((sample) => `
              <a class="research-sample-thumb" href="${escapeHTML(withPagePrefix(sample.asset_path))}" target="_blank" rel="noopener noreferrer">
                <img src="${escapeHTML(withPagePrefix(sample.asset_path))}" alt="${escapeHTML(`${item.jp_label} ${sample.label || sample.angle || ""}`)}" loading="lazy" decoding="async">
                <span>${escapeHTML(sample.label || sample.angle || "sample")}</span>
              </a>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderCandidateCard(item) {
    const tag = importantTagFor(item);
    const candidateId = slugFor(item.theme_name || item.theme || item.important_tags || item.jp_label);
    return `
      <article class="research-candidate-card" id="${escapeHTML(candidateId)}">
        ${renderCandidateMedia(item)}
        <div class="research-candidate-copy">
          <h3>${escapeHTML(item.jp_label)}</h3>
          <dl class="research-meta-list">
            <div><dt>${escapeHTML(localizedText(uiText.importantTags))}</dt><dd>${escapeHTML(tag)}</dd></div>
            <div><dt>${escapeHTML(localizedText(uiText.verificationResult))}</dt><dd>${escapeHTML(localizedVerificationNote(item))}</dd></div>
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
    const copy = localizedSectionCopy(sectionId);
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
      const copy = localizedSectionCopy(sectionId);
      const seenTags = new Set();
      const items = sectionIds.flatMap(itemsFor).filter((item) => {
        const identity = item.theme_name || item.theme || importantTagFor(item);
        const key = `${item.section.startsWith("hairstyle") ? "hairstyle" : item.section.startsWith("bangs") ? "bangs" : item.section.startsWith("hair_color") ? "hair_color" : item.section}:${identity}`;
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
    currentLanguage = language;
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("archiveLang", language);
    } catch (error) {
      // The visible page still updates when localStorage is unavailable.
    }
    translatableNodes.forEach((node) => {
      const value = node.dataset[language] || node.dataset.ja;
      if (node.classList.contains("share-x-button")) {
        const label = node.querySelector("span:last-child");
        if (label) label.textContent = value;
        return;
      }
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
    updateShareLinks();
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

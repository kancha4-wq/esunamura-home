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

  const displayTranslations = {
    "リネンシャツ": { en: "Linen Shirt", zh: "亚麻衬衫", ko: "리넨 셔츠" },
    "半袖リネンシャツ": { en: "Short-Sleeve Linen Shirt", zh: "短袖亚麻衬衫", ko: "반소매 리넨 셔츠" },
    "シアーシャツ羽織り": { en: "Sheer Shirt Layer", zh: "透纱衬衫外搭", ko: "시어 셔츠 아우터" },
    "UVカットカーディガン": { en: "UV-Cut Cardigan", zh: "防晒开衫", ko: "UV 차단 카디건" },
    "サマーニット": { en: "Summer Knit Top", zh: "夏季针织上衣", ko: "서머 니트" },
    "ノースリーブブラウス": { en: "Sleeveless Blouse", zh: "无袖罩衫", ko: "민소매 블라우스" },
    "フレンチスリーブトップス": { en: "French-Sleeve Top", zh: "法式袖上衣", ko: "프렌치 슬리브 톱" },
    "ボートネックカットソー": { en: "Boat-Neck Cut-and-Sew Top", zh: "船领针织上衣", ko: "보트넥 컷소" },
    "五分袖カットソー": { en: "Elbow-Sleeve Cut-and-Sew Top", zh: "五分袖针织上衣", ko: "5부 소매 컷소" },
    "七分袖ブラウス": { en: "Three-Quarter Sleeve Blouse", zh: "七分袖罩衫", ko: "7부 소매 블라우스" },
    "薄手ロングシャツ": { en: "Light Long Shirt", zh: "薄款长衬衫", ko: "얇은 롱 셔츠" },
    "ワイドパンツ": { en: "Wide-Leg Pants", zh: "阔腿裤", ko: "와이드 팬츠" },
    "リネンワイドパンツ": { en: "Linen Wide-Leg Pants", zh: "亚麻阔腿裤", ko: "리넨 와이드 팬츠" },
    "クロップドパンツ": { en: "Cropped Pants", zh: "九分裤", ko: "크롭트 팬츠" },
    "テーパードパンツ": { en: "Tapered Pants", zh: "锥形裤", ko: "테이퍼드 팬츠" },
    "チノパン": { en: "Chino Pants", zh: "卡其休闲裤", ko: "치노 팬츠" },
    "デニムスカート": { en: "Denim Skirt", zh: "牛仔裙", ko: "데님 스커트" },
    "マーメイドスカート": { en: "Mermaid Skirt", zh: "鱼尾裙", ko: "머메이드 스커트" },
    "プリーツスカート": { en: "Pleated Skirt", zh: "百褶裙", ko: "플리츠 스커트" },
    "ティアードスカート": { en: "Tiered Skirt", zh: "蛋糕裙", ko: "티어드 스커트" },
    "シャツ＋ワイドパンツ": { en: "Shirt + Wide-Leg Pants", zh: "衬衫＋阔腿裤", ko: "셔츠＋와이드 팬츠" },
    "ブラウス＋テーパードパンツ": { en: "Blouse + Tapered Pants", zh: "罩衫＋锥形裤", ko: "블라우스＋테이퍼드 팬츠" },
    "サマーニット＋ロングスカート": { en: "Summer Knit + Long Skirt", zh: "夏季针织＋长裙", ko: "서머 니트＋롱스커트" },
    "Tシャツ＋プリーツスカート": { en: "T-Shirt + Pleated Skirt", zh: "T恤＋百褶裙", ko: "티셔츠＋플리츠 스커트" },
    "ノースリーブ＋カーディガン肩掛け": { en: "Sleeveless Top + Draped Cardigan", zh: "无袖上衣＋披肩开衫", ko: "민소매＋어깨에 건친 카디건" },
    "薄手ジャケット私服": { en: "Light Casual Jacket", zh: "薄款休闲夹克", ko: "얇은 캐주얼 재킷" },
    "デニムジャケット": { en: "Denim Jacket", zh: "牛仔夹克", ko: "데님 재킷" },
    "シャツジャケット": { en: "Shirt Jacket", zh: "衬衫夹克", ko: "셔츠 재킷" },
    "薄手パーカー": { en: "Light Hoodie", zh: "薄款连帽衫", ko: "얇은 후디" },
    "レインジャケット": { en: "Rain Jacket", zh: "雨衣夹克", ko: "레인 재킷" },
    "秋色カーディガン": { en: "Autumn-Color Cardigan", zh: "秋色开衫", ko: "가을색 카디건" },
    "薄手ニットベスト": { en: "Light Knit Vest", zh: "薄款针织背心", ko: "얇은 니트 베스트" },
    "チェックシャツ羽織り": { en: "Plaid Shirt Layer", zh: "格纹衬衫外搭", ko: "체크 셔츠 아우터" },
    "ロゴなしスウェット": { en: "Plain Sweatshirt", zh: "无标志卫衣", ko: "로고 없는 스웨트셔츠" },
    "薄手タートルネック": { en: "Light Turtleneck", zh: "薄款高领上衣", ko: "얇은 터틀넥" },
    "ジャンパースカート風私服": { en: "Jumper-Skirt Style Casual Outfit", zh: "背带裙风私服", ko: "점퍼스커트풍 캐주얼" },
    "リネンワンピース": { en: "Linen Dress", zh: "亚麻连衣裙", ko: "리넨 원피스" },
    "コットンワンピース": { en: "Cotton Dress", zh: "棉质连衣裙", ko: "코튼 원피스" },
    "シアーワンピース": { en: "Sheer Dress", zh: "透纱连衣裙", ko: "시어 원피스" },
    "半袖シャツワンピース": { en: "Short-Sleeve Shirt Dress", zh: "短袖衬衫连衣裙", ko: "반소매 셔츠 원피스" },
    "七分袖シャツワンピース": { en: "Three-Quarter Sleeve Shirt Dress", zh: "七分袖衬衫连衣裙", ko: "7부 소매 셔츠 원피스" },
    "フレンチスリーブワンピース": { en: "French-Sleeve Dress", zh: "法式袖连衣裙", ko: "프렌치 슬리브 원피스" },
    "カットソーワンピース": { en: "Cut-and-Sew Dress", zh: "针织连衣裙", ko: "컷소 원피스" },
    "Tシャツワンピース": { en: "T-Shirt Dress", zh: "T恤连衣裙", ko: "티셔츠 원피스" },
    "リゾート風ワンピース": { en: "Resort-Style Dress", zh: "度假风连衣裙", ko: "리조트풍 원피스" },
    "小花柄ワンピース": { en: "Small Floral Dress", zh: "小碎花连衣裙", ko: "잔꽃무늬 원피스" },
    "ボタニカル柄ワンピース": { en: "Botanical Print Dress", zh: "植物图案连衣裙", ko: "보태니컬 무늬 원피스" },
    "ストライプワンピース": { en: "Striped Dress", zh: "条纹连衣裙", ko: "스트라이프 원피스" },
    "ドットワンピース": { en: "Polka-Dot Dress", zh: "波点连衣裙", ko: "도트 원피스" },
    "ギンガムチェックワンピース": { en: "Gingham Check Dress", zh: "格子连衣裙", ko: "깅엄 체크 원피스" },
    "ティアードワンピース": { en: "Tiered Dress", zh: "蛋糕连衣裙", ko: "티어드 원피스" },
    "プリーツワンピース": { en: "Pleated Dress", zh: "百褶连衣裙", ko: "플리츠 원피스" },
    "ラップワンピース": { en: "Wrap Dress", zh: "裹身连衣裙", ko: "랩 원피스" },
    "ウエストリボンワンピース": { en: "Waist-Ribbon Dress", zh: "腰带蝴蝶结连衣裙", ko: "웨이스트 리본 원피스" },
    "キャミワンピ＋Tシャツ": { en: "Camisole Dress + T-Shirt", zh: "吊带连衣裙＋T恤", ko: "캐미 원피스＋티셔츠" },
    "キャミワンピ＋ブラウス": { en: "Camisole Dress + Blouse", zh: "吊带连衣裙＋罩衫", ko: "캐미 원피스＋블라우스" },
    "ジャンパースカート": { en: "Jumper Dress", zh: "背带连衣裙", ko: "점퍼스커트" },
    "デニムワンピース": { en: "Denim Dress", zh: "牛仔连衣裙", ko: "데님 원피스" },
    "ライトデニムワンピース": { en: "Light Denim Dress", zh: "浅色牛仔连衣裙", ko: "라이트 데님 원피스" },
    "カーキワンピース": { en: "Khaki Dress", zh: "卡其色连衣裙", ko: "카키 원피스" },
    "ベージュワンピース": { en: "Beige Dress", zh: "米色连衣裙", ko: "베이지 원피스" },
    "秋色ワンピース": { en: "Autumn-Color Dress", zh: "秋色连衣裙", ko: "가을색 원피스" },
    "薄手ニットワンピース": { en: "Light Knit Dress", zh: "薄款针织连衣裙", ko: "얇은 니트 원피스" },
    "七分袖ワンピース": { en: "Three-Quarter Sleeve Dress", zh: "七分袖连衣裙", ko: "7부 소매 원피스" },
    "長袖薄手ワンピース": { en: "Light Long-Sleeve Dress", zh: "薄款长袖连衣裙", ko: "얇은 긴소매 원피스" },
    "カーディガン合わせワンピース": { en: "Dress with Cardigan", zh: "开衫搭配连衣裙", ko: "카디건 매치 원피스" },
    "シャツ羽織りワンピース": { en: "Dress with Shirt Layer", zh: "衬衫外搭连衣裙", ko: "셔츠 아우터 원피스" },
    "レインデイワンピース": { en: "Rainy-Day Dress", zh: "雨天连衣裙", ko: "레인 데이 원피스" },
    "晩夏ワンピース": { en: "Late-Summer Dress", zh: "晚夏连衣裙", ko: "늦여름 원피스" },
    "初秋ワンピース": { en: "Early-Autumn Dress", zh: "初秋连衣裙", ko: "초가을 원피스" }
  };

  function translatedDisplay(item, language) {
    const key = item.display || "";
    return displayTranslations[key]?.[language] || "";
  }

  function promptLabel(item) {
    const prompt = clothingPromptText(item.prompt)
      .replace(/,\s*all-ages outfit reference.*$/i, "")
      .replace(/,\s*clean anime illustration.*$/i, "");
    const first = prompt.split(",").slice(0, 2).join(",").trim();
    return titleCase(first || item.code);
  }

  function itemLabel(item, language = currentLanguage()) {
    if (language === "ja") {
      if (item.display) return item.display;
      return item.label || item.code;
    }
    const translated = translatedDisplay(item, language);
    if (translated) return translated;
    return item[`label_${language}`] || promptLabel(item);
  }

  function hasAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  function japaneseVerificationNote(item, category) {
    const prompt = clothingPromptText(item.prompt).toLowerCase();
    const label = item.label || item.code;
    const observations = [];

    if (category?.id === "casual") {
      observations.push("日常服としての自然さと、季節ごとの軽さ・重ね着感が出るかを確認しています。");
    } else if (category?.id === "onepiece") {
      observations.push("一枚服としての丈・ウエスト位置・裾の流れが安定して出るかを確認しています。");
    }

    if (hasAny(prompt, ["button", "collar", "piping", "zip", "drawstring", "strap", "neckline", "obi", "sash", "panel line"])) {
      if (category?.id === "wasou") {
        observations.push("衿合わせや帯まわりの情報が、和装らしい構造として残るかを確認。");
      } else if (category?.id === "swimwear") {
        observations.push("ストラップやネックラインの違いが、シルエット差として読めるかを確認。");
      } else if (category?.id === "casual") {
        observations.push("襟・前開き・重ね着など、日常服のディテールがどこまで読み取れるかを確認。");
      } else if (category?.id === "onepiece") {
        observations.push("ネックラインや前合わせ、ウエスト位置が一枚服の構造として残るかを確認。");
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

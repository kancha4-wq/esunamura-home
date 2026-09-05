(function () {
  "use strict";

  const manifestUrl = "../data/research-r-posts.json";
  const platformNames = {
    x: "X",
    patreon: "Patreon",
    chichipui: "chichi-pui",
    promptcom: "PromptCom",
    pixiv: "pixiv",
    painter: "pAInter",
  };
  const supportedPlatforms = Object.keys(platformNames);
  const languageButtons = document.querySelectorAll(".lang-button");
  const translatableNodes = document.querySelectorAll("[data-ja]");
  const list = document.querySelector("#research-r-list");
  const status = document.querySelector("#research-r-status");
  let currentLanguage = "ja";
  let currentItems = [];

  const copy = {
    ja: { loading: "生成情報を読み込んでいます。", error: "生成情報を読み込めませんでした。時間をおいて再度お試しください。", private: "非公開", copy: "コピー", copied: "コピーしました", prompt: "プロンプト情報", open: "投稿先を開く" },
    en: { loading: "Loading generation information.", error: "Generation information could not be loaded. Please try again later.", private: "Private", copy: "Copy", copied: "Copied", prompt: "Prompt information", open: "Open post" },
    zh: { loading: "正在加载生成信息。", error: "无法加载生成信息，请稍后重试。", private: "非公开", copy: "复制", copied: "已复制", prompt: "Prompt 信息", open: "打开发布页" },
    ko: { loading: "생성 정보를 불러오는 중입니다.", error: "생성 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.", private: "비공개", copy: "복사", copied: "복사했습니다", prompt: "프롬프트 정보", open: "게시물 열기" },
  };

  function lang() {
    return copy[currentLanguage] ? currentLanguage : "ja";
  }

  function safeItem(value) {
    if (!value || typeof value !== "object") return null;
    if (!supportedPlatforms.includes(value.platform)) return null;
    if (typeof value.id !== "string" || !new RegExp(`^${value.platform}-[a-f0-9]{20}$`).test(value.id)) return null;
    if (typeof value.published_at !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/.test(value.published_at)) return null;
    if (!["全年齢", "R15", "R18"].includes(value.age_rating)) return null;
    if (typeof value.membership_only !== "boolean") return null;
    if (typeof value.destination_url !== "string" || !value.destination_url.startsWith("https://")) return null;
    if (typeof value.web_image_relative_path !== "string" || !/^images\/homepage-feed-[a-z0-9-]+\.webp$/.test(value.web_image_relative_path)) return null;
    if (typeof value.prompt_info !== "string" || value.prompt_info.length > 50000) return null;

    const publishedTime = Date.parse(value.published_at);
    if (!Number.isFinite(publishedTime)) return null;
    return {
      id: value.id,
      platform: value.platform,
      publishedAt: value.published_at,
      publishedTime,
      ageRating: value.age_rating,
      membershipOnly: value.membership_only,
      destinationUrl: value.destination_url,
      image: `../${value.web_image_relative_path}`,
      promptInfo: value.prompt_info,
    };
  }

  function formatTime(value) {
    return new Intl.DateTimeFormat(lang() === "ja" ? "ja-JP" : lang() === "zh" ? "zh-CN" : lang() === "ko" ? "ko-KR" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo",
    }).format(new Date(value));
  }

  function makeBadge(text, className) {
    const badge = document.createElement("span");
    badge.className = `research-r-badge ${className}`;
    badge.textContent = text;
    return badge;
  }

  function render() {
    const labels = copy[lang()];
    if (!currentItems.length) return;
    const fragment = document.createDocumentFragment();

    currentItems.forEach((item) => {
      const article = document.createElement("article");
      article.className = `research-r-card platform-${item.platform}`;

      const header = document.createElement("header");
      header.className = "research-r-card-header";
      const source = document.createElement("a");
      source.className = "research-r-source";
      source.href = item.destinationUrl;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      source.textContent = platformNames[item.platform];
      source.setAttribute("aria-label", `${platformNames[item.platform]}: ${labels.open}`);
      source.dataset.analyticsEvent = "research_r_post_click";
      source.dataset.analyticsLink = `research-r-${item.platform}`;
      source.dataset.analyticsArea = "research-r-feed";
      header.append(source);

      const meta = document.createElement("div");
      meta.className = "research-r-card-meta";
      const time = document.createElement("time");
      time.dateTime = item.publishedAt;
      time.textContent = formatTime(item.publishedAt);
      meta.append(time);
      if (item.platform !== "x") meta.append(makeBadge(item.ageRating, item.ageRating === "R18" ? "age-r18" : item.ageRating === "R15" ? "age-r15" : "age-all"));
      if (item.membershipOnly) meta.append(makeBadge(lang() === "ja" ? "メンバー限定" : lang() === "zh" ? "会员限定" : lang() === "ko" ? "멤버 한정" : "Members", "members-only"));
      header.append(meta);
      article.append(header);

      const content = document.createElement("div");
      content.className = "research-r-card-content";
      const imageLink = document.createElement("a");
      imageLink.className = "research-r-image-link";
      imageLink.href = item.destinationUrl;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.dataset.analyticsEvent = "research_r_post_click";
      imageLink.dataset.analyticsLink = `research-r-${item.platform}-image`;
      imageLink.dataset.analyticsArea = "research-r-feed";
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = `${platformNames[item.platform]} ${labels.prompt}`;
      image.width = 996;
      image.height = 1280;
      image.loading = "lazy";
      image.decoding = "async";
      imageLink.append(image);
      content.append(imageLink);

      const promptPanel = document.createElement("div");
      promptPanel.className = "research-r-prompt-panel";
      const promptHeader = document.createElement("div");
      promptHeader.className = "research-r-prompt-header";
      const promptTitle = document.createElement("h3");
      promptTitle.textContent = labels.prompt;
      promptHeader.append(promptTitle);
      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "research-r-copy";
      copyButton.textContent = labels.copy;
      copyButton.disabled = item.promptInfo === "非公開";
      copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(item.promptInfo);
        copyButton.textContent = labels.copied;
        window.setTimeout(() => { copyButton.textContent = copy[lang()].copy; }, 1600);
      });
      promptHeader.append(copyButton);
      promptPanel.append(promptHeader);
      const pre = document.createElement("pre");
      pre.className = item.promptInfo === "非公開" ? "is-private" : "";
      pre.textContent = item.promptInfo === "非公開" ? labels.private : item.promptInfo;
      promptPanel.append(pre);
      content.append(promptPanel);
      article.append(content);
      fragment.append(article);
    });

    list.replaceChildren(fragment);
    list.hidden = false;
    status.hidden = true;
  }

  function setLanguage(nextLanguage) {
    currentLanguage = copy[nextLanguage] ? nextLanguage : "ja";
    document.documentElement.lang = currentLanguage;
    try { window.localStorage.setItem("archiveLang", currentLanguage); } catch (error) { /* current page still switches */ }
    translatableNodes.forEach((node) => { node.textContent = node.dataset[currentLanguage] || node.dataset.ja; });
    languageButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.lang === currentLanguage));
    status.textContent = copy[lang()].loading;
    render();
  }

  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  try { setLanguage(window.localStorage.getItem("archiveLang") || "ja"); } catch (error) { setLanguage("ja"); }

  fetch(manifestUrl, { cache: "no-cache", credentials: "same-origin", headers: { Accept: "application/json" } })
    .then((response) => { if (!response.ok) throw new Error(`Feed request failed: ${response.status}`); return response.json(); })
    .then((data) => {
      if (data?.schema_version !== 1 || data?.timezone !== "Asia/Tokyo" || !Array.isArray(data.items)) throw new Error("Unsupported feed schema");
      const seen = new Set();
      currentItems = data.items.map(safeItem).filter((item) => {
        if (!item || seen.has(item.platform)) return false;
        seen.add(item.platform);
        return true;
      }).sort((left, right) => right.publishedTime - left.publishedTime);
      if (currentItems.length !== supportedPlatforms.length || !supportedPlatforms.every((platform) => seen.has(platform))) throw new Error("Research R feed is incomplete");
      render();
    })
    .catch(() => {
      currentItems = [];
      list.hidden = true;
      status.hidden = false;
      status.textContent = copy[lang()].error;
    });
})();

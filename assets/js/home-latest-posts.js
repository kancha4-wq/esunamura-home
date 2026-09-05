(() => {
  const list = document.getElementById("home-latest-list");
  const status = document.getElementById("home-latest-status");
  const script = document.currentScript;
  if (!list || !status || !script?.src) return;

  const PLATFORM_CONFIG = Object.freeze({
    x: {
      name: "X",
      hosts: new Set(["x.com", "www.x.com"]),
      logo: "../brands/x-logo-black.png",
    },
    patreon: {
      name: "Patreon",
      hosts: new Set(["patreon.com", "www.patreon.com"]),
      logo: "../brands/patreon-wordmark.svg",
    },
    chichipui: {
      name: "chichi-pui",
      hosts: new Set(["chichi-pui.com", "www.chichi-pui.com", "membership.chichi-pui.com"]),
    },
    promptcom: {
      name: "PromptCom",
      hosts: new Set(["prompt-com.com", "www.prompt-com.com"]),
    },
    pixiv: {
      name: "pixiv",
      hosts: new Set(["pixiv.net", "www.pixiv.net"]),
      logo: "../brands/pixiv-wordmark.png",
    },
    painter: {
      name: "pAInter",
      hosts: new Set(["painter-ai.ai", "www.painter-ai.ai"]),
    },
  });

  const COPY = Object.freeze({
    ja: {
      loading: "最新投稿を読み込んでいます。",
      error: "最新投稿を読み込めませんでした。時間をおいて再度お試しください。",
      empty: "現在表示できる最新投稿はありません。",
      members: "メンバー限定",
      allAges: "全年齢",
      image: (name) => `${name}の最新投稿画像`,
      open: (name) => `${name}の最新投稿を新しいタブで開く`,
      prompt: "プロンプトを見る",
      promptLabel: (name) => `${name}の最新画像の生成情報を見る`,
      published: (date) => `公開日時：${date}`,
    },
    en: {
      loading: "Loading the latest posts.",
      error: "The latest posts could not be loaded. Please try again later.",
      empty: "There are no current posts to display.",
      members: "Members only",
      allAges: "All ages",
      image: (name) => `Latest post image from ${name}`,
      open: (name) => `Open the latest ${name} post in a new tab`,
      prompt: "View prompt",
      promptLabel: (name) => `View generation information for the latest ${name} image`,
      published: (date) => `Published: ${date}`,
    },
    zh: {
      loading: "正在加载最新内容。",
      error: "无法加载最新内容，请稍后重试。",
      empty: "目前没有可显示的最新内容。",
      members: "会员限定",
      allAges: "全年龄",
      image: (name) => `${name} 的最新发布图片`,
      open: (name) => `在新标签页打开 ${name} 的最新内容`,
      prompt: "查看 Prompt",
      promptLabel: (name) => `查看 ${name} 最新图片的生成信息`,
      published: (date) => `发布时间：${date}`,
    },
    ko: {
      loading: "최신 게시물을 불러오는 중입니다.",
      error: "최신 게시물을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
      empty: "현재 표시할 최신 게시물이 없습니다.",
      members: "멤버 전용",
      allAges: "전연령",
      image: (name) => `${name} 최신 게시물 이미지`,
      open: (name) => `${name} 최신 게시물을 새 탭에서 열기`,
      prompt: "프롬프트 보기",
      promptLabel: (name) => `${name} 최신 이미지의 생성 정보 보기`,
      published: (date) => `게시 시각: ${date}`,
    },
  });

  const DATE_LOCALES = Object.freeze({ ja: "ja-JP", en: "en-US", zh: "zh-CN", ko: "ko-KR" });
  const scriptUrl = new URL(script.src, window.location.href);
  const manifestUrl = new URL("../../data/homepage-posts.json", scriptUrl);
  manifestUrl.searchParams.set("v", String(Math.floor(Date.now() / 3600000)));
  let currentItems = [];

  function language() {
    const value = (document.documentElement.lang || "ja").toLowerCase();
    if (value.startsWith("en")) return "en";
    if (value.startsWith("zh")) return "zh";
    if (value.startsWith("ko")) return "ko";
    return "ja";
  }

  function formatDate(value, lang) {
    return new Intl.DateTimeFormat(DATE_LOCALES[lang], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo",
    }).format(new Date(value));
  }

  function belongsToConfiguredAccount(platform, destination) {
    const path = destination.pathname;
    switch (platform) {
      case "x":
        return /^\/esuna_4649(?:\/status\/\d+)?\/?$/.test(path);
      case "patreon":
        return /^\/(?:c\/)?esunamura(?:\/posts\/(?:[a-z0-9-]+-)?\d+)?\/?$/.test(path);
      case "chichipui":
        return destination.hostname === "membership.chichi-pui.com"
          ? /^\/users\/esuna\/membership\/?$/.test(path)
          : /^\/users\/esuna\/?$/.test(path);
      case "promptcom":
        return /^\/ja\/6954d7c84740e(?:\/series)?\/?$/.test(path);
      case "pixiv":
        return /^\/users\/21257126\/?$/.test(path);
      case "painter":
        return /^\/ja\/(?:users\/c156de76bd|membership_rooms\/a9a7be76-6c2b-4c23-a192-c309b1122209)\/?$/.test(path);
      default:
        return false;
    }
  }

  function safeItem(raw) {
    if (!raw || typeof raw !== "object") return null;
    const platform = typeof raw.platform === "string" ? raw.platform.toLowerCase() : "";
    const config = PLATFORM_CONFIG[platform];
    if (!config) return null;

    const publishedAt = typeof raw.published_at === "string" ? raw.published_at : "";
    const publishedTime = Date.parse(publishedAt);
    if (!Number.isFinite(publishedTime) || publishedTime > Date.now() + 5 * 60 * 1000) return null;

    let destination;
    try {
      destination = new URL(raw.destination_url);
    } catch (error) {
      return null;
    }
    if (
      destination.protocol !== "https:" ||
      !config.hosts.has(destination.hostname.toLowerCase()) ||
      !belongsToConfiguredAccount(platform, destination)
    ) return null;

    const imagePath = typeof raw.web_image_relative_path === "string" ? raw.web_image_relative_path : "";
    const imageMatch = imagePath.match(/^images\/homepage-feed-(x|patreon|chichipui|promptcom|pixiv|painter)-([a-f0-9]{12,64})\.webp$/);
    if (!imageMatch || imageMatch[1] !== platform) {
      return null;
    }
    const imageUrl = new URL(`../../${imagePath}`, scriptUrl);
    if (imageUrl.origin !== window.location.origin || !imageUrl.pathname.startsWith("/images/homepage-feed-")) {
      return null;
    }

    return Object.freeze({
      platform,
      publishedAt,
      publishedTime,
      destination: destination.href,
      image: imageUrl.href,
      ageRating: ["全年齢", "R15", "R18"].includes(raw.age_rating) ? raw.age_rating : "",
      membershipOnly: raw.membership_only === true,
      researchId: `${platform}-${imageMatch[2]}`,
    });
  }

  function analytics(link, item) {
    link.dataset.analyticsEvent = "latest_post_click";
    link.dataset.analyticsLink = `latest-post-${item.platform}`;
    link.dataset.analyticsArea = "home-latest-feed";
    link.dataset.analyticsPlatform = item.platform;
    link.dataset.analyticsLabel = `${PLATFORM_CONFIG[item.platform].name} latest post`;
    link.dataset.analyticsAccess = item.membershipOnly ? "membership" : "external_page";
  }

  function destinationLink(item, className, label) {
    const link = document.createElement("a");
    link.className = className;
    link.href = item.destination;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", label);
    analytics(link, item);
    return link;
  }

  function badge(text, className) {
    const node = document.createElement("span");
    node.className = `home-latest-badge ${className}`;
    node.textContent = text;
    return node;
  }

  function render() {
    const lang = language();
    const copy = COPY[lang];
    if (!currentItems.length) {
      status.hidden = false;
      status.textContent = copy.empty;
      list.hidden = true;
      list.replaceChildren();
      return;
    }

    const fragment = document.createDocumentFragment();
    currentItems.forEach((item) => {
      const config = PLATFORM_CONFIG[item.platform];
      const formattedDate = formatDate(item.publishedAt, lang);
      const article = document.createElement("article");
      article.className = `home-latest-card platform-${item.platform}`;
      article.dataset.platform = item.platform;

      const header = document.createElement("div");
      header.className = "home-latest-card-header";

      const source = destinationLink(item, "home-latest-source", copy.open(config.name));
      if (config.logo) {
        const logo = document.createElement("img");
        logo.className = `home-latest-logo platform-${item.platform}`;
        logo.src = new URL(config.logo, scriptUrl).href;
        logo.alt = config.name;
        logo.decoding = "async";
        source.append(logo);
      } else {
        const name = document.createElement("span");
        name.className = "home-latest-source-name";
        name.textContent = config.name;
        source.append(name);
      }
      header.append(source);

      const meta = document.createElement("div");
      meta.className = "home-latest-card-meta";
      const time = document.createElement("time");
      time.className = "home-latest-time";
      time.dateTime = item.publishedAt;
      time.textContent = formattedDate;
      time.title = copy.published(formattedDate);
      meta.append(time);

      if (item.platform !== "x" && item.ageRating) {
        const ageText = item.ageRating === "全年齢" ? copy.allAges : item.ageRating;
        const ageClass = item.ageRating === "R18" ? "age-r18" : item.ageRating === "R15" ? "age-r15" : "age-all";
        meta.append(badge(ageText, ageClass));
      }
      if (item.membershipOnly) meta.append(badge(copy.members, "members-only"));
      const promptLink = document.createElement("a");
      promptLink.className = "home-latest-prompt-link";
      promptLink.href = `research-r/#${item.researchId}`;
      promptLink.textContent = copy.prompt;
      promptLink.setAttribute("aria-label", copy.promptLabel(config.name));
      promptLink.dataset.analyticsEvent = "research_r_link_click";
      promptLink.dataset.analyticsLink = `research-r-${item.platform}`;
      promptLink.dataset.analyticsArea = "home-latest-feed";
      meta.append(promptLink);
      header.append(meta);
      article.append(header);

      const imageLink = destinationLink(item, "home-latest-image-link", copy.open(config.name));
      const image = document.createElement("img");
      image.className = "home-latest-image";
      image.src = item.image;
      image.alt = copy.image(config.name);
      image.width = 996;
      image.height = 1280;
      image.loading = "lazy";
      image.decoding = "async";
      imageLink.append(image);
      article.append(imageLink);
      fragment.append(article);
    });

    list.replaceChildren(fragment);
    list.hidden = false;
    status.hidden = true;
  }

  async function load() {
    status.textContent = COPY[language()].loading;
    try {
      const response = await fetch(manifestUrl, {
        cache: "no-cache",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);
      const data = await response.json();
      if (data?.schema_version !== 1 || !Array.isArray(data.items)) throw new Error("Unsupported feed schema");

      const seen = new Set();
      const nextItems = data.items
        .map(safeItem)
        .filter((item) => {
          if (!item || seen.has(item.platform)) return false;
          seen.add(item.platform);
          return true;
        })
        .sort((left, right) => right.publishedTime - left.publishedTime)
        .slice(0, Object.keys(PLATFORM_CONFIG).length);
      const requiredPlatforms = Object.keys(PLATFORM_CONFIG);
      if (
        nextItems.length !== requiredPlatforms.length ||
        !requiredPlatforms.every((platform) => nextItems.some((item) => item.platform === platform))
      ) throw new Error("Homepage feed is incomplete");
      currentItems = nextItems;
      render();
    } catch (error) {
      currentItems = [];
      list.hidden = true;
      status.hidden = false;
      status.textContent = COPY[language()].error;
    }
  }

  new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === "lang")) render();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  load();
})();

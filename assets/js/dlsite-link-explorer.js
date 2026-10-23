(() => {
  "use strict";

  const mount = document.getElementById("dlsiteLinkExplorer");
  if (!mount) return;

  const words = {
    root: { ja: "AI生成作品", en: "AI-generated works", zh: "AI生成作品", ko: "AI 생성 작품" },
    ranking: { ja: "総合ランキング", en: "Overall rankings", zh: "综合排行榜", ko: "종합 랭킹" },
    game: { ja: "ゲーム", en: "Games", zh: "游戏", ko: "게임" },
    movie: { ja: "動画", en: "Videos", zh: "视频", ko: "동영상" },
    comic: { ja: "マンガ", en: "Comics", zh: "漫画", ko: "만화" },
    cg: { ja: "CG・イラスト", en: "CG & Illustrations", zh: "CG・插画", ko: "CG・일러스트" },
    release_d: { ja: "発売日が新しい順", en: "Newest releases", zh: "按最新发布", ko: "최신 발매순" },
    dl_d: { ja: "販売数が多い順", en: "Best selling", zh: "按销量", ko: "판매량순" },
    review_d: { ja: "レビューが多い順", en: "Most reviewed", zh: "按评论数", ko: "리뷰 많은 순" },
    all: { ja: "全作品", en: "All works", zh: "全部作品", ko: "전체 작품" },
    campaign: { ja: "割引中作品", en: "On sale", zh: "折扣作品", ko: "할인 중" },
    c8: { ja: "割引30%OFF以上作品", en: "30% off or more", zh: "优惠30%以上", ko: "30% 이상 할인" },
    c9: { ja: "割引50%OFF以上作品", en: "50% off or more", zh: "优惠50%以上", ko: "50% 이상 할인" },
    c10: { ja: "割引80%OFF以上作品", en: "80% off or more", zh: "优惠80%以上", ko: "80% 이상 할인" },
    standard: { ja: "通常", en: "Open", zh: "通常", ko: "일반" },
    soon: { ja: "24h", en: "24h", zh: "24h", ko: "24h" },
    soon_full: { ja: "24時間以内に割引終了", en: "Sale ends within 24 hours", zh: "24小时内结束优惠", ko: "24시간 내 할인 종료" },
    legend_title: { ja: "リンクの見方", en: "Link guide", zh: "链接说明", ko: "링크 안내" },
    legend_standard: { ja: "条件に合う作品一覧", en: "All matching works", zh: "符合条件的作品", ko: "조건에 맞는 작품" },
    legend_soon: { ja: "24時間以内に割引終了", en: "Discount ends within 24 hours", zh: "优惠将在24小时内结束", ko: "24시간 내 할인 종료" }
  };

  const rankings = [
    ["24時間", "24 hours", "24小时", "24시간", "https://www.dlsite.com/aix/ranking/day?aid=esunamura"],
    ["7日間", "7 days", "7天", "7일", "https://www.dlsite.com/aix/ranking/week?aid=esunamura"],
    ["30日間", "30 days", "30天", "30일", "https://www.dlsite.com/aix/ranking/month?aid=esunamura"],
    ["2026年", "2026", "2026年", "2026년", "https://www.dlsite.com/aix/ranking/year?year=2026&aid=esunamura"],
    ["2025年", "2025", "2025年", "2025년", "https://www.dlsite.com/aix/ranking/year?year=2025&aid=esunamura"],
    ["累計", "All time", "累计", "누계", "https://www.dlsite.com/aix/ranking/total?aid=esunamura"]
  ];
  const categories = ["cg", "movie", "comic", "game"];
  const sorts = ["release_d", "dl_d", "review_d"];
  const filters = [
    ["all", ""],
    ["campaign", "/campaign/campaign"],
    ["c8", "/discount_rates[0]/c8"],
    ["c9", "/discount_rates[0]/c9"],
    ["c10", "/discount_rates[0]/c10"]
  ];

  const label = (key, lang) => (words[key] && (words[key][lang] || words[key].ja)) || key;
  const dlsiteLocales = { en: "en_US", zh: "zh_CN", ko: "ko_KR" };
  const currentLanguage = () => {
    const lang = document.documentElement.lang.split("-")[0];
    return ["ja", "en", "zh", "ko"].includes(lang) ? lang : "ja";
  };
  const localizedAffiliateUrl = (href, lang = currentLanguage()) => {
    const url = new URL(href);
    url.searchParams.delete("locale");
    if (dlsiteLocales[lang]) url.searchParams.set("locale", dlsiteLocales[lang]);
    return url.toString();
  };
  const affiliateUrl = (category, sort, suffix, soon) => {
    let base = "https://www.dlsite.com/aix/fsr/=/aid/esunamura/work_category";
    if (category === "game") {
      base += `[0]/ai/order/${sort}/work_type_category[0]/game/options[0]/JPN/options[1]/NM`;
    } else if (category === "movie" && sort === "release_d" && !suffix) {
      base += "/ai/work_type_category/movie";
    } else {
      base += `/ai/order/${sort}/work_type_category/${category}`;
    }
    return base + suffix + (soon ? "/soon/1" : "");
  };
  const makeLabel = (tag, key, className = "") => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.dataset.labelKey = key;
    node.textContent = label(key, currentLanguage());
    return node;
  };
  const makeLink = (textByLanguage, href, analytics, ariaByLanguage = null) => {
    const link = document.createElement("a");
    link.href = localizedAffiliateUrl(href);
    link.target = "_blank";
    link.rel = "noopener noreferrer sponsored";
    link.dataset.affiliateHref = href;
    link.dataset.labels = JSON.stringify(textByLanguage);
    link.dataset.analyticsLink = analytics;
    link.dataset.analyticsArea = "dlsite-link-explorer";
    link.textContent = textByLanguage[currentLanguage()] || textByLanguage.ja;
    if (ariaByLanguage) {
      link.dataset.ariaLabels = JSON.stringify(ariaByLanguage);
      link.setAttribute("aria-label", ariaByLanguage[currentLanguage()] || ariaByLanguage.ja);
    }
    return link;
  };

  const contextualLabels = (category, sort, filter, linkType) => {
    const result = {};
    ["ja", "en", "zh", "ko"].forEach(lang => {
      result[lang] = [label(category, lang), label(sort, lang), label(filter, lang), label(linkType, lang)].join(" / ");
    });
    return result;
  };

  const root = document.createElement("div");
  root.className = "dlsite-open-list";
  root.append(makeLabel("p", "root", "dlsite-open-list-title"));

  const legend = document.createElement("aside");
  legend.className = "dlsite-link-legend";
  legend.setAttribute("aria-label", label("legend_title", currentLanguage()));
  legend.dataset.ariaLabelKey = "legend_title";
  legend.append(makeLabel("strong", "legend_title", "dlsite-link-legend-title"));
  [["standard", "legend_standard"], ["soon", "legend_soon"]].forEach(([badgeKey, descriptionKey]) => {
    const item = document.createElement("span");
    item.className = `dlsite-link-legend-item dlsite-link-legend-${badgeKey}`;
    item.append(
      makeLabel("span", badgeKey, "dlsite-link-legend-badge"),
      makeLabel("span", descriptionKey, "dlsite-link-legend-text")
    );
    legend.append(item);
  });
  root.append(legend);

  const ranking = document.createElement("section");
  ranking.className = "dlsite-ranking-block";
  ranking.append(makeLabel("h3", "ranking"));
  const rankingLinks = document.createElement("div");
  rankingLinks.className = "dlsite-ranking-links";
  rankings.forEach(([ja, en, zh, ko, href], index) => {
    rankingLinks.append(makeLink({ ja, en, zh, ko }, href, `dlsite-ranking-${index + 1}`));
  });
  ranking.append(rankingLinks);
  root.append(ranking);

  categories.forEach(category => {
    const categoryNode = document.createElement("section");
    categoryNode.className = `dlsite-category-block dlsite-category-${category}`;
    categoryNode.append(makeLabel("h3", category));
    sorts.forEach(sort => {
      const sortNode = document.createElement("section");
      sortNode.className = "dlsite-sort-block";
      sortNode.append(makeLabel("h4", sort));
      const rows = document.createElement("div");
      rows.className = "dlsite-filter-rows";
      filters.forEach(([filter, suffix]) => {
        const row = document.createElement("div");
        row.className = "dlsite-filter-row";
        row.append(makeLabel("span", filter, "dlsite-filter-label"));
        const actions = document.createElement("span");
        actions.className = "dlsite-filter-actions";
        actions.append(
          makeLink(words.standard, affiliateUrl(category, sort, suffix, false), `dlsite-${category}-${sort}-${filter}`, contextualLabels(category, sort, filter, "standard")),
          makeLink(words.soon, affiliateUrl(category, sort, suffix, true), `dlsite-${category}-${sort}-${filter}-soon`, contextualLabels(category, sort, filter, "soon_full"))
        );
        row.append(actions);
        rows.append(row);
      });
      sortNode.append(rows);
      categoryNode.append(sortNode);
    });
    root.append(categoryNode);
  });

  mount.replaceChildren(root);

  const localize = () => {
    const lang = currentLanguage();
    mount.querySelectorAll("[data-label-key]").forEach(node => {
      node.textContent = label(node.dataset.labelKey, lang);
    });
    mount.querySelectorAll("[data-aria-label-key]").forEach(node => {
      node.setAttribute("aria-label", label(node.dataset.ariaLabelKey, lang));
    });
    mount.querySelectorAll("a[data-labels]").forEach(link => {
      const labels = JSON.parse(link.dataset.labels);
      link.textContent = labels[lang] || labels.ja;
      if (link.dataset.affiliateHref) link.href = localizedAffiliateUrl(link.dataset.affiliateHref, lang);
      if (link.dataset.ariaLabels) {
        const ariaLabels = JSON.parse(link.dataset.ariaLabels);
        link.setAttribute("aria-label", ariaLabels[lang] || ariaLabels.ja);
      }
    });
  };
  new MutationObserver(localize).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();

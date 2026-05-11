(() => {
  const TRACKING_SELECTOR = [
    "a[data-analytics-link]",
    ".research-subnav a",
    ".research-pack-mini-cta a",
    ".prompt-guide-preview-card",
    ".quick-links a[href*='research']",
  ].join(",");

  function safeUrl(href) {
    try {
      return new URL(href, window.location.href);
    } catch (error) {
      return null;
    }
  }

  function trimmedText(link) {
    return (link.textContent || link.getAttribute("aria-label") || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);
  }

  function eventNameFor(link, url) {
    if (link.dataset.analyticsEvent) return link.dataset.analyticsEvent;
    if (link.classList.contains("prompt-guide-preview-card")) return "prompt_guide_pack_click";
    if (url && url.pathname.includes("/prompt-guide-pack/")) return "prompt_guide_pack_click";
    if (link.closest(".research-subnav") || (url && url.pathname.includes("/research/"))) return "research_click";
    if (url && url.hostname !== window.location.hostname) return "outbound_link_click";
    return "site_link_click";
  }

  function kebabText(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  function linkIdFor(link, url) {
    if (link.dataset.analyticsLink) return link.dataset.analyticsLink;
    if (url && url.pathname.includes("/prompt-guide-pack/")) return "prompt-guide-pack-link";
    if (url && url.pathname.includes("/research/")) {
      const path = url.pathname.replace(/^\/+|\/+$/g, "").replace(/\/index\.html$/, "");
      return path.replace(/\//g, "-") || "research-index";
    }
    return kebabText(trimmedText(link)) || "tracked-link";
  }

  function areaFor(link) {
    if (link.dataset.analyticsArea) return link.dataset.analyticsArea;
    if (link.closest(".research-subnav")) return "research-subnav";
    if (link.closest(".research-pack-mini-cta")) return "research-pack-mini-cta";
    if (link.classList.contains("prompt-guide-preview-card")) return "prompt-guide-pack-preview";
    if (link.closest(".quick-links")) return "global-nav";
    return "";
  }

  function sendClickEvent(link) {
    if (typeof window.gtag !== "function") return;

    const url = safeUrl(link.getAttribute("href") || "");
    const params = {
      link_id: linkIdFor(link, url),
      link_area: areaFor(link),
      link_text: trimmedText(link),
      link_url: url ? url.href : link.getAttribute("href") || "",
      link_domain: url ? url.hostname : "",
      destination_path: url ? url.pathname : "",
      page_path: window.location.pathname,
      outbound: url ? url.hostname !== window.location.hostname : false,
      transport_type: "beacon",
    };

    window.gtag("event", eventNameFor(link, url), params);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest(TRACKING_SELECTOR);
    if (!link) return;
    sendClickEvent(link);
  });
})();

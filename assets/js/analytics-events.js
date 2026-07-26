(() => {
  if (window.esunamuraAnalyticsEventsBound) return;
  window.esunamuraAnalyticsEventsBound = true;

  const DOWNLOAD_EXTENSIONS = new Set([
    "7z", "cb7", "cbr", "cbt", "cbz", "csv", "epub", "pdf", "rar", "txt", "xls", "xlsx", "zip",
  ]);
  const CONTENT_ACCESS_PLATFORMS = new Set([
    "amazon", "booth", "chichipui", "digiket", "dlsite", "fanza", "pictspace", "pixiv", "promptcom",
  ]);
  const SITE_HOSTS = new Set(["esunamura.com", "www.esunamura.com", window.location.hostname]);
  let workDetailViewSent = false;

  function safeUrl(href) {
    try {
      return new URL(href, window.location.href);
    } catch (error) {
      return null;
    }
  }

  function staticLabel(element) {
    return (
      element.dataset.analyticsLabel ||
      element.getAttribute("aria-label") ||
      element.textContent ||
      ""
    )
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100);
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  function pageType() {
    const path = window.location.pathname;
    if (/\/titles\/[^/]+\.html$/.test(path) || /\/works\/fanart(?:-r15)?\/?(?:index\.html)?$/.test(path)) {
      return "work_detail";
    }
    if (/\/works\/?(?:index\.html)?$/.test(path)) return "works_index";
    if (/\/research\//.test(path)) return "research";
    if (/\/app\//.test(path)) return "viewer_app";
    if (path === "/" || path === "/index.html") return "home";
    return "other";
  }

  function workIdFromPath(pathname = window.location.pathname) {
    if (window.DETAIL_WORK_ID) return String(window.DETAIL_WORK_ID);
    const titleMatch = pathname.match(/\/titles\/([^/]+)\.html$/);
    if (titleMatch) return decodeURIComponent(titleMatch[1]);
    const fanartMatch = pathname.match(/\/works\/(fanart(?:-r15)?)\/?(?:index\.html)?$/);
    return fanartMatch ? fanartMatch[1] : "";
  }

  function platformFor(url, element) {
    const explicit = element?.dataset.analyticsPlatform;
    if (explicit) return explicit.toLowerCase();
    const host = url?.hostname || "";
    if (host.includes("chichi-pui.com")) return "chichipui";
    if (host.includes("dlsite.com") || host === "dlaf.jp") return "dlsite";
    if (host.includes("dmm.co.jp")) return "fanza";
    if (host.includes("digiket.com")) return "digiket";
    if (host.includes("pictspace.net")) return "pictspace";
    if (host.includes("prompt-com.com")) return "promptcom";
    if (host.includes("booth.pm")) return "booth";
    if (host.includes("pixiv.net")) return "pixiv";
    if (host === "x.com" || host.includes("twitter.com") || host === "t.co") return "x";
    if (host.includes("amazon.")) return "amazon";
    if (host.includes("google.com")) return "google";
    return SITE_HOSTS.has(host) ? "internal" : "other";
  }

  function isOutbound(url) {
    return Boolean(url && /^https?:$/.test(url.protocol) && !SITE_HOSTS.has(url.hostname));
  }

  function isDownload(element, url) {
    if (element.hasAttribute("download") || element.dataset.analyticsEvent === "download_click") return true;
    const extension = (url?.pathname.split(".").pop() || "").toLowerCase();
    return DOWNLOAD_EXTENSIONS.has(extension);
  }

  function isWorkDetailLink(element, url) {
    if (!url || !SITE_HOSTS.has(url.hostname)) return false;
    return (
      /\/titles\/[^/]+\.html$/.test(url.pathname) ||
      /\/works\/fanart(?:-r15)?\/?(?:index\.html)?$/.test(url.pathname) ||
      element.dataset.analyticsEvent === "work_detail_click"
    );
  }

  function isViewerStart(element, url) {
    if (element.dataset.analyticsEvent === "viewer_start" || element.dataset.analyticsEvent === "app_click") {
      return true;
    }
    return Boolean(url && SITE_HOSTS.has(url.hostname) && /\/app\/?(?:index\.html)?$/.test(url.pathname));
  }

  function isMajorCta(element) {
    const area = element.dataset.analyticsArea || "";
    return Boolean(
      element.dataset.analyticsEvent ||
      element.matches(".cta, .sales-button, .share-x-button, .link-button.primary") ||
      /(?:cta|featured|hero|sale|sales|stores|affiliate|prompt-pack)/.test(area)
    );
  }

  function eventParams(element, url) {
    const label = staticLabel(element);
    const destinationPath = url?.pathname || "";
    const destinationId = element.dataset.analyticsLink || slugify(label) || slugify(destinationPath);
    return {
      link_id: destinationId,
      link_area: element.dataset.analyticsArea || "unknown",
      link_text: label,
      link_domain: url?.hostname || "",
      destination_path: destinationPath.slice(0, 160),
      platform: platformFor(url, element),
      work_id: element.dataset.analyticsWork || workIdFromPath(destinationPath) || workIdFromPath(),
      work_title: element.dataset.analyticsWorkTitle || document.querySelector("h1")?.textContent?.trim().slice(0, 100) || "",
      page_path: window.location.pathname,
      page_type: pageType(),
      content_language: document.documentElement.lang || "ja",
      outbound: isOutbound(url),
      transport_type: "beacon",
    };
  }

  function send(eventName, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, params);
  }

  function trackClick(element) {
    const url = element.matches("a[href]") ? safeUrl(element.getAttribute("href")) : null;
    const params = eventParams(element, url);
    const download = isDownload(element, url);

    if (isWorkDetailLink(element, url)) send("work_detail_click", params);
    if (isViewerStart(element, url)) send("viewer_start", params);
    if (download) send("download_click", params);
    if (isOutbound(url)) {
      send("outbound_link_click", { ...params, link_type: download ? "download" : "external" });
      if (CONTENT_ACCESS_PLATFORMS.has(params.platform)) {
        send("content_access_click", { ...params, access_type: params.platform === "chichipui" ? "membership" : "external_page" });
      }
    }
    if (isMajorCta(element)) {
      send("cta_click", {
        ...params,
        cta_name: params.link_id,
        cta_type: download ? "download" : isOutbound(url) ? "external" : "internal",
      });
    }
  }

  function trackWorkDetailView() {
    if (pageType() !== "work_detail" || workDetailViewSent) return;
    const ageGateEnter = document.querySelector(".age-gate-enter");
    if (ageGateEnter && !document.body.classList.contains("age-verified")) {
      ageGateEnter.addEventListener("click", trackWorkDetailView, { once: true });
      return;
    }
    workDetailViewSent = true;
    const heading = document.querySelector("h1");
    send("work_detail_view", {
      work_id: workIdFromPath(),
      work_title: heading?.textContent?.trim().slice(0, 100) || document.title.slice(0, 100),
      page_path: window.location.pathname,
      page_type: "work_detail",
      content_language: document.documentElement.lang || "ja",
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("a[href], button[data-analytics-event]");
    if (!target) return;
    trackClick(target);
  });

  window.esunamuraAnalytics = Object.freeze({
    track: (eventName, params = {}) => send(eventName, {
      ...params,
      page_path: window.location.pathname,
      page_type: pageType(),
      content_language: document.documentElement.lang || "ja",
    }),
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackWorkDetailView, { once: true });
  } else {
    trackWorkDetailView();
  }
})();

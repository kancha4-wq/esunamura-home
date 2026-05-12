(function () {
  const PREVIEW_KEY = "esunamura_preview";
  const DEFAULT_GA4_MEASUREMENT_ID = "G-FCSL20JL55";

  function getPreviewParam() {
    try {
      return new URLSearchParams(window.location.search).get("preview");
    } catch (error) {
      return null;
    }
  }

  function setPreviewStorage(value) {
    try {
      window.localStorage.setItem(PREVIEW_KEY, value);
    } catch (error) {
      // Cookie fallback is enough when localStorage is unavailable.
    }
  }

  function removePreviewStorage() {
    try {
      window.localStorage.removeItem(PREVIEW_KEY);
    } catch (error) {
      // Cookie removal below still clears the browser-level opt-out.
    }
  }

  function hasPreviewStorage() {
    try {
      return window.localStorage.getItem(PREVIEW_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function setPreviewCookie() {
    document.cookie = PREVIEW_KEY + "=1; path=/; max-age=31536000; SameSite=Lax";
  }

  function removePreviewCookie() {
    document.cookie = PREVIEW_KEY + "=; path=/; max-age=0; SameSite=Lax";
  }

  function hasPreviewCookie() {
    return document.cookie
      .split(";")
      .some((cookie) => cookie.trim() === PREVIEW_KEY + "=1");
  }

  function appendScript(attributes) {
    const script = document.createElement("script");
    Object.keys(attributes).forEach((name) => {
      if (attributes[name] === true) {
        script.setAttribute(name, "");
      } else {
        script.setAttribute(name, attributes[name]);
      }
    });
    document.head.appendChild(script);
  }

  const loaderScript = document.currentScript;
  const ga4MeasurementId =
    (loaderScript && loaderScript.dataset.ga4MeasurementId) || DEFAULT_GA4_MEASUREMENT_ID;
  const cloudflareBeaconToken =
    (loaderScript && loaderScript.dataset.cloudflareBeaconToken) || "";
  const preview = getPreviewParam();

  if (preview === "1") {
    setPreviewStorage("1");
    setPreviewCookie();
  } else if (preview === "0") {
    removePreviewStorage();
    removePreviewCookie();
  }

  if (hasPreviewStorage() || hasPreviewCookie()) {
    window.esunamuraAnalyticsDisabled = true;
    return;
  }

  window.GA4_MEASUREMENT_ID = ga4MeasurementId;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ga4MeasurementId);

  appendScript({
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4MeasurementId),
  });

  if (cloudflareBeaconToken) {
    appendScript({
      defer: true,
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      "data-cf-beacon": JSON.stringify({ token: cloudflareBeaconToken }),
    });
  }
})();

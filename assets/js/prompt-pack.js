let currentPromptLanguage = "ja";

const languageButtons = document.querySelectorAll(".lang-button");
const translatableNodes = document.querySelectorAll("[data-ja]");
const promptLanguageTabs = document.querySelectorAll("[data-prompt-lang]");
const promptLanguagePanels = document.querySelectorAll("[data-prompt-panel]");
const sampleImages = document.querySelectorAll(".cover-frame img, .prompt-sample-gallery img");

function setPromptPanel(language) {
  const availableLanguage = document.querySelector(`[data-prompt-panel="${language}"]`) ? language : "ja";

  promptLanguageTabs.forEach((tab) => {
    const isActive = tab.dataset.promptLang === availableLanguage;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  promptLanguagePanels.forEach((panel) => {
    panel.hidden = panel.dataset.promptPanel !== availableLanguage;
  });
}

function setLanguage(language) {
  currentPromptLanguage = language;
  document.documentElement.lang = language;

  try {
    window.localStorage.setItem("archiveLang", language);
  } catch (error) {
    // Language switching still works when storage is blocked.
  }

  translatableNodes.forEach((node) => {
    node.textContent = node.dataset[language] || node.dataset.ja;
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });

  setPromptPanel(language);
}

function individualClickEventName(link) {
  const href = link.getAttribute("href");
  if (!href || href === "#") return "";

  const hostname = new URL(link.href).hostname;
  if (hostname.includes("booth.pm")) return "click_booth";
  return "";
}

function sendOutboundClick(link) {
  if (typeof window.gtag !== "function") {
    return;
  }

  const destination = link.dataset.analyticsLink || link.textContent.trim().toLowerCase().replace(/\s+/g, "-");
  const area = link.dataset.analyticsArea || "prompt-pack";
  const params = {
    link_url: `${destination}:${link.href}`,
    link_domain: link.getAttribute("href") === "#" ? "placeholder" : new URL(link.href).hostname,
    link_text: link.textContent.trim(),
    link_destination: destination,
    link_area: area,
    work_slug: "kyoto-prompt-pack",
    outbound: true,
    transport_type: "beacon",
  };

  window.gtag("event", "click", params);

  const eventName = individualClickEventName(link);
  if (eventName) {
    window.gtag("event", eventName, params);
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

promptLanguageTabs.forEach((tab) => {
  tab.addEventListener("click", () => setLanguage(tab.dataset.promptLang));
});

sampleImages.forEach((image) => {
  image.addEventListener("error", () => {
    const frame = image.closest("[data-sample]");
    if (!frame) return;
    frame.classList.add("is-missing");
    image.hidden = true;
  });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-analytics-link]");
  if (!link) return;
  sendOutboundClick(link);
});

setLanguage(window.localStorage?.getItem("archiveLang") || currentPromptLanguage);

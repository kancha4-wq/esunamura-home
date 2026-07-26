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

setLanguage(window.localStorage?.getItem("archiveLang") || currentPromptLanguage);

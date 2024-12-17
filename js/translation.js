document.addEventListener("DOMContentLoaded", () => {
  const languageDropdown = document.getElementById("languageDropdown");
  const languageItems = document.querySelectorAll(
    ".dropdown-menu .dropdown-item"
  );

  // Load specific translation file based on the selected language
  async function loadTranslations(language) {
    try {
      const response = await fetch(`../json/${language}.json`); // Dynamically load the appropriate file
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error(`Error loading translations for ${language}:`, error);
      return null;
    }
  }

  // Update page content with selected language
  async function updateContent(language) {
    const langData = await loadTranslations(language);

    if (!langData) {
      console.warn(`Translations not found for language: ${language}`);
      return;
    }

    // Update text elements with translation data
    document.getElementById("heroSubtitle").textContent = langData.heroSubtitle;
    document.getElementById("languageDropdown").textContent =
      langData.languageDropdown;
    document.getElementById("aboutText").textContent = langData.aboutText;
    document.getElementById("servicesTitle").textContent =
      langData.servicesTitle;

    // Services
    document.getElementById("service1").textContent = langData.services[0];
    document.getElementById("service2").textContent = langData.services[1];
    document.getElementById("service3").textContent = langData.services[2];

    // Experience
    document.getElementById("experienceTitle").textContent =
      langData.experienceTitle;

    // Projects
    document.getElementById("projectsTitle").textContent =
      langData.projectsTitle;

    // Skills
    document.getElementById("skillsTitle").textContent = langData.skillsTitle;
  }

  // Set up event listeners on each language item in the dropdown
  languageItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedLanguage = item.getAttribute("data-lang");

      // Update the dropdown toggle text to show the selected language
      languageDropdown.textContent = item.textContent;

      // Update page content to the selected language
      updateContent(selectedLanguage);
    });
  });

  // Set default language to English on load
  updateContent("en");
});

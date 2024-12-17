function setTheme(mode = "auto") {
  const sysMode = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  const useSystem = mode === "system" || mode === "auto";
  const modeChosen = useSystem ? sysMode : mode;

  document.documentElement.setAttribute("data-bs-theme", modeChosen);

  // Toggle CSS classes for specific elements
  document
    .querySelectorAll(".mode-switch .btn")
    .forEach((e) => e.classList.remove("text-body"));
  if (modeChosen === "dark") {
    document.getElementById("dark").classList.add("text-body");
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.body.style.backgroundColor = "#121212"; // Change body background color for dark mode
    document.body.style.color = "#ffffff"; // Change body text color for dark mode
  } else if (modeChosen === "light") {
    document.getElementById("light").classList.add("text-body");
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    document.body.style.backgroundColor = ""; // Reset body background color for light mode
    document.body.style.color = ""; // Reset body text color for light mode
  }
}

// Initialize the theme
document.addEventListener("DOMContentLoaded", () => {
  setTheme();

  // Add event listeners to the buttons
  document
    .querySelectorAll(".mode-switch .btn")
    .forEach((e) => e.addEventListener("click", () => setTheme(e.id)));

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", () => setTheme("system"));
});

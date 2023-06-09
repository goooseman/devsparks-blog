document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector("#theme-toggle");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("light-theme", theme === "light");
    document.body.classList.toggle("dark-theme", theme === "dark");
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.innerHTML = theme === "light" ? "🌒" : "🌞";
    window.REMARK42.changeTheme(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function setDefaultTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDarkMode ? "dark" : "light");
  }

  themeToggle.addEventListener("click", toggleTheme);
  setDefaultTheme();

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setTheme(event.matches ? "dark" : "light");
    });
  }
});
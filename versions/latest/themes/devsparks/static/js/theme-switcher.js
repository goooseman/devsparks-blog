// Check system theme on page load
document.addEventListener("DOMContentLoaded", function() {
  var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.body.classList.add("body__theme__" + systemTheme);
});

// Watch for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(e) {
  var newTheme = e.matches ? "dark" : "light";
  document.body.classList.remove("body__theme__dark", "body__theme__light");
  document.body.classList.add("body__theme__" + newTheme);
});

// Theme switch toggle
var themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("click", function() {
  var currentTheme = document.body.classList.contains("body__theme__dark") ? "dark" : "light";
  var newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.classList.remove("body__theme__dark", "body__theme__light");
  document.body.classList.add("body__theme__" + newTheme);
  themeSwitch.setAttribute("aria-label", "Switch to " + (newTheme === "dark" ? "light" : "dark") + " theme");
  themeSwitch.textContent = newTheme === "dark" ? "🌞" : "🌒";
});
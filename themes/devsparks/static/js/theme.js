const themeToggle = document.querySelector("#theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

themeToggle.addEventListener("click", toggleTheme);

// Set initial theme based on system preference or previous user choice
if (localStorage.getItem("theme")) {
  document.documentElement.classList.add(localStorage.getItem("theme"));
} else if (systemTheme.matches) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.add("light");
}
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;

  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('body__theme__light');
      body.classList.remove('body__theme__dark');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#eff1f5");
      if (window.remark_config) {
        window.remark_config.theme = "light";
      }
      themeSwitch.innerHTML = '🌒';
      themeSwitch.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      body.classList.add('body__theme__dark');
      body.classList.remove('body__theme__light');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#303446");
      if (window.remark_config) {
        window.remark_config.theme = "dark";
      }
      themeSwitch.innerHTML = '🌞';
      themeSwitch.setAttribute('aria-label', 'Switch to light theme');
    }
    sessionStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const currentTheme = body.classList.contains('body__theme__light') ? 'light' : 'dark';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  function applySystemTheme() {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  }

  function applySavedTheme() {
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      applySystemTheme();
    }
  }

  function onSystemThemeChange(e) {
    if (!sessionStorage.getItem('theme')) {
      applySystemTheme();
    }
  }

  themeSwitch.addEventListener('click', toggleTheme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onSystemThemeChange);

  applySavedTheme();
});
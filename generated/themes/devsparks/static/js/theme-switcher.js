document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    themeSwitch.innerHTML = theme === 'light' ? '🌒' : '🌞';
    themeSwitch.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    if (window.REMARK42) {
      window.REMARK42.changeTheme(theme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function initTheme() {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }

  themeSwitch.addEventListener('click', toggleTheme);
  initTheme();

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    });
  }
});
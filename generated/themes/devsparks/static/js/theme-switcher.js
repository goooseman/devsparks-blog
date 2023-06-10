const themeSwitch = document.getElementById('theme-switch');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${theme}-theme`);
  themeSwitch.textContent = theme === 'dark' ? '🌞' : '🌒';
  themeSwitch.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function initTheme() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(isDark ? 'dark' : 'light');
}

initTheme();

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    setTheme(event.matches ? 'dark' : 'light');
  });
}

themeSwitch.addEventListener('click', toggleTheme);
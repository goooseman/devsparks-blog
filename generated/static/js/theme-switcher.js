function initTheme() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  changeTheme(isDark ? 'dark' : 'light');
}

function changeTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.innerHTML = theme === 'dark' ? '🌞' : '🌒';
  themeSwitch.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  if (window.REMARK42) {
    window.REMARK42.changeTheme(theme);
  }
}

document.getElementById('theme-switch').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  changeTheme(newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  changeTheme(event.matches ? 'dark' : 'light');
});

initTheme();
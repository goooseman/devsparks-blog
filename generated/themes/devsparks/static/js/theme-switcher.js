function switchTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  document.body.classList.remove(currentTheme + '-theme');
  document.body.classList.add(newTheme + '-theme');
  updateThemeIcon(newTheme);
  updateAriaLabel(newTheme);
  if (window.REMARK42) {
    window.REMARK42.changeTheme(newTheme);
  }
}

function updateThemeIcon(theme) {
  const themeSwitch = document.querySelector('.theme-switch');
  themeSwitch.textContent = theme === 'dark' ? '🌞' : '🌒';
}

function updateAriaLabel(theme) {
  const themeSwitch = document.querySelector('.theme-switch');
  themeSwitch.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

function handleSystemThemeChange(event) {
  const newTheme = event.matches ? 'dark' : 'light';
  switchTheme(newTheme);
}

function initTheme() {
  const systemDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (systemDarkTheme) {
    switchTheme();
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
}

document.querySelector('.theme-switch').addEventListener('click', switchTheme);
initTheme();
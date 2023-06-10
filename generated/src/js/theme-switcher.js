const themeSwitcher = document.querySelector('.theme-switcher');

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function changeTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.className = `${theme}-theme`;
  themeSwitcher.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  themeSwitcher.innerHTML = theme === 'light' ? '🌒' : '🌞';
  if (window.REMARK42) {
    window.REMARK42.changeTheme(theme);
  }
}

function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  changeTheme(newTheme);
}

function initTheme() {
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  changeTheme(systemDark ? 'dark' : 'light');
}

function watchSystemThemeChange() {
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      changeTheme(event.matches ? 'dark' : 'light');
    });
  }
}

themeSwitcher.addEventListener('click', toggleTheme);
initTheme();
watchSystemThemeChange();
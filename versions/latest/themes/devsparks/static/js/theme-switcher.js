
window.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeSwitch.textContent = '🌞';
      themeSwitch.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeSwitch.textContent = '🌒';
      themeSwitch.setAttribute('aria-label', 'Switch to dark theme');
    }
  } else {
    const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
    if (systemTheme === 'dark') {
      themeSwitch.textContent = '🌞';
      themeSwitch.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeSwitch.textContent = '🌒';
      themeSwitch.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      themeSwitch.textContent = '🌞';
      themeSwitch.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeSwitch.textContent = '🌒';
      themeSwitch.setAttribute('aria-label', 'Switch to dark theme');
    }
  });
});

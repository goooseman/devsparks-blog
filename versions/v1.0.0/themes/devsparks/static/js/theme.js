const themeSwitch = document.getElementById('theme-switch');

function setTheme(theme) {
  document.body.classList.remove('body__theme__light', 'body__theme__dark');
  document.body.classList.add(`body__theme__${theme}`);
  themeSwitch.textContent = theme === 'light' ? '🌒' : '🌞';
  themeSwitch.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains('body__theme__light') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('devsparks-theme', newTheme);
}

function applySystemTheme() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(systemTheme);
}

function applyStoredTheme() {
  const storedTheme = localStorage.getItem('devsparks-theme');
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    applySystemTheme();
  }
}

themeSwitch.addEventListener('click', toggleTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);

applyStoredTheme();
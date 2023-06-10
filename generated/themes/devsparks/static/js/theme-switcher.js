(function() {
  const themeSwitch = document.getElementById('theme-switch');
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(currentTheme);

  themeSwitch.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (window.r42) {
      window.r42.changeTheme(newTheme);
    }
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    themeSwitch.innerHTML = theme === 'light' ? '🌒' : '🌞';
    themeSwitch.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  }
})();
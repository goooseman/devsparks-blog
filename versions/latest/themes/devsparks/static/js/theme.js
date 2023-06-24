(function() {
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;

  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.remove('body__theme__light');
      body.classList.add('body__theme__dark');
      themeSwitch.innerHTML = '🌞';
      themeSwitch.setAttribute('aria-label', 'Switch to light theme');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#40414e");
      window.REMARK42?.changeTheme("dark");
    } else {
      body.classList.remove('body__theme__dark');
      body.classList.add('body__theme__light');
      themeSwitch.innerHTML = '🌒';
      themeSwitch.setAttribute('aria-label', 'Switch to dark theme');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#ffc000");
      window.REMARK42?.changeTheme("light");
    }
  }

  function toggleTheme() {
    if (body.classList.contains('body__theme__dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  function applySystemTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    prefersDarkScheme.addEventListener('change', (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    });
  }

  themeSwitch.addEventListener('click', toggleTheme);
  applySystemTheme();
})();
// Get the theme switch element
const themeSwitch = document.getElementById('theme-switch');

// Add event listener to detect theme switch
themeSwitch.addEventListener('click', () => {
  // Get the body element
  const body = document.querySelector('body');

  // Toggle the theme class
  body.classList.toggle('body__theme__light');
  body.classList.toggle('body__theme__dark');

  // Get the current theme
  const currentTheme = body.classList.contains('body__theme__light') ? 'light' : 'dark';

  // Get the theme switch icon element
  const themeSwitchIcon = themeSwitch.querySelector('span');

  // Update the theme switch icon and aria-label
  if (currentTheme === 'light') {
    themeSwitchIcon.textContent = '🌒';
    themeSwitch.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    themeSwitchIcon.textContent = '🌞';
    themeSwitch.setAttribute('aria-label', 'Switch to light theme');
  }
});

// Check the system theme
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Get the body element
const body = document.querySelector('body');

// Set the initial theme based on the system theme
if (systemTheme === 'dark') {
  body.classList.add('body__theme__dark');
} else {
  body.classList.add('body__theme__light');
}
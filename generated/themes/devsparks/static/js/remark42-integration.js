document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.querySelector('#theme-toggle');

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    window.REMARK42.changeTheme(newTheme);
  });
});
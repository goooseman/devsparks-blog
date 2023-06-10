document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.getElementById('theme-switch');
  const remark42Container = document.getElementById('remark42');

  function updateRemark42Theme(theme) {
    if (window.REMARK42) {
      window.REMARK42.changeTheme(theme);
    }
  }

  themeSwitch.addEventListener('change', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateRemark42Theme(currentTheme);
  });

  const initialTheme = document.documentElement.getAttribute('data-theme');
  updateRemark42Theme(initialTheme);
});
(function() {
  var remark_config = {
    host: 'https://r42.goooseman.dev',
    site_id: 'dev_sparks',
    components: ['embed', 'last-comments'],
    max_shown_comments: 100,
    theme: document.documentElement.getAttribute('data-theme'),
    page_title: document.title,
    show_email_subscription: false,
    simple_view: true,
    no_footer: false
  };

  var script = document.createElement('script');
  script.src = remark_config.host + '/web/embed.js';
  script.defer = true;
  document.body.appendChild(script);

  document.getElementById('theme-switch').addEventListener('click', function() {
    var newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    window.r42.changeTheme(newTheme);
  });
})();
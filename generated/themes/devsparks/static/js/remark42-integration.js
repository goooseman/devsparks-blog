document.addEventListener('DOMContentLoaded', function () {
  var remark_config = {
    host: 'https://remark42.goooseman.dev',
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
  script.type = 'module';
  script.async = true;
  script.defer = true;
  script.src = remark_config.host + '/web/embed.mjs';
  (document.head || document.body).appendChild(script);

  var remark42Container = document.createElement('div');
  remark42Container.id = 'remark42';
  document.getElementById('remark42').parentNode.insertBefore(remark42Container, document.getElementById('remark42'));

  document.getElementById('theme-switch').addEventListener('click', function () {
    var newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    window.REMARK42.changeTheme(newTheme);
  });
});
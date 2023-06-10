(function() {
  function initRemark42() {
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
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = remark_config.host + '/web/embed.js';
    document.head.appendChild(script);

    var remarkContainer = document.createElement('div');
    remarkContainer.id = 'remark42';
    document.getElementById('remark42').parentNode.insertBefore(remarkContainer, document.getElementById('remark42'));
  }

  document.addEventListener('DOMContentLoaded', initRemark42);

  document.getElementById('theme-switch').addEventListener('click', function() {
    var newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    window.REMARK42.changeTheme(newTheme);
  });
})();
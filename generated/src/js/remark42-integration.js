(function() {
  function initRemark42() {
    var remark_config = {
      host: 'https://remark42.goooseman.dev',
      site_id: 'dev_sparks',
      components: ['embed', 'last-comments'],
      max_shown_comments: 100,
      theme: getCurrentTheme(),
      page_title: document.title,
      show_email_subscription: false,
      simple_view: true,
      no_footer: false
    };

    var script = document.createElement('script');
    script.src = remark_config.host + '/web/embed.js';
    script.defer = true;
    document.body.appendChild(script);
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  document.addEventListener('DOMContentLoaded', function() {
    initRemark42();
  });

  document.addEventListener('themeChanged', function(event) {
    if (window.REMARK42) {
      window.REMARK42.changeTheme(event.detail.theme);
    }
  });
})();
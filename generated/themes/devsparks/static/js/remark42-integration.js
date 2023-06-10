document.addEventListener('DOMContentLoaded', function () {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';

  var remark_config = {
    host: 'https://remark42.goooseman.dev',
    site_id: 'dev_sparks',
    components: ['embed', 'last-comments'],
    max_shown_comments: 100,
    theme: currentTheme,
    page_title: document.title,
    show_email_subscription: false,
    simple_view: true,
    no_footer: false
  };

  (function (e, n) {
    for (var o = 0; o < e.length; o++) {
      var r = n.createElement("script"),
        c = ".js",
        d = n.head || n.body;
      "noModule" in r ? (r.type = "module", c = ".mjs") : r.async = !0, r.defer = !0, r.src = remark_config.host + "/web/" + e[o] + c, d.appendChild(r)
    }
  })(remark_config.components || ["embed"], document);

  const themeSwitcher = document.querySelector('#theme-switcher');
  themeSwitcher.addEventListener('click', function () {
    const newTheme = window.REMARK42.changeTheme(currentTheme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
  });
});
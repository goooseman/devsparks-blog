// https://r42.com/docs/configuration/frontend/
var remark_config = {
  host: "https://r42.goooseman.dev",
  site_id: "devsparks.goooseman.dev",
  components: ["embed", "last-comments"],
  max_shown_comments: 100,
  theme: "dark",
  show_email_subscription: false,
  simple_view: false,
  no_footer: false,
};

!function(e, n) {
  for (var o = 0; o < e.length; o++) {
    var r = n.createElement("script"),
      c = ".js",
      d = n.head || n.body;
    "noModule" in r ? (r.type = "module", c = ".mjs") : r.async = !0, r.defer = !0, r.src = remark_config.host + "/web/" + e[o] + c, d.appendChild(r)
  }
}(remark_config.components || ["embed"], document);
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

!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);

document.addEventListener("DOMContentLoaded", function() {
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;

  function setTheme(theme) {
    body.classList.remove("body__theme__light", "body__theme__dark");
    body.classList.add(`body__theme__${theme}`);
  }

  function toggleTheme() {
    if (body.classList.contains("body__theme__light")) {
      setTheme("dark");
      themeSwitch.setAttribute("aria-label", "Switch to light theme");
      themeSwitch.textContent = "🌞";
    } else {
      setTheme("light");
      themeSwitch.setAttribute("aria-label", "Switch to dark theme");
      themeSwitch.textContent = "🌒";
    }
  }

  themeSwitch.addEventListener("click", toggleTheme);

  // Check system theme
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(systemTheme);

  // Watch for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(e) {
    const newTheme = e.matches ? "dark" : "light";
    setTheme(newTheme);
  });
});
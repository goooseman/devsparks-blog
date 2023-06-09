// remark42 integration for comments section

function loadRemark42() {
  var url = "//[YOUR_SERVER]/api/v1/embed.js";
  var script = document.createElement("script");
  script.src = url;
  script.async = true;
  var anchor = document.getElementsByTagName("script")[0];
  anchor.parentNode.insertBefore(script, anchor);
}

loadRemark42();
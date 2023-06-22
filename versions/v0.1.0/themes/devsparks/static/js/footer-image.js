document.addEventListener("DOMContentLoaded", function() {
  const footerImageHuman = document.getElementById("footer-image-human");
  const footerImageRobot = document.getElementById("footer-image-robot");

  footerImageHuman.addEventListener("mouseover", function() {
    footerImageHuman.style.display = "none";
    footerImageRobot.style.display = "block";
  });

  footerImageRobot.addEventListener("mouseout", function() {
    footerImageRobot.style.display = "none";
    footerImageHuman.style.display = "block";
  });
});
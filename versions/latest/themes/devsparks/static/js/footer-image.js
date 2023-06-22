document.addEventListener("DOMContentLoaded", function () {
  const humanImage = document.getElementById("footer-image-human");
  const robotImage = document.getElementById("footer-image-robot");

  humanImage.addEventListener("mouseenter", function () {
    humanImage.style.display = "none";
    robotImage.style.display = "block";
  });

  robotImage.addEventListener("mouseleave", function () {
    robotImage.style.display = "none";
    humanImage.style.display = "block";
  });
});
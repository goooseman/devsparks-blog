// themes/devsparks/static/js/footer-image.js

// Add event listener to the footer image
const footerImage = document.querySelector('.footer__author-photo');
footerImage.addEventListener('mouseover', function() {
  footerImage.src = '/robot@2x.png';
});

footerImage.addEventListener('mouseout', function() {
  footerImage.src = '/human@2x.png';
});
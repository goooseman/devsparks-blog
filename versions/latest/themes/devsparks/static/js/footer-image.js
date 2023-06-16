
// footer-image.js

// Add event listener to the author photo element
const authorPhoto = document.querySelector('.footer__author-photo');
authorPhoto.addEventListener('mouseover', () => {
  authorPhoto.src = '/robot@2x.png';
});

authorPhoto.addEventListener('mouseout', () => {
  authorPhoto.src = '/human@2x.png';
});

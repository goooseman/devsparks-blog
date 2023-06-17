// footer-image.js

// Get the photo of the author
const authorPhoto = document.querySelector('.footer__author-photo');

// Add event listener for hover effect
authorPhoto.addEventListener('mouseover', () => {
  // Change the photo to the robot image
  authorPhoto.src = '/robot.png';
});

// Add event listener for mouseout
authorPhoto.addEventListener('mouseout', () => {
  // Change the photo back to the human image
  authorPhoto.src = '/human.png';
});
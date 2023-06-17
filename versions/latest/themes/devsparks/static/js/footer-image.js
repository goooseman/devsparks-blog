// Footer image hover effect
const authorPhoto = document.querySelector('.footer__author-photo img');
const robotPhotoSrc = '/robot.png';
const humanPhotoSrc = '/human.png';

authorPhoto.addEventListener('mouseover', function() {
  authorPhoto.src = robotPhotoSrc;
});

authorPhoto.addEventListener('mouseout', function() {
  authorPhoto.src = humanPhotoSrc;
});
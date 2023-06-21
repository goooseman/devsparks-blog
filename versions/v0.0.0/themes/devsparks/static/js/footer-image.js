const footerImageHuman = document.getElementById('footer-image-human');
const footerImageRobot = document.getElementById('footer-image-robot');

footerImageHuman.addEventListener('mouseover', () => {
  footerImageHuman.style.display = 'none';
  footerImageRobot.style.display = 'block';
});

footerImageRobot.addEventListener('mouseout', () => {
  footerImageRobot.style.display = 'none';
  footerImageHuman.style.display = 'block';
});
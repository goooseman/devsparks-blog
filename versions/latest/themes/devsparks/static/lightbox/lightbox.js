document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.article__content img');

    images.forEach(img => {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', function() {
            if(!document.querySelector('.fullscreen-img')) {
                img.style.cursor = 'zoom-out';

                const clone = img.cloneNode();
                clone.classList.add('fullscreen-img');
                clone.style.position = 'fixed';
                clone.style.left = '50%';
                clone.style.top = '50%';
                clone.style.transform = 'translate(-50%, -50%)';
                clone.style.zIndex = '9999';
                clone.style.maxWidth = '100%';
                clone.style.maxHeight = '100%';
                clone.style.width = 'auto';
                clone.style.height = 'auto';
                document.body.appendChild(clone);

                clone.addEventListener('click', function() {
                    document.body.removeChild(clone);
                    img.style.cursor = 'zoom-in';
                });

                window.addEventListener('keydown', function(e) {
                    if(e.key === 'Escape') {
                        if(document.querySelector('.fullscreen-img')) {
                            document.body.removeChild(clone);
                            img.style.cursor = 'zoom-in';
                        }
                    }
                }, { once : true });
            }
        });
    });
});

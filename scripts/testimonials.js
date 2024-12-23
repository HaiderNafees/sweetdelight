document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    let interval;
    const autoScrollDelay = 4000;
    let isTransitioning = false;

    // Clone first and last slides for infinite scroll
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, cards[0]);

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider(smooth = true) {
        if (smooth) {
            slider.style.transition = 'transform 0.5s ease-in-out';
        } else {
            slider.style.transition = 'none';
        }
        
        const slideWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginRight);
        slider.style.transform = `translateX(${-(currentIndex + 1) * slideWidth}px)`;

        // Update active states
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index, smooth = true) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex = index;
        
        if (currentIndex === cards.length) {
            currentIndex = 0;
            setTimeout(() => {
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        } else if (currentIndex < 0) {
            currentIndex = cards.length - 1;
            setTimeout(() => {
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
        
        updateSlider(smooth);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
        
        resetInterval();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, autoScrollDelay);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(interval);
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
        resetInterval();
    });

    // Initialize slider
    updateSlider(false);
    resetInterval();

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', resetInterval);

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(interval);
        } else {
            resetInterval();
        }
    });
}); 
console.log('Animations script loaded');

document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    // Sprinkle animation
    function createSprinkles() {
        const container = document.querySelector('.hero');
        if (!container) {
            console.warn('Hero container not found for sprinkles');
            return;
        }
        
        const sprinkles = ['🧁', '✨', '💖', '🎂'];
        sprinkles.forEach((sprinkle, index) => {
            const span = document.createElement('span');
            span.textContent = sprinkle;
            span.classList.add('sprinkle');
            span.style.animation = `sprinkleFloat 3s ease-in-out ${index * 0.3}s infinite`;
            container.appendChild(span);
        });
    }
    createSprinkles();

    // Scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });

    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(mouseY - bounds.height/2) / 20}deg)
                rotateY(${(mouseX - bounds.width/2) / 20}deg)
                translateZ(20px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Smooth scroll with progress indicator
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Parallax effect for hero image
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');

    hero.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        heroImage.style.transform = `
            perspective(1000px)
            rotateY(${x * 10}deg)
            rotateX(${-y * 10}deg)
            translateZ(20px)
        `;
    });

    hero.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'none';
    });

    // Animate decorative elements
    const decorativeElements = document.querySelectorAll('.decorative-element');
    decorativeElements.forEach(element => {
        element.style.animationDelay = `${Math.random() * 2}s`;
    });
}); 
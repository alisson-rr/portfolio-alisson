// Animations JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        heroTitle.classList.add('typing');
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const heroOffset = heroSection.offsetTop;
            const distance = scrollPosition - heroOffset;
            
            if (distance > -window.innerHeight && distance < window.innerHeight) {
                // Apply parallax effect to hero elements
                const heroImage = document.querySelector('.hero-image');
                if (heroImage) {
                    heroImage.style.transform = `translateY(${distance * 0.05}px)`;
                }
            }
        }
    });

    // Gradient animation for dividers
    const gradientDividers = document.querySelectorAll('.gradient-divider');
    gradientDividers.forEach(divider => {
        divider.style.backgroundSize = '200% 200%';
    });

    // Tool card hover effects
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Case image hover effects
    const caseImages = document.querySelectorAll('.case-image');
    caseImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.03)';
            }
        });
        
        image.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Animate numbers (for future statistics section)
    function animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentNumber = Math.floor(progress * (end - start) + start);
            element.textContent = currentNumber;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize number animations when elements come into view
    const numberElements = document.querySelectorAll('.animate-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseInt(element.getAttribute('data-value'), 10);
                animateNumber(element, 0, endValue, 2000);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    numberElements.forEach(element => {
        observer.observe(element);
    });
});

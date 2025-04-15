// Simplified Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please check your script includes.');
        return;
    }

    // Check if ScrollTrigger is loaded
    if (typeof ScrollTrigger === 'undefined') {
        console.warn('ScrollTrigger is not loaded. Some animations will be disabled.');
    } else {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize hero animations
    initHeroBackground();
    initHeroText();
    initHeroParticles();

    // ScrollTrigger effects removed
});

// Create enhanced background animation
function initHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroGlow = document.querySelector('.hero-glow');

    if (!heroBackground || !heroOverlay) {
        console.error('Hero background elements not found');
        return;
    }

    // Create a timeline for background animations
    const bgTl = gsap.timeline();

    // Initial zoom effect for background
    bgTl.fromTo(heroBackground,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }
    );

    // Subtle continuous floating animation for background
    gsap.to(heroBackground, {
        backgroundPosition: '51% 49%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Fade and animate overlay
    bgTl.fromTo(heroOverlay,
        { opacity: 1, background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%)' },
        {
            opacity: 0.7,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%)',
            duration: 2,
            ease: 'power2.out'
        },
        '-=1.8'
    );

    // Animate the glow effect
    if (heroGlow) {
        bgTl.fromTo(heroGlow,
            { opacity: 0, width: 0, height: 0 },
            { opacity: 0.8, width: '120%', height: '120%', duration: 2.5, ease: 'power2.out' },
            '-=1.5'
        );

        // Pulsating glow effect
        gsap.to(heroGlow, {
            opacity: 0.4,
            scale: 1.1,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // Create a subtle parallax effect on scroll if ScrollTrigger is available
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                gsap.to(heroBackground, {
                    y: self.progress * 150,
                    ease: 'none',
                    duration: 0.1
                });

                if (heroGlow) {
                    gsap.to(heroGlow, {
                        y: self.progress * 100,
                        opacity: 0.8 - (self.progress * 0.8),
                        ease: 'none',
                        duration: 0.1
                    });
                }
            }
        });
    }
}



// Create text animation
function initHeroText() {
    // Get text elements
    const heroCompany = document.getElementById('hero-company');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (!heroCompany || !heroTitle || !heroDesc || !ctaButtons) {
        console.error('Hero text elements not found');
        return;
    }

    // Create a timeline for text animations
    const textTl = gsap.timeline();

    // Animate company name
    textTl.fromTo(heroCompany,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate title
    textTl.fromTo(heroTitle,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.5'
    );

    // Animate description
    textTl.fromTo(heroDesc,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
    );

    // Animate CTA buttons
    textTl.fromTo(ctaButtons,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
    );
}

// Create enhanced particle animation
function initHeroParticles() {
    const particlesContainer = document.querySelector('.hero-particles');

    if (!particlesContainer) {
        console.error('Particles container not found');
        return;
    }

    // Clear any existing particles
    particlesContainer.innerHTML = '';

    // Create more particles for a richer effect
    const particleCount = 120;
    const colors = [
        'rgba(0, 153, 204, 0.7)',  // primaryBlue
        'rgba(0, 102, 153, 0.6)',   // secondaryBlue
        'rgba(102, 204, 255, 0.8)',  // lightBlue
        'rgba(255, 255, 255, 0.5)'   // white for contrast
    ];

    // Create different types of particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Varied sizes for more dynamic look
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position across the entire hero section
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random color with varied opacity
        const colorIndex = Math.floor(Math.random() * colors.length);
        particle.style.backgroundColor = colors[colorIndex];

        // Add blur effect to some particles
        if (Math.random() > 0.7) {
            const blurAmount = Math.random() * 3 + 1;
            particle.style.filter = `blur(${blurAmount}px)`;
        }

        // Add to container
        particlesContainer.appendChild(particle);

        // Create more complex animations
        const timeline = gsap.timeline({
            repeat: -1,
            yoyo: true
        });

        // Enhanced random movement patterns
        const moveX = Math.random() * 200 - 100;
        const moveY = Math.random() * 200 - 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 3;

        // Add scale animation for some particles
        if (Math.random() > 0.5) {
            timeline.to(particle, {
                scale: Math.random() * 1.5 + 0.5,
                duration: Math.random() * 10 + 5,
                ease: 'sine.inOut'
            }, 0);
        }

        // Movement animation
        timeline.to(particle, {
            x: moveX,
            y: moveY,
            opacity: Math.random() * 0.7 + 0.3,
            duration: duration,
            ease: 'sine.inOut',
            delay: delay
        }, 0);

        // Add rotation to some particles
        if (Math.random() > 0.7) {
            timeline.to(particle, {
                rotation: Math.random() * 360,
                duration: Math.random() * 20 + 10,
                ease: 'none'
            }, 0);
        }
    }

    // Add more floating light streaks
    for (let i = 0; i < 20; i++) {
        const streak = document.createElement('div');
        streak.classList.add('particle', 'streak');

        // Create elongated particles
        const width = Math.random() * 50 + 30;
        const height = Math.random() * 2 + 1;
        streak.style.width = `${width}px`;
        streak.style.height = `${height}px`;
        streak.style.borderRadius = '4px';

        // Position offscreen initially
        const posY = Math.random() * 100;
        streak.style.left = '-50px';
        streak.style.top = `${posY}%`;

        // Light blue color with glow
        streak.style.backgroundColor = 'rgba(102, 204, 255, 0.6)';
        streak.style.boxShadow = '0 0 10px 2px rgba(102, 204, 255, 0.3)';

        // Add blur effect
        streak.style.filter = 'blur(1px)';

        // Add to container
        particlesContainer.appendChild(streak);

        // Animate the streak across the screen
        gsap.fromTo(streak,
            { x: -width, opacity: 0 },
            {
                x: window.innerWidth + width,
                opacity: 0.7,
                duration: Math.random() * 10 + 5,
                delay: Math.random() * 5,
                repeat: -1,
                ease: 'power1.inOut',
                onRepeat: () => {
                    // Randomize position on each repeat
                    const newPosY = Math.random() * 100;
                    streak.style.top = `${newPosY}%`;
                }
            }
        );
    }

    // Add special floating particles that move in a more organic way
    for (let i = 0; i < 15; i++) {
        const floater = document.createElement('div');
        floater.classList.add('particle', 'floater');

        // Larger size for these special particles
        const size = Math.random() * 12 + 8;
        floater.style.width = `${size}px`;
        floater.style.height = `${size}px`;

        // Position randomly
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        floater.style.left = `${posX}%`;
        floater.style.top = `${posY}%`;

        // Special styling
        floater.style.backgroundColor = 'rgba(102, 204, 255, 0.2)';
        floater.style.boxShadow = '0 0 20px 5px rgba(102, 204, 255, 0.3)';
        floater.style.filter = 'blur(3px)';

        // Add to container
        particlesContainer.appendChild(floater);

        // Create complex movement pattern using multiple animations
        // First create a timeline for this particle
        const floaterTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: Math.random() * 2
        });

        // Create a random path with multiple points
        const points = [];
        const numPoints = Math.floor(Math.random() * 3) + 3; // 3-5 points

        for (let j = 0; j < numPoints; j++) {
            points.push({
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: Math.random() * 0.5 + 0.2,
                scale: Math.random() * 1 + 0.5
            });
        }

        // Add each point to the timeline
        points.forEach((point, index) => {
            floaterTimeline.to(floater, {
                x: point.x,
                y: point.y,
                opacity: point.opacity,
                scale: point.scale,
                duration: Math.random() * 8 + 4,
                ease: 'sine.inOut'
            });
        });
    }
}

// Scroll indicator function removed



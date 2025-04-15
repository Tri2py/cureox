// GSAP Animations for CureOx Website - Octopus Style
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Create a master timeline for coordinated animations
    const masterTimeline = gsap.timeline();

    // Initialize animations in sequence
    initPreloaderAnimation(masterTimeline);
    initHeaderAnimation(masterTimeline);
    initHeroAnimation(masterTimeline);
    initSectionAnimations();
    initElementAnimations();
    initHoverAnimations();
    initScrollAnimations();
    initParallaxEffects();
});

// Preloader Animation - Octopus Style
function initPreloaderAnimation(masterTimeline) {
    const preloader = document.querySelector('.preloader');

    if (preloader) {
        // Create a timeline for the preloader
        const preloaderTl = gsap.timeline({
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });

        // Animate the loader with a pulsing effect
        preloaderTl
            .to('.loader', {
                duration: 0.8,
                scale: 1.2,
                repeat: 1,
                yoyo: true,
                ease: 'power2.inOut'
            })
            .to(preloader, {
                duration: 0.5,
                opacity: 0,
                ease: 'power2.inOut'
            });

        // Add to master timeline
        masterTimeline.add(preloaderTl);
    }
}

// Header Animation - Octopus Style
function initHeaderAnimation(masterTimeline) {
    // Animate header on scroll
    const header = document.querySelector('header');

    // Create a sticky header effect
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '100 top',
        onEnter: () => header.classList.add('sticky'),
        onLeaveBack: () => header.classList.remove('sticky')
    });

    // Create a header animation timeline
    const headerTl = gsap.timeline();

    // Animate logo with a bounce effect
    headerTl.from('.logo h1', {
        duration: 1.2,
        y: -80,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'all'
    });

    // Animate navigation items with a staggered effect
    headerTl.from('nav ul li', {
        duration: 0.8,
        y: -40,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        clearProps: 'all'
    }, '-=0.6');

    // Add to master timeline
    masterTimeline.add(headerTl, '+=0.2');

    // Add hover animation for nav items
    const navItems = document.querySelectorAll('nav ul li a');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                y: -3,
                color: 'var(--accent-color)',
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                y: 0,
                color: item.classList.contains('active') ? 'var(--primary-color)' : 'var(--text-color)',
                ease: 'power2.out'
            });
        });
    });
}

// Hero Section Animation - Octopus Style
function initHeroAnimation(masterTimeline) {
    // Create a hero animation timeline
    const heroTl = gsap.timeline();

    // First, animate the background with a reveal effect
    heroTl.fromTo('.hero',
        {
            scale: 1.05,
            filter: 'brightness(0.8) blur(5px)'
        },
        {
            scale: 1,
            filter: 'brightness(1) blur(0px)',
            duration: 1.8,
            ease: 'power2.out'
        }
    );

    // Split text animation for the main heading
    // First, we'll animate the entire heading for simplicity
    heroTl.from('.hero-content h2', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    }, '-=1.4');

    // Animate the description with a slight delay
    heroTl.from('.hero-content p', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.7');

    // Animate the CTA buttons with a bounce effect
    heroTl.from('.cta-buttons .btn', {
        duration: 0.7,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // Add to master timeline
    masterTimeline.add(heroTl, '-=0.2');

    // Add a subtle floating effect to the hero content
    gsap.to('.hero-content', {
        y: '-15px',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });

    // Add a parallax effect to the hero background
    gsap.to('.hero', {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        }
    });

    // Add a subtle scale effect to the hero on scroll
    gsap.to('.hero', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Section Animations - Octopus Style
function initSectionAnimations() {
    // About section animation with reveal from bottom
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    aboutTl
        .from('.section-header', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.about-text', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.about-image', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.6');

    // Services section animation with staggered cards
    const servicesTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.services',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    servicesTl
        .from('.services .section-header', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.service-card', {
            duration: 0.8,
            y: 80,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.2)'
        }, '-=0.4');

    // Products section animation with reveal effect
    const productsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.products',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    productsTl
        .from('.products .section-header', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.product-card', {
            duration: 0.9,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power4.out'
        }, '-=0.4');

    // Why Us section animation with side entrance
    const whyUsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.why-us',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    whyUsTl
        .from('.why-us .section-header', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.why-us-point', {
            duration: 0.8,
            x: -50,
            opacity: 0,
            stagger: 0.15,
            ease: 'power2.out'
        }, '-=0.4');

    // Process section animation with counter effect
    const processTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.process',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    processTl
        .from('.process .section-header', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.process-step', {
            duration: 0.8,
            y: 70,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.2)'
        }, '-=0.4')
        .from('.step-number', {
            textContent: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            snap: { textContent: 1 },
            stagger: 0.2
        }, '-=1');

    // Add advanced 3D cube animations and particle effects
    const processSteps = document.querySelectorAll('.process-step');

    processSteps.forEach(step => {
        const cube = step.querySelector('.cube');
        const particlesContainer = step.querySelector('.particles-container');

        // Create particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particlesContainer.appendChild(particle);

            // Set initial position
            gsap.set(particle, {
                x: gsap.utils.random(0, 100, 1) + '%',
                y: gsap.utils.random(0, 100, 1) + '%',
                scale: gsap.utils.random(0.5, 1.5, 0.1)
            });
        }

        // Create a timeline for the hover animation
        const hoverTl = gsap.timeline({ paused: true });

        // Add cube rotation with slight bounce
        hoverTl.to(cube, {
            duration: 0.8,
            rotateY: 180,
            ease: 'back.out(1.7)'
        }, 0);

        // Add card animation
        hoverTl.to(step, {
            duration: 0.5,
            y: -15,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(102, 204, 255, 0.3)',
            ease: 'power2.out'
        }, 0);

        // Add particle animations
        const particles = particlesContainer.querySelectorAll('.particle');

        particles.forEach((particle, index) => {
            // Randomize particle animations
            const delay = index * 0.04;
            const duration = gsap.utils.random(1, 2, 0.1);
            const distance = gsap.utils.random(20, 80);
            const direction = gsap.utils.random(0, 360);
            const radians = direction * Math.PI / 180;

            // Calculate end position based on direction
            const endX = Math.cos(radians) * distance;
            const endY = Math.sin(radians) * distance;

            // Add to timeline
            hoverTl.to(particle, {
                duration: duration,
                x: `+=${endX}`,
                y: `+=${endY}`,
                opacity: 1,
                scale: 0,
                ease: 'power1.out'
            }, delay);
        });

        // Add 3D perspective tilt effect
        step.addEventListener('mousemove', (e) => {
            if (!step.classList.contains('active')) return;

            const rect = step.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
            const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees

            // Apply rotation to the cube
            gsap.to(cube, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: 180 + rotateY, // Add to the base 180 rotation
                ease: 'power2.out'
            });
        });

        // Hover events
        step.addEventListener('mouseenter', () => {
            step.classList.add('active');
            hoverTl.play();

            // Reset particles for reuse
            particles.forEach(particle => {
                gsap.set(particle, {
                    x: gsap.utils.random(0, 100, 1) + '%',
                    y: gsap.utils.random(0, 100, 1) + '%',
                    opacity: 0,
                    scale: gsap.utils.random(0.5, 1.5, 0.1)
                });
            });
        });

        step.addEventListener('mouseleave', () => {
            step.classList.remove('active');

            // Reset cube rotation
            gsap.to(cube, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                ease: 'power2.out'
            });

            // Reset card
            gsap.to(step, {
                duration: 0.5,
                y: 0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                ease: 'power2.out'
            });
        });

        // Add click interaction
        step.addEventListener('click', () => {
            // Create a special animation for click
            gsap.to(cube, {
                duration: 0.2,
                scale: 0.9,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(cube, {
                        duration: 0.6,
                        scale: 1,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
            });

            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(102, 204, 255, 0.3)';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            step.appendChild(ripple);

            gsap.to(ripple, {
                duration: 0.8,
                scale: 10,
                opacity: 0,
                ease: 'power2.out',
                onComplete: () => {
                    ripple.remove();
                }
            });
        });
    });
}

// Element Animations - Octopus Style
function initElementAnimations() {
    // Animate icons with bounce effect
    gsap.utils.toArray('.icon-container').forEach(icon => {
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            duration: 1.2,
            scale: 0,
            opacity: 0,
            ease: 'elastic.out(1, 0.3)',
            rotation: -30
        });
    });

    // Animate all images with a reveal effect
    gsap.utils.toArray('img').forEach(img => {
        if (!img.closest('.preloader')) { // Skip preloader images
            gsap.from(img, {
                scrollTrigger: {
                    trigger: img,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                scale: 0.9,
                opacity: 0,
                y: 30,
                ease: 'power3.out'
            });
        }
    });

    // Add a subtle pulse animation to important elements
    gsap.utils.toArray('.btn-primary, .step-number').forEach(element => {
        gsap.to(element, {
            boxShadow: '0 0 15px rgba(0, 102, 204, 0.5)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

// Parallax Effects - Octopus Style
function initParallaxEffects() {
    // Parallax effect for background elements
    gsap.utils.toArray('.about, .services, .products, .why-us, .process').forEach(section => {
        gsap.to(section, {
            backgroundPositionY: '30%',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
            }
        });
    });

    // Parallax effect for section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.to(header, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: header.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
            }
        });
    });
}

// Hover Animations - Octopus Style
function initHoverAnimations() {
    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Track if card is in hover state
        let isHovered = false;

        // Function to reset card to original position
        const resetCard = () => {
            gsap.to(card, {
                duration: 0.4,
                y: 0,
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.service-icon i'), {
                duration: 0.4,
                color: 'var(--primary-color)',
                scale: 1,
                ease: 'power2.out'
            });

            isHovered = false;
        };

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.4,
                y: -15,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.service-icon i'), {
                duration: 0.4,
                color: 'var(--accent-color)',
                scale: 1.2,
                rotation: 10,
                ease: 'power2.out'
            });

            isHovered = true;
        });

        card.addEventListener('mouseleave', resetCard);

        // Add click event to reset the card position
        card.addEventListener('click', () => {
            if (isHovered) {
                resetCard();
            }
        });
    });

    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        // Track if card is in hover state
        let isHovered = false;

        // Function to reset card to original position
        const resetCard = () => {
            gsap.to(card, {
                duration: 0.4,
                y: 0,
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.btn-outline'), {
                duration: 0.4,
                backgroundColor: 'transparent',
                color: 'var(--primary-color)',
                scale: 1,
                ease: 'power2.out'
            });

            isHovered = false;
        };

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.4,
                y: -15,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                ease: 'power2.out'
            });

            gsap.to(card.querySelector('.btn-outline'), {
                duration: 0.4,
                backgroundColor: 'var(--primary-color)',
                color: '#ffffff',
                scale: 1.05,
                ease: 'power2.out'
            });

            isHovered = true;
        });

        card.addEventListener('mouseleave', resetCard);

        // Add click event to reset the card position
        card.addEventListener('click', (e) => {
            // Don't reset if clicking on the button
            if (e.target.closest('.btn')) return;

            if (isHovered) {
                resetCard();
            }
        });
    });

    // Button hover effects with magnetic effect
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Create a container for the button to track mouse position
        const bounds = button.getBoundingClientRect();
        const buttonWidth = bounds.width;
        const buttonHeight = bounds.height;

        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mousemove', (e) => {
            const x = e.clientX - bounds.left - buttonWidth / 2;
            const y = e.clientY - bounds.top - buttonHeight / 2;

            // Magnetic effect - subtle movement following the cursor
            gsap.to(button, {
                duration: 0.3,
                x: x * 0.1,
                y: y * 0.1,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.5,
                scale: 1,
                x: 0,
                y: 0,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// Scroll Animations - Octopus Style
function initScrollAnimations() {
    // Smooth scrolling with GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Create a flash effect on the target section
                gsap.fromTo(targetElement,
                    { backgroundColor: 'rgba(0, 102, 204, 0.1)' },
                    {
                        backgroundColor: 'rgba(0, 102, 204, 0)',
                        duration: 1.5,
                        ease: 'power2.inOut'
                    }
                );

                // Smooth scroll to the target
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power4.inOut'
                });

                // Update active link
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Back to top button animation
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        // Add a pulsing animation to the back to top button
        gsap.to(backToTop, {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();

            // Animate scroll to top with a bounce effect
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: 0
                },
                ease: 'back.out(1.2)'
            });
        });

        // Show/hide back to top button with a fade effect
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -300',
            end: '+=300',
            onEnter: () => {
                gsap.to(backToTop, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(backToTop, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    // Add scroll progress indicator
    gsap.to('body', {
        '--scroll-progress': 1,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        }
    });
}

// Custom Cursor Animation - Octopus Style
function initCursorAnimation() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        // Set initial position off-screen
        gsap.set([cursorDot, cursorOutline], {
            x: -100,
            y: -100
        });

        // Update cursor position on mouse move
        document.addEventListener('mousemove', (e) => {
            // Animate the dot to follow cursor exactly
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power1.out'
            });

            // Animate the outline to follow with a slight delay
            gsap.to(cursorOutline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        // Scale effect on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .product-card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursorOutline, {
                    scale: 1.5,
                    opacity: 0.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(cursorDot, {
                    scale: 0.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to([cursorOutline, cursorDot], {
                    scale: 1,
                    opacity: cursorOutline === cursorDot ? 0.7 : 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Hide cursor when leaving the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                gsap.to([cursorDot, cursorOutline], {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        document.addEventListener('mouseover', () => {
            gsap.to(cursorDot, {
                opacity: 0.7,
                duration: 0.3,
                ease: 'power2.out'
            });

            gsap.to(cursorOutline, {
                opacity: 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

// Call this function when the page is loaded
window.addEventListener('load', function() {
    // The preloader is now handled by the initPreloaderAnimation function
    // which is called from the master timeline

    // Initialize custom cursor
    initCursorAnimation();
});

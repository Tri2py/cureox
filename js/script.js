// Get saved language preference or default to English
let currentLang = localStorage.getItem('preferredLanguage') || 'en';

// Set initial HTML direction based on saved language
document.addEventListener('DOMContentLoaded', function() {
    // Set initial direction based on saved language
    if (currentLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader
    const preloader = document.querySelector('.preloader');

    // Log the current language from localStorage
    console.log('Current language from localStorage: ' + currentLang);

    // Initialize language switcher
    initLanguageSwitcher();

    // Initialize mobile menu
    initMobileMenu();

    // Update placeholders for input fields
    updatePlaceholders();

    // Hide preloader immediately
    if (preloader) {
        // Hide preloader after a short delay
        setTimeout(function() {
            preloader.classList.add('fade-out');

            // Remove preloader from DOM after animation completes
            setTimeout(function() {
                preloader.style.display = 'none';

                // Initialize product cards animation
                initProductCards();

                // Trigger scroll event to check for visible elements
                window.dispatchEvent(new Event('scroll'));
            }, 500);
        }, 500);
    }
});

// Initialize mobile menu
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle && nav && menuOverlay) {
        // Toggle menu on hamburger click
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on the overlay
        menuOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });

        // Close menu when clicking on a menu link
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active link
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Variables to track scroll position
let lastScrollTop = 0;
let scrollDirection = 'none';

// Sticky Header and Scroll Effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    const scrollPosition = window.scrollY;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Determine scroll direction
    if (currentScrollTop > lastScrollTop) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }

    // Save the current scroll position
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

    // Toggle sticky header and hide/show based on scroll direction
    if (scrollPosition > 100) {
        header.classList.add('sticky');

        // Hide header when scrolling down, show when scrolling up
        if (scrollDirection === 'down') {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
    } else {
        header.classList.remove('sticky');
        header.classList.remove('header-hidden');
    }

    // Toggle back to top button
    if (scrollPosition > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Check for product cards in view
    checkProductCardsInView();
});

// Initialize product cards
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        // Add hover effect for buttons
        card.addEventListener('mouseenter', function() {
            const btn = this.querySelector('.btn-outline');
            if (btn) {
                btn.style.animation = 'pulse 1s infinite';
            }
        });

        card.addEventListener('mouseleave', function() {
            const btn = this.querySelector('.btn-outline');
            if (btn) {
                btn.style.animation = '';
            }
        });

        // Make product cards clickable
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on the button
            if (e.target.closest('.btn')) return;

            // Find the product link and navigate to it
            const productLink = this.querySelector('.btn');
            if (productLink) {
                window.location.href = productLink.getAttribute('href');
            }
        });
    });
}

// Check if product cards are in view
function checkProductCardsInView() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (cardPosition < screenPosition) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200); // Staggered animation
        }
    });
}

// Back to Top Button Click Event
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize language switcher
function initLanguageSwitcher() {
    const languageSwitch = document.getElementById('language-switch');

    if (languageSwitch) {
        // Set title based on current language
        languageSwitch.setAttribute('title', currentLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');

        // Add click event listener
        languageSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage();
        });

        // Apply translations based on saved language preference
        applyTranslations();
    }
}

// Toggle between languages
function toggleLanguage() {
    // Switch language
    currentLang = currentLang === 'en' ? 'ar' : 'en';

    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', currentLang);

    // Update HTML direction attribute
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);

    // Update language button title
    const languageSwitch = document.getElementById('language-switch');
    if (languageSwitch) {
        languageSwitch.setAttribute('title', currentLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }

    // Apply translations
    applyTranslations();

    console.log('Language preference saved: ' + currentLang);
}

// Apply translations based on current language
function applyTranslations() {
    // Check if translations object exists
    if (typeof translations === 'undefined' || !translations[currentLang]) {
        console.error('Translations not found!');
        return;
    }

    // Debug: Log current language and hero content elements
    console.log('Current language:', currentLang);
    console.log('Pharmacy hero title element:', document.getElementById('pharmacy-hero-title'));
    console.log('Dentist hero title element:', document.getElementById('dentist-hero-title'));
    console.log('Doctor hero title element:', document.getElementById('doctor-hero-title'));

    const elements = {
        // Navigation
        'nav-home': translations[currentLang].home,
        'nav-about': translations[currentLang].about,
        'nav-services': translations[currentLang].services,
        'nav-projects': translations[currentLang].projects,
        'nav-why-us': translations[currentLang].whyUs,
        'nav-process': translations[currentLang].process,

        // Hero section
        'hero-title': translations[currentLang].heroTitle,
        'hero-desc': translations[currentLang].heroDesc,
        'learn-more': translations[currentLang].learnMore,
        'lets-talk': translations[currentLang].letsTalk,

        // About section
        'about-us': translations[currentLang].aboutUs,
        'about-title': translations[currentLang].aboutTitle,
        'about-desc': translations[currentLang].aboutDesc,

        // Why Us section
        'why-us-title': translations[currentLang].whyUsTitle,
        'why-us-subtitle': translations[currentLang].whyUsSubtitle,
        'why-us-point1': translations[currentLang].whyUsPoint1,
        'why-us-point2': translations[currentLang].whyUsPoint2,
        'why-us-point3': translations[currentLang].whyUsPoint3,
        'why-us-point4': translations[currentLang].whyUsPoint4,
        'why-us-point5': translations[currentLang].whyUsPoint5,
        'why-us-point1-desc': translations[currentLang].whyUsPoint1,
        'why-us-point2-desc': translations[currentLang].whyUsPoint2,
        'why-us-point3-desc': translations[currentLang].whyUsPoint3,
        'why-us-point4-desc': translations[currentLang].whyUsPoint4,
        'why-us-point5-desc': translations[currentLang].whyUsPoint5,

        // Services section
        'our-services': translations[currentLang].ourServices,
        'services-title': translations[currentLang].servicesTitle,
        'service1-title': translations[currentLang].service1Title,
        'service1-desc': translations[currentLang].service1Desc,
        'service2-title': translations[currentLang].service2Title,
        'service2-desc': translations[currentLang].service2Desc,
        'service3-title': translations[currentLang].service3Title,
        'service3-desc': translations[currentLang].service3Desc,

        'service5-title': translations[currentLang].service5Title,
        'service5-desc': translations[currentLang].service5Desc,

        // Products section
        'our-products': translations[currentLang].ourProducts,
        'products-title': translations[currentLang].productsTitle,
        'products-desc': translations[currentLang].productsDesc,
        'product1-title': translations[currentLang].product1Title,
        'product1-desc': translations[currentLang].product1Desc,
        'product2-title': translations[currentLang].product2Title,
        'product2-desc': translations[currentLang].product2Desc,
        'product3-title': translations[currentLang].product3Title,
        'product3-desc': translations[currentLang].product3Desc,
        'see-product1': translations[currentLang].seeProduct,
        'see-product2': translations[currentLang].seeProduct,
        'see-product3': translations[currentLang].seeProduct,

        // Process section
        'our-process': translations[currentLang].ourProcess,
        'process-title': translations[currentLang].processTitle,
        'process1-title': translations[currentLang].process1Title,
        'process1-desc': translations[currentLang].process1Desc,
        'process2-title': translations[currentLang].process2Title,
        'process2-desc': translations[currentLang].process2Desc,
        'process3-title': translations[currentLang].process3Title,
        'process3-desc': translations[currentLang].process3Desc,
        'process4-title': translations[currentLang].process4Title,
        'process4-desc': translations[currentLang].process4Desc,

        // Footer
        'best-software': translations[currentLang].bestSoftware,
        'footer-home': translations[currentLang].home,
        'privacy-policy': translations[currentLang].privacyPolicy,
        'terms-conditions': translations[currentLang].termsConditions,
        'copyright': translations[currentLang].copyright,

        // Preloader
        'loading-text': translations[currentLang].loadingText,

        // Product Detail Pages
        'product-overview': translations[currentLang].productOverview,
        'key-features': translations[currentLang].keyFeatures,
        'system-requirements': translations[currentLang].systemRequirements,
        'hardware': translations[currentLang].hardware,
        'software': translations[currentLang].software,
        'users': translations[currentLang].users,
        'updates': translations[currentLang].updates,
        'support': translations[currentLang].support,
        'mobile-app': translations[currentLang].mobileApp,
        'related-products': translations[currentLang].relatedProducts,
        'request-demo': translations[currentLang].requestDemo,
        'download-brochure': translations[currentLang].downloadBrochure,

        // Determine which product page we're on
        'product-title': window.location.pathname.includes('product1.html') ? translations[currentLang].productTitle1 :
                         window.location.pathname.includes('product2.html') ? translations[currentLang].productTitle2 :
                         window.location.pathname.includes('product3.html') ? translations[currentLang].productTitle3 : '',
        'product-tagline': window.location.pathname.includes('product1.html') ? translations[currentLang].productTagline1 :
                           window.location.pathname.includes('product2.html') ? translations[currentLang].productTagline2 :
                           window.location.pathname.includes('product3.html') ? translations[currentLang].productTagline3 : '',
        'product-price': window.location.pathname.includes('product1.html') ? translations[currentLang].productPrice1 :
                         window.location.pathname.includes('product2.html') ? translations[currentLang].productPrice2 :
                         window.location.pathname.includes('product3.html') ? translations[currentLang].productPrice3 : '',
        'price-period': translations[currentLang].pricePeriod,
        'product-reviews': window.location.pathname.includes('product1.html') ? translations[currentLang].productReviews1 :
                           window.location.pathname.includes('product2.html') ? translations[currentLang].productReviews2 :
                           window.location.pathname.includes('product3.html') ? translations[currentLang].productReviews3 : '',
        'product-overview-text': window.location.pathname.includes('product1.html') ? translations[currentLang].productOverviewText1 :
                                 window.location.pathname.includes('product2.html') ? translations[currentLang].productOverviewText2 :
                                 window.location.pathname.includes('product3.html') ? translations[currentLang].productOverviewText3 : '',

        // Related Products Titles
        'related-product1-title': translations[currentLang].productTitle1,
        'related-product2-title': translations[currentLang].productTitle2,
        'related-product3-title': translations[currentLang].productTitle3,

        // Buy Now Button
        'buy-now': translations[currentLang].buyNow,

        // Product Hero Content
        'pharmacy-hero-title': translations[currentLang].pharmacyHeroTitle,
        'pharmacy-hero-desc': translations[currentLang].pharmacyHeroDesc,
        'dentist-hero-title': translations[currentLang].dentistHeroTitle,
        'dentist-hero-desc': translations[currentLang].dentistHeroDesc,
        'doctor-hero-title': translations[currentLang].doctorHeroTitle,
        'doctor-hero-desc': translations[currentLang].doctorHeroDesc,

        // Login Page
        'login-title': translations[currentLang].loginTitle,
        'login-subtitle': translations[currentLang].loginSubtitle,
        'email-label': translations[currentLang].emailLabel,
        'password-label': translations[currentLang].passwordLabel,
        'remember-label': translations[currentLang].rememberLabel,
        'forgot-password': translations[currentLang].forgotPassword,
        'login-button': translations[currentLang].loginButton,
        'no-account': translations[currentLang].noAccount,
        'register-link': translations[currentLang].registerLink,

        // Register Page
        'register-title': translations[currentLang].registerTitle,
        'register-subtitle': translations[currentLang].registerSubtitle,
        'name-label': translations[currentLang].nameLabel,
        'confirm-password-label': translations[currentLang].confirmPasswordLabel,
        'terms-label': translations[currentLang].termsLabel,
        'register-button': translations[currentLang].registerButton,
        'have-account': translations[currentLang].haveAccount,
        'login-link': translations[currentLang].loginLink
    };

    // Apply translations to all elements
    for (const [id, text] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            console.log(`Translating element with id ${id} to: ${text}`);
            element.textContent = text;
        } else if (id.includes('hero')) {
            console.log(`Hero element with id ${id} not found`);
        }
    }

    // Directly try to translate hero elements
    const heroElements = {
        'pharmacy-hero-title': document.getElementById('pharmacy-hero-title'),
        'pharmacy-hero-desc': document.getElementById('pharmacy-hero-desc'),
        'dentist-hero-title': document.getElementById('dentist-hero-title'),
        'dentist-hero-desc': document.getElementById('dentist-hero-desc'),
        'doctor-hero-title': document.getElementById('doctor-hero-title'),
        'doctor-hero-desc': document.getElementById('doctor-hero-desc')
    };

    for (const [id, element] of Object.entries(heroElements)) {
        if (element) {
            console.log(`Found hero element: ${id}`);
            if (id === 'pharmacy-hero-title') element.textContent = translations[currentLang].pharmacyHeroTitle;
            if (id === 'pharmacy-hero-desc') element.textContent = translations[currentLang].pharmacyHeroDesc;
            if (id === 'dentist-hero-title') element.textContent = translations[currentLang].dentistHeroTitle;
            if (id === 'dentist-hero-desc') element.textContent = translations[currentLang].dentistHeroDesc;
            if (id === 'doctor-hero-title') element.textContent = translations[currentLang].doctorHeroTitle;
            if (id === 'doctor-hero-desc') element.textContent = translations[currentLang].doctorHeroDesc;
        }
    }

    // Update placeholders for input fields
    updatePlaceholders();

    console.log('Language switched to: ' + currentLang);
}

// Function to update placeholders based on current language
function updatePlaceholders() {
    // Login page placeholders
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Register page placeholders
    const nameInput = document.getElementById('name');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (emailInput) {
        emailInput.placeholder = translations[currentLang].emailPlaceholder;
    }

    if (passwordInput) {
        passwordInput.placeholder = translations[currentLang].passwordPlaceholder;
    }

    if (nameInput) {
        nameInput.placeholder = translations[currentLang].namePlaceholder;
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.placeholder = translations[currentLang].confirmPasswordPlaceholder;
    }

    // If we're on the register page, update the password input placeholder
    if (window.location.pathname.includes('register.html') && passwordInput) {
        passwordInput.placeholder = translations[currentLang].createPasswordPlaceholder;
    }
}

// Initialize product hero translation
function initProductHeroTranslation() {
    // Check if we're on a product page
    const isProduct1 = window.location.pathname.includes('product1.html');
    const isProduct2 = window.location.pathname.includes('product2.html');
    const isProduct3 = window.location.pathname.includes('product3.html');

    if (isProduct1 || isProduct2 || isProduct3) {
        console.log('Product page detected, initializing hero translation');

        // Get the current language
        const lang = localStorage.getItem('preferredLanguage') || 'en';

        // Apply translations based on the product page
        if (isProduct1) {
            const heroTitle = document.getElementById('pharmacy-hero-title');
            const heroDesc = document.getElementById('pharmacy-hero-desc');

            if (heroTitle && translations[lang].pharmacyHeroTitle) {
                heroTitle.textContent = translations[lang].pharmacyHeroTitle;
            }

            if (heroDesc && translations[lang].pharmacyHeroDesc) {
                heroDesc.textContent = translations[lang].pharmacyHeroDesc;
            }
        } else if (isProduct2) {
            const heroTitle = document.getElementById('dentist-hero-title');
            const heroDesc = document.getElementById('dentist-hero-desc');

            if (heroTitle && translations[lang].dentistHeroTitle) {
                heroTitle.textContent = translations[lang].dentistHeroTitle;
            }

            if (heroDesc && translations[lang].dentistHeroDesc) {
                heroDesc.textContent = translations[lang].dentistHeroDesc;
            }
        } else if (isProduct3) {
            const heroTitle = document.getElementById('doctor-hero-title');
            const heroDesc = document.getElementById('doctor-hero-desc');

            if (heroTitle && translations[lang].doctorHeroTitle) {
                heroTitle.textContent = translations[lang].doctorHeroTitle;
            }

            if (heroDesc && translations[lang].doctorHeroDesc) {
                heroDesc.textContent = translations[lang].doctorHeroDesc;
            }
        }
    }
}

// Call the initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProductHeroTranslation();
});

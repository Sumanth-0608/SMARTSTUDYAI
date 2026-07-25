// ===== DARK MODE TOGGLE =====
const toggleBtn = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
}

const el = document.getElementById("YOUR_ID");

if (el) {
    el.addEventListener("click", function () {
        // your logic
    });
}

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    // Animate navbar links on load
    gsap.from('.nav-links li', {
        duration: 0.6,
        opacity: 0,
        y: -20,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Animate auth section
    gsap.from('.auth-section', {
        duration: 0.6,
        opacity: 0,
        x: 30,
        ease: 'power2.out'
    });
});

// ===== CARD HOVER EFFECTS =====
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.4,
            y: -15,
            boxShadow: '0 25px 50px rgba(0, 242, 255, 0.2)',
            ease: 'power2.out'
        });
        
        gsap.to(this.querySelector('.card-icon'), {
            duration: 0.6,
            rotation: 10,
            scale: 1.1,
            ease: 'elastic.out(1, 0.5)'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.4,
            y: 0,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            ease: 'power2.out'
        });

        gsap.to(this.querySelector('.card-icon'), {
            duration: 0.4,
            rotation: 0,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            gsap.from(entry.target, {
                duration: 0.6,
                opacity: 0,
                y: 30,
                ease: 'power2.out'
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.card, .history-item, .output').forEach(el => {
    observer.observe(el);
});

// ===== FORM INPUT ANIMATIONS =====
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: '0 0 20px rgba(0, 242, 255, 0.2)',
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: 'none',
            ease: 'power2.out'
        });
    });
});

// ===== FLOATING PARTICLES BACKGROUND =====
function createParticles() {
    const hero = document.querySelector('.hero');
    if(!hero) return;

    const particleCount = 20;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 242, 255, ${Math.random() * 0.5});
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        hero.appendChild(particle);

        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            y: -Math.random() * 100 - 50,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            repeat: -1,
            ease: 'power1.inOut'
        });
    }
}

createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
    gsap.to(element, {
        duration: 2,
        innerHTML: Math.floor(target),
        snap: { innerHTML: 1 },
        ease: 'power2.out'
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ===== MOBILE MENU ANIMATION =====
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const isMobile = window.innerWidth < 768;
    
    if(isMobile && navLinks) {
        navLinks.style.maxHeight = '0';
        navLinks.style.overflow = 'hidden';
        navLinks.style.transition = 'max-height 0.3s ease';
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// ===== KEYBOARD ANIMATIONS =====
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && e.target.tagName === 'TEXTAREA') {
        e.target.style.borderColor = 'rgba(0, 242, 255, 0.6)';
    }
});

// ===== NOTIFICATION ANIMATION =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        z-index: 9999;
        font-weight: 600;
        ${type === 'success' ? 'background: linear-gradient(135deg, #00f2ff, #00ff88);' : 'background: linear-gradient(135deg, #ff6b6b, #ff9800);'}
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    gsap.from(notification, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        ease: 'power2.out'
    });

    gsap.to(notification, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        delay: 3
    });

    setTimeout(() => notification.remove(), 3400);
}

// ===== TEXT GRADIENT ANIMATION =====
function animateGradientText() {
    const gradientTexts = document.querySelectorAll('.hero-title');
    
    gradientTexts.forEach(text => {
        gsap.to(text, {
            duration: 3,
            backgroundPosition: '200% center',
            repeat: -1,
            ease: 'none'
        });
    });
}

window.addEventListener('load', animateGradientText);

// ===== LAZY LOAD IMAGES =====
const images = document.querySelectorAll('img[data-src]');

if('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

console.log('Script loaded successfully with GSAP animations!');

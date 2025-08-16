document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    updateCopyrightYear();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Initialize Experience Slider
    initExperienceSlider();
});

/* ===== NAVIGATION ===== */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('scroll', throttle(() => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        const navbar = document.querySelector('.cyber-nav');
        if (navbar) {
            navbar.style.background = window.scrollY > 100 ? 
                'rgba(10, 10, 10, 0.95)' : 
                'rgba(10, 10, 10, 0.9)';
        }
    }, 100));
}

/* ===== TYPING ANIMATION ===== */
function initTypingAnimation() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const texts = [
        'Software Engineer',
        'Web Developer',
        'Problem Solver',
        'Code Architect',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deleteSpeed = 50;
    let pauseBetween = 2000;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deleteSpeed;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100 + Math.random() * 50;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = pauseBetween;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    setTimeout(typeWriter, 1000);
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card').forEach(el => {
        observer.observe(el);
    });
}

/* ===== SKILL BARS ===== */
function initSkillBars() {}
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;

    skillBars.forEach(bar => {
        if (bar.dataset.animated === 'true') return;
        
        const targetWidth = bar.getAttribute('data-width') || '0';
        const percentElement = bar.parentElement.querySelector('.skill-percent');
        
        bar.style.width = '0%';
        if (percentElement) percentElement.textContent = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
            
            if (percentElement) {
                let current = 0;
                const target = parseInt(targetWidth);
                const increment = target / 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    percentElement.textContent = Math.round(current) + '%';
                }, 20);
            }
            
            bar.dataset.animated = 'true';
        }, 100);
    });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            form.querySelectorAll('label').forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--ai-text-muted)';
            });
        }, 2000);
    });
}

/* ===== UTILITIES ===== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--ai-bg-dark);
        border: 1px solid ${type === 'success' ? 'var(--ai-primary)' : 'var(--ai-accent)'};
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--ai-text);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: var(--ai-glow);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

/* ===== GLITCH EFFECT ===== */
function addGlitchEffect(element) {
    setInterval(() => {
        if (Math.random() < 0.1) {
            element.style.textShadow = `2px 0 #ff0088, -2px 0 #0088ff, 0 2px #00ff88, 0 -2px #ffaa00`;
            setTimeout(() => {
                element.style.textShadow = 'none';
            }, 100);
        }
    }, 2000);
}
document.querySelectorAll('.glitch, .glitch-text').forEach(addGlitchEffect);

/* ===== EXPERIENCE SLIDER ===== */
function initExperienceSlider() {
    const wrapper = document.getElementById('experienceWrapper');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (!wrapper || !nextBtn || !prevBtn) return;

    const totalCards = document.querySelectorAll('.experience-card').length;
    let index = 0;

    function updateSlide() {
        wrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalCards;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalCards) % totalCards;
        updateSlide();
    });
}

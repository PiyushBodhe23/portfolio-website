 /* Smooth scroll for nav links */
        document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            });
        });

        /* Hamburger menu */
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        /* Close menu on link click (mobile) */
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });

        /* Project modals (demo data) */
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const modal = document.getElementById('projectModal');
                const img = document.getElementById('modalImg');
                const title = document.getElementById('modalTitle');
                const desc = document.getElementById('modalDesc');
                const buttons = document.getElementById('modalButtons');
                const data = card.dataset.modal;
                modal.setAttribute('aria-hidden', 'false');
                modal.style.display = 'block';
                if (data === '1') {
                    img.src = 'https://via.placeholder.com/800x400/00ff88/000?text=UMS+Demo';
                    img.alt = 'UMS Screenshot';
                    title.textContent = 'University Management System';
                    desc.innerHTML = 'Full Java Swing app with MySQL. Features secure login, student/faculty management, attendance &amp; fees. <br><strong>Tech:</strong> Java, Swing, JDBC, MySQL';
                    buttons.innerHTML = '<a href="https://github.com/PiyushBodhe23/University-Management-System" target="_blank" class="cyber-btn" rel="noopener">View Code <i class="fab fa-github"></i></a>';
                } else if (data === '2') {
                    img.src = 'https://via.placeholder.com/800x400/ff00ff/000?text=Stockers+Demo';
                    img.alt = 'Stockers Screenshot';
                    title.textContent = 'Stockers Trading Platform';
                    desc.innerHTML = 'Full-stack MERN trading app with auth, orders, portfolio. <br><strong>Tech:</strong> React, Node/Express, MongoDB, JWT';
                    buttons.innerHTML = '<a href="https://github.com/PiyushBodhe23/Stockers" target="_blank" class="cyber-btn" rel="noopener">View Code <i class="fab fa-github"></i></a>';
                } else {
                    img.src = 'https://via.placeholder.com/800x400/00ff88/000?text=AlgoViz+Demo';
                    img.alt = 'AlgoViz Screenshot';
                    title.textContent = 'AlgoViz';
                    desc.innerHTML = 'AI-powered algorithm visualizer. <br><strong>Tech:</strong> JS, AI integration, Canvas animations';
                    buttons.innerHTML = '<a href="https://github.com/PiyushBodhe23/AI-Powered-Algorithm-Visualizer" target="_blank" class="cyber-btn" rel="noopener">View Code <i class="fab fa-github"></i></a>';
                }
            });
        });

        /* Modal close */
        document.getElementById('modalClose').addEventListener('click', () => {
            document.getElementById('projectModal').style.display = 'none';
            document.getElementById('projectModal').setAttribute('aria-hidden', 'true');
        });
        window.addEventListener('click', e => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
                e.target.setAttribute('aria-hidden', 'true');
            }
        });

        /* Animate skills on scroll */
        const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.progress-fill').forEach(bar => {
                        bar.style.width = bar.style.width || '0%';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-category').forEach(category => observer.observe(category));

        /* Contact form */
        document.getElementById('contactForm').addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const status = document.getElementById('formStatus');
            status.textContent = '✅ Message sent! (Demo - check console for details)';
            status.style.color = 'var(--primary)';
            console.log('Form submitted:', Object.fromEntries(formData));
            e.target.reset();
            setTimeout(() => status.textContent = '', 5000);
        });

        /* Navbar scroll effect */
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10,10,10,0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(26,26,26,0.95)';
            }
        });
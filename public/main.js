// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (hamburger) {
                        const spans = hamburger.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ accordion functionality - SIMPLIFIED
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const toggle = otherItem.querySelector('.faq-toggle');
                        if (toggle) toggle.textContent = '+';
                    }
                });
                
                // Toggle current FAQ item
                const isActive = item.classList.toggle('active');
                const toggle = question.querySelector('.faq-toggle');
                
                if (toggle) {
                    toggle.textContent = isActive ? '-' : '+';
                }
            });
        }
    });
    
    // Form validation and submission
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const formElements = leadForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.hasAttribute('required') && !element.value.trim()) {
                    isValid = false;
                    element.style.borderColor = 'red';
                    
                    // Reset border color on input
                    element.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            }
            
            if (isValid) {
                // Simulate form submission with success message
                const formData = new FormData(leadForm);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // In a real application, you would send this data to your server
                console.log('Form data:', formObject);
                
                // Show success message
                const contactForm = document.querySelector('.contact-form');
                contactForm.innerHTML = `
                    <div class="success-message">
                        <h3>Mensagem enviada com sucesso!</h3>
                        <p>Obrigado pelo seu interesse. Um especialista entrará em contato em breve.</p>
                    </div>
                `;
                
                // Scroll to success message
                window.scrollTo({
                    top: contactForm.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Sticky header on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '16px 0';
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
        
        // Show/hide navbar on scroll up/down
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation class when elements are in viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .case-card, .contact-form, .contact-info');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('fade-in');
            }
        });
    };
    
    // Add CSS class for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.8s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .service-card, .case-card, .contact-form, .contact-info {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Initial check and add scroll event
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}); 
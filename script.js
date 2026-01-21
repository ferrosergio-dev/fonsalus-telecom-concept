// ============================================
// FONSALUS MARITIME TELECOM - MAIN SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Fonsalus Maritime Telecom - Modern Concept Loaded');
    
    // ========== CONFIGURATION ==========
    // Easy to change company settings
    const COMPANY_CONFIG = {
        name: "Fonsalus OÜ",
        email: "fonsalus@gmail.com",
        phone: "+372 512 8089",
        address: "Maritime District 24, 13619 Tallinn, Estonia"
    };
    
    // ========== SLIDER FUNCTIONALITY ==========
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle wrap-around
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Event listeners for slider
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
        hero.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.main-nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ========== LANGUAGE SWITCHER ==========
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // In a real implementation, this would load language files
            console.log(`Language switched to: ${lang}`);
            
            // Show notification
            showNotification(`Language changed to ${lang.toUpperCase()}`, 'success');
        });
    });
    
    // ========== LOGIN MODAL ==========
    const loginBtn = document.getElementById('loginBtn');
    const ctaLoginBtn = document.getElementById('ctaLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalClose = document.getElementById('modalClose');
    
    function openLoginModal() {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLoginModal() {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Open modal from both buttons
    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
    if (ctaLoginBtn) ctaLoginBtn.addEventListener('click', openLoginModal);
    
    // Close modal
    if (modalClose) modalClose.addEventListener('click', closeLoginModal);
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && loginModal.classList.contains('active')) {
            closeLoginModal();
        }
    });
    
    // ========== LOGIN FORM SUBMISSION ==========
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Basic validation
            if (!username || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showNotification('Logging in...', 'info');
            
            // In real implementation, this would be an API call
            setTimeout(() => {
                showNotification('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = 'pages/clients/dashboard.html';
                }, 1500);
            }, 1000);
        });
    }
    
    // ========== SEARCH FUNCTIONALITY ==========
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch(query) {
        if (!query.trim()) {
            showNotification('Please enter a search term', 'warning');
            return;
        }
        
        showNotification(`Searching for: "${query}"`, 'info');
        
        // In real implementation, this would redirect to search results
        setTimeout(() => {
            console.log(`Search performed for: ${query}`);
            // window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
        }, 500);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    max-width: 400px;
                    z-index: 9999;
                    animation: slideInRight 0.3s ease;
                    border-left: 4px solid #1a5f9c;
                }
                .notification-info { border-left-color: #1a5f9c; }
                .notification-success { border-left-color: #2a9d8f; }
                .notification-warning { border-left-color: #f0b90b; }
                .notification-error { border-left-color: #e63946; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .notification-close {
                    background: transparent;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    padding: 0.25rem;
                    margin-left: 1rem;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Add slideOut animation
        if (!document.querySelector('#notification-out-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-out-styles';
            style.textContent = `
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== FORM VALIDATION ==========
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== LAZY LOADING IMAGES ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ========== CURRENT YEAR IN FOOTER ==========
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // ========== INITIALIZATION MESSAGE ==========
    console.log(`
    ========================================
    FONSALUS MARITIME TELECOM CONCEPT
    Version: 1.0.0
    Company: ${COMPANY_CONFIG.name}
    Ready for deployment
    ========================================
    `);
});

// ========== ADDITIONAL UTILITY FUNCTIONS ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

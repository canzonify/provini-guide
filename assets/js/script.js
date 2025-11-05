document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('leadForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Invio in corso...';
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            setTimeout(function() {
                window.location.href = './thank-you.html';
            }, 1500);
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '' && this.checkValidity()) {
                this.style.borderColor = 'var(--color-secondary)';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#ff4444';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-secondary)';
        });
    });
    
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.setCustomValidity('Per favore inserisci un\'email valida');
                this.style.borderColor = '#ff4444';
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
});

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

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

console.log('%c🎤 CanzoniFy ', 'background: #aa4df7; color: #fff; padding: 10px 20px; font-size: 20px; font-weight: bold;');
console.log('%cPer artisti che credono nell\'autenticità, non nei compromessi.', 'color: #f0cb01; font-size: 14px;');
console.log('%c👉 Lavori nel web e ti piace la musica? Scrivici! info@canzonify.com', 'color: #fff; font-size: 12px;');

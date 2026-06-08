// 1. Ambient Mouse Glow Effect
const glow = document.createElement('div');
glow.classList.add('mouse-glow');
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// 3. Scroll Reveal & Skill Bar Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('skill-category')) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%'; 
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// 4. Form Submission Handling with Web3Forms
function handleSubmit(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Sending...';
    btn.style.opacity = '0.7';

    const formData = new FormData(form);
    
    // Access Key Web3Forms kamu
    formData.append("access_key", "9daaf840-5ae0-4563-a5d6-164884743dd3");

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            Swal.fire({
                title: 'Success 🚀',
                text: 'Your message has been sent successfully! I will get back to you soon.',
                icon: 'success',
                background: '#1e293b', 
                color: '#f8fafc', 
                confirmButtonColor: '#10b981' 
            });
            form.reset(); 
        } else {
            Swal.fire({
                title: 'Oops!',
                text: json.message || 'Something went wrong.',
                icon: 'error',
                background: '#1e293b', 
                color: '#f8fafc'
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Network Error',
            text: 'Please check your internet connection.',
            icon: 'error',
            background: '#1e293b', 
            color: '#f8fafc'
        });
    })
    .finally(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
    });
}

// 5. Dynamic Theme Switcher, Animation Trigger & Toast Notification
const themeBubble = document.getElementById('themeBubble');
const themeIcon = document.getElementById('themeIcon');
const toastMessage = document.getElementById('toastMessage');

if (themeBubble && themeIcon && toastMessage) {
    const themes = [
        { id: 'dark', icon: '🌙', name: 'Dark Tech' },
        { id: 'minimalist', icon: '☀️', name: 'Minimalist Light' },
        { id: 'cyberpunk', icon: '⚡', name: 'Cyberpunk Neon' }
    ];

    let currentThemeIndex = localStorage.getItem('savedThemeIndex') ? parseInt(localStorage.getItem('savedThemeIndex')) : 0;
    let toastTimeout;

    function applyTheme(index) {
        const selectedTheme = themes[index];
        document.documentElement.setAttribute('data-theme', selectedTheme.id);
        themeIcon.textContent = selectedTheme.icon;
        localStorage.setItem('savedThemeIndex', index);

        document.body.classList.remove('theme-transitioning');
        void document.body.offsetWidth; // Trik reset animasi
        document.body.classList.add('theme-transitioning');
    }

    function showToast(message) {
        toastMessage.textContent = message;
        toastMessage.classList.add('show');
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastMessage.classList.remove('show');
        }, 2500);
    }

    applyTheme(currentThemeIndex);

    themeBubble.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(currentThemeIndex);
        showToast(`System updated: ${themes[currentThemeIndex].name} Mode applied.`);
    });
}

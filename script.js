// 1. Ambient Mouse Glow Effect
// Creates a soft light effect that follows the user's mouse cursor.
const glow = document.createElement('div');
glow.classList.add('mouse-glow');
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
    // Adjust position based on mouse coordinates
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

// 2. Navbar Scroll Effect (Glassmorphism trigger)
// Adds background blur when the user scrolls down.
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Navbar styling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// 3. Scroll Reveal & Skill Bar Animation
// Uses IntersectionObserver to detect when elements enter the viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger animation when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class to trigger CSS Fade-In effect
            entry.target.classList.add('visible');

            // Trigger Skill Bar animation if the visible element is a skill category
            if (entry.target.classList.contains('skill-category')) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%'; // Triggers CSS width transition
                });
            }
            
            // Stop observing the element once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with the 'fade-in' class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// 4. Form Submission Handling
// Provides interactive response without page reload
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form reload
    
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    // Simple loading effect
    btn.innerHTML = 'Sending...';
    btn.style.opacity = '0.7';

       // Simulate data submission
    setTimeout(() => {
        // Menggunakan SweetAlert2 untuk notifikasi yang modern
        Swal.fire({
            title: 'SUCCSESS🚀',
            text: 'Your message has been sent successfully! I will get back to you soon.',
            icon: 'success',
            background: '#1e293b', // Warna background pop-up (senada dengan tema)
            color: '#f8fafc', // Warna teks
            confirmButtonColor: '#10b981' // Warna tombol hijau
        });
        
        event.target.reset(); // Clear the form
        
        // Restore button to initial state
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
    }, 1500);

}

// 5. Hamburger Menu Toggle (Mobile)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

// Open/Close menu when hamburger icon is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu automatically when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

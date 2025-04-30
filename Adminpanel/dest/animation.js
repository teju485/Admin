
function animateSlideUp() {
    const elementsToAnimate = document.querySelectorAll('.transform.translate-y-2.opacity-0');

    elementsToAnimate.forEach(element => {
        // Reset the initial state in case of a refresh
        element.classList.add('translate-y-2', 'opacity-0');
        element.classList.remove('translate-y-0', 'opacity-100');

        setTimeout(() => {
            element.classList.remove('translate-y-2', 'opacity-0');
            element.classList.add('translate-y-0', 'opacity-100');
        }, 100); // Optional delay
    });
}

// Run the animation on initial load
document.addEventListener('DOMContentLoaded', animateSlideUp);

// Also run the animation on subsequent page loads (including refreshes)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    animateSlideUp();
} else {
    window.addEventListener('load', animateSlideUp);
}
const navlink = document.querySelector(".navlink")
function ontogglemenu(e) {
    e.name = e.name === 'menu' ? 'close' : 'menu'
    navlink.classList.toggle('top-[9%]')
}

const mobileMenu = document.querySelector('.navlink');
const menuIcon = document.querySelector('.fa-bars, [data-feather="menu"]'); // Adjust selector if needed

function toggleMobileMenu(icon) {
    mobileMenu.classList.toggle('translate-y-[-100%]');
    mobileMenu.classList.toggle('translate-y-0');

    // Optional: Toggle the menu icon (e.g., bars to X)
    if (feather) {
        if (icon.getAttribute('data-feather') === 'menu') {
            feather.replace({ name: 'x' });
        } else {
            feather.replace({ name: 'menu' });
        }
    } else if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Initialize Feather icons if you're using them
if (typeof feather !== 'undefined') {
    feather.replace();
}

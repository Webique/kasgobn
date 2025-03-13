// Select Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const overlay = document.createElement('div');
const closeButton = document.createElement('div');

// ✅ Create an overlay div
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// ✅ Create Close Button (for mobile)
closeButton.classList.add('close-button');
closeButton.innerHTML = '&times;';
navLinks.appendChild(closeButton);

// ✅ Toggle Dropdown Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});

// ✅ Close Menu When Clicking Close Button
closeButton.addEventListener('click', closeMenu);

// ✅ Close Menu When Clicking a Navigation Link + Smooth Scroll
navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }

        // ✅ Close the dropdown menu after clicking a link
        closeMenu();
    });
});

// ✅ Close Menu When Clicking Outside the Navbar
overlay.addEventListener('click', closeMenu);

document.addEventListener('click', (e) => {
    if (
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target) &&
        navLinks.classList.contains('active')
    ) {
        closeMenu();
    }
});

// ✅ Function to Close Menu
function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
}

// ✅ Fix for footer, about, and branches section links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }

        closeMenu(); // ✅ Close menu after navigating
    });
});

// ✅ Branch Tabs Logic (Keep Existing Functionality)
const tabs = document.querySelectorAll('.branch-tab');
const maps = document.querySelectorAll('.branch-map');
const infos = document.querySelectorAll('.branch-info');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        maps.forEach(m => m.classList.remove('active'));
        infos.forEach(i => i.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.branch).classList.add('active');
        document.getElementById(`${tab.dataset.branch}-info`).classList.add('active');
    });
});

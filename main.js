// // Hamburger Menu Toggle
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('active');
//     navLinks.classList.toggle('active');

//     // Animate hamburger
//     const spans = hamburger.querySelectorAll('span');
//     spans[0].style.transform = hamburger.classList.contains('active') 
//         ? 'rotate(45deg) translate(5px, 5px)' 
//         : 'none';
//     spans[1].style.opacity = hamburger.classList.contains('active') ? '0' : '1';
//     spans[2].style.transform = hamburger.classList.contains('active') 
//         ? 'rotate(-45deg) translate(7px, -6px)' 
//         : 'none';
// });

// // Close mobile menu when clicking a link
// document.querySelectorAll('.nav-links a').forEach(link => {
//     link.addEventListener('click', () => {
//         hamburger.classList.remove('active');
//         navLinks.classList.remove('active');
//     });
// });

// // Smooth scroll for navigation links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const href = this.getAttribute('href');
        
//         // Skip empty hash links
//         if (href === '#') return;
        
//         const target = document.querySelector(href);
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth'
//             });
//         }
//     });
// });

"use strict";
// Objective: Handle the theme switcher
function switchTheme() {
    const root = document.documentElement;
    const logo = document.getElementById('siteLogo');
    const currentTheme = root.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // switch the logo based on the theme
    logo.src = newTheme === 'dark' ? '/Assets/images/logo_dark.png' : '/Assets/images/logo_light.png';
    // update the nav icons color
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        if (icon instanceof HTMLElement) {
            icon.style.color = newTheme === 'dark' ? '#f8f9fa' : '#1E3050';
        }
    });
    // get the theme toggle button and card elements
    const themeToggleButton = document.getElementById('themeToggle');
    const aiCards = document.querySelectorAll('.aiCard'); // get all the cards by using class selector
    // set the theme toggle button class and card class based on the new theme
    if (newTheme === 'dark') {
        themeToggleButton.classList.remove('theme-toggle-light');
        themeToggleButton.classList.add('theme-toggle-dark');
        document.getElementById('iconLight').style.display = 'none';
        aiCards.forEach(card => {
            card.classList.remove('card-hover-light');
            card.classList.add('card-hover-dark');
        });
    }
    else {
        themeToggleButton.classList.remove('theme-toggle-dark');
        themeToggleButton.classList.add('theme-toggle-light');
        aiCards.forEach(card => {
            card.classList.remove('card-hover-dark');
            card.classList.add('card-hover-light');
        });
    }
    // switch the theme icon
    document.getElementById('iconLight').style.display = newTheme === 'dark' ? 'block' : 'none';
    document.getElementById('iconDark').style.display = newTheme === 'light' ? 'block' : 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const root = document.documentElement; // Declare the 'root' variable
    const logo = document.getElementById('siteLogo');
    root.setAttribute('data-bs-theme', savedTheme);
    // switch the logo based on the theme
    logo.src = savedTheme === 'dark' ? '/Assets/images/logo_dark.png' : '/Assets/images/logo_light.png';
    // set the theme toggle button class based on the saved theme
    document.getElementById('iconLight').style.display = savedTheme === 'dark' ? 'block' : 'none';
    document.getElementById('iconDark').style.display = savedTheme === 'light' ? 'block' : 'none';
});
document.getElementById('themeToggle').addEventListener('click', switchTheme);
//# sourceMappingURL=app.js.map
"use strict";
// app.js
(function () {
    // Function to update the theme-related elements on the page
    function updateThemeElements(theme) {
        const root = document.documentElement;
        const logo = document.getElementById('siteLogo');
        const themeToggleButton = document.getElementById('themeToggle');
        const aiCards = document.querySelectorAll('.aiCard');
        // Set the theme attribute and store it in localStorage
        root.setAttribute('data-bs-theme', theme);
        // Update the logo based on the theme
        if (logo) {
            logo.src = theme === 'dark' ? '/Assets/images/logo_dark.png' : '/Assets/images/logo_light.png';
        }
        // Update the theme toggle button and card classes
        if (themeToggleButton) {
            themeToggleButton.classList.toggle('theme-toggle-dark', theme === 'dark');
            themeToggleButton.classList.toggle('theme-toggle-light', theme === 'light');
        }
        // Update each card class based on the theme
        aiCards.forEach(card => {
            card.classList.toggle('card-hover-dark', theme === 'dark');
            card.classList.toggle('card-hover-light', theme === 'light');
        });
        // Update the theme icon visibility
        const iconLight = document.getElementById('iconLight');
        const iconDark = document.getElementById('iconDark');
        if (iconLight && iconDark) {
            iconLight.style.display = theme === 'dark' ? 'block' : 'none';
            iconDark.style.display = theme === 'light' ? 'block' : 'none';
        }
    }
    // Function to switch the theme between 'light' and 'dark'
    function switchTheme() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        updateThemeElements(newTheme);
    }
    // Event listener for DOMContentLoaded to apply the saved theme
    document.addEventListener('DOMContentLoaded', () => {
        // Retrieve the saved theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        updateThemeElements(savedTheme); // Apply the saved theme
    });
    // Add click event listener to the theme toggle button
    const themeToggleButton = document.getElementById('themeToggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', switchTheme);
    }
})();
//# sourceMappingURL=app.js.map
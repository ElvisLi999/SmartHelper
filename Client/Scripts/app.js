"use strict";
function switchTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // update the nav icons color
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        if (icon instanceof HTMLElement) {
            icon.style.color = newTheme === 'dark' ? '#f8f9fa' : '#1E3050';
        }
    });
    // get the theme toggle button 
    const themeToggleButton = document.getElementById('themeToggle');
    // set the theme toggle button class based on the new theme
    if (newTheme === 'dark') {
        themeToggleButton.classList.remove('theme-toggle-light');
        themeToggleButton.classList.add('theme-toggle-dark');
    }
    else {
        themeToggleButton.classList.remove('theme-toggle-dark');
        themeToggleButton.classList.add('theme-toggle-light');
    }
    // switch the theme icon
    document.getElementById('iconLight').style.display = newTheme === 'dark' ? 'none' : 'block';
    document.getElementById('iconDark').style.display = newTheme === 'light' ? 'none' : 'block';
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const root = document.documentElement; // Declare the 'root' variable
    root.setAttribute('data-bs-theme', savedTheme);
    // 设置图标状态
    document.getElementById('iconLight').style.display = savedTheme === 'dark' ? 'none' : 'block';
    document.getElementById('iconDark').style.display = savedTheme === 'light' ? 'none' : 'block';
});
document.getElementById('themeToggle').addEventListener('click', switchTheme);
//# sourceMappingURL=app.js.map
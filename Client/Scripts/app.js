"use strict";
function switchTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // 获取切换主题的按钮
    const themeToggleButton = document.getElementById('themeToggle');
    // 根据主题设置按钮的背景色
    if (newTheme === 'dark') {
        themeToggleButton.classList.remove('theme-toggle-light');
        themeToggleButton.classList.add('theme-toggle-dark');
    }
    else {
        themeToggleButton.classList.remove('theme-toggle-dark');
        themeToggleButton.classList.add('theme-toggle-light');
    }
    // 切换图标
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
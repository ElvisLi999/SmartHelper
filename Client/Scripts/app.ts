function switchTheme(theme: string): void {
    const root = document.documentElement;
  
    if (root) {
      root.setAttribute('data-bs-theme', theme);
    }
  }
  
  // Use for loading the saved theme from local storage
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      switchTheme(savedTheme);
    }
  });
  
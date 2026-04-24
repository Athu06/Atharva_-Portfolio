import './style.css';
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const iconSpan = themeToggle ? themeToggle.querySelector('.material-symbols-outlined') : null;

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        if (iconSpan) iconSpan.textContent = 'light_mode';
    } else {
        htmlElement.classList.remove('dark');
        if (iconSpan) iconSpan.textContent = 'dark_mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (iconSpan) {
                iconSpan.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
        });
    }
});

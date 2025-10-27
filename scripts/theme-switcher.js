const themeSwitcher = document.querySelector('.theme-switcher');
const themeSwitcherIcon = document.querySelector('.theme-switcher__icon');
const html = document.documentElement;

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeSwitcherIcon) {
            themeSwitcherIcon.textContent = '☀️';
        }
    } else {
        html.removeAttribute('data-theme');
        if (themeSwitcherIcon) {
            themeSwitcherIcon.textContent = '🌙';
        }
    }
}

function initTheme() {
    html.removeAttribute('data-theme');
    if (themeSwitcherIcon) {
        themeSwitcherIcon.textContent = '🌙';
    }
}

if (themeSwitcher) {
    themeSwitcher.addEventListener('click', toggleTheme);
    
    themeSwitcher.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

initTheme();


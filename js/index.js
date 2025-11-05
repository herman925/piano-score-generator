/**
 * Index/Hero page JavaScript
 * Handles language switching and page translations
 */

// Get current language
let currentLang = getCurrentLanguage();

/**
 * Apply translations to the index page
 */
function applyTranslations() {
    const t = getTranslations(currentLang);
    document.documentElement.lang = currentLang;
    document.title = t.indexTitle;
    document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
    document.getElementById('hero-cta').textContent = t.heroCta;
    document.querySelector('img').alt = t.imgAlt;
    document.getElementById('lang-toggle').textContent = t.langButton;
}

/**
 * Initialize page
 */
function initPage() {
    // Apply initial translations
    applyTranslations();
    
    // Setup language toggle button
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = toggleLanguage();
        applyTranslations();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

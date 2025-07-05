// Set current year and website name in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    const siteNameEl = document.getElementById('websiteName');

    // Set current year
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Set website name from title
    const [beforePipe, afterPipe] = document.title.split('|').map(part => part.trim());
    if (siteNameEl && afterPipe) siteNameEl.textContent = afterPipe;
});

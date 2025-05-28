// sidebar (right sidebar) and (left sidebar) function javascript ending tags 
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');

    // Copy desktop sidebar content to mobile sidebar
    if (leftSidebar && rightSidebar && mobileSidebar) {
        mobileSidebar.innerHTML = leftSidebar.innerHTML + rightSidebar.innerHTML;
    }

    // Toggle mobile sidebar
    menuToggle.addEventListener('click', function () {
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', function () {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });
});
// sidebar (right sidebar) and (left sidebar) function javascript ending tags 







document.addEventListener("DOMContentLoaded", function () {
    // var navbar = document.getElementById("subtopnav");

    // Make the navbar fixed on scroll smoothly ================================
    // window.addEventListener("scroll", function () {
    //     if (window.scrollY > 0) {
    //         navbar.style.position = "fixed";
    //         navbar.style.top = "0";
    //         navbar.style.left = "0";
    //         navbar.style.width = "100%";
    //         navbar.style.zIndex = "1000";
    //         navbar.style.transition = "top 0.3s ease-in-out";
    //     } else {
    //         navbar.style.position = "relative";
    //     }
    // });

    // ================================================================================

    // Auto-scroll effect (continuous left to right)
    var scrollContainer = document.getElementById("subtopnav");
    var scrollSpeed = 1; // Adjust scroll speed for smoothness

    function autoScroll() {
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            scrollContainer.scrollLeft += scrollSpeed;
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollContainer.scrollLeft = 0; // Reset to start for continuous scrolling
            }
        }
    };

    // Use requestAnimationFrame for smoother animation
    function smoothScroll() {
        autoScroll();
        requestAnimationFrame(smoothScroll);
    }

    requestAnimationFrame(smoothScroll);
});



// ============== subject details, list overlay ====================

// Open overlay with subject details
function openOverlay(title, subjects) {
    document.getElementById('overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const subjectListDiv = document.getElementById('subject-list');
    subjectListDiv.innerHTML = `
                <h2>${title}</h2>
                <ul>
                    ${subjects.map((subject, index) => `
                        <li>
                            <a href="${subject[1]}" class="subject-link" target="_blank">
                                <span class="subject-icon">
                                    <i class="fas fa-${getSubjectIcon(index)}"></i>
                                </span>
                                <span class="subject-name">${subject[0]}</span>
                            </a>
                            <div class="subject-actions">
                                <a href="${subject[1]}" class="action-btn view-btn" target="_blank">
                                    <i class="fas fa-eye"></i> View
                                </a>
                                <a href="https://example.com/download/${subject[0].toLowerCase().replace(/\s+/g, '-')}" 
                                   class="action-btn download-btn" target="_blank">
                                    <i class="fas fa-download"></i> Download
                                </a>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            `;

    // Scroll to top of overlay content
    document.getElementById('overlay-container').scrollTop = 0;
}

// Get appropriate icon for each subject
function getSubjectIcon(index) {
    const icons = [
        'laptop-code', 'project-diagram', 'algorithm', 'chart-line',
        'lock', 'book', 'cogs', 'globe', 'server', 'file-alt',
        'database', 'briefcase', 'graduation-cap'
    ];
    return icons[index % icons.length];
}

// Close overlay
function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Download all content
function downloadContent() {
    // In a real implementation, this would trigger a zip download
    console.log('Downloading all materials...');
    showToast('Preparing all materials for download...');
}

// Share content
function shareContent() {
    // In a real implementation, this would use the Web Share API
    console.log('Sharing content...');
    showToast('Share options will appear here');
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--dark)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = 'var(--border-radius)';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = '1001';
    toast.style.animation = 'fadeIn 0.3s ease-out';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Close overlay when clicking outside or pressing Escape
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('overlay')) {
        closeOverlay();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeOverlay();
    }
});


// ============== subject details, list overlay ====================


// ====================== Dark mode and Light mode javaScript code ===============


                document.addEventListener('DOMContentLoaded', function () {
                    const toggleBtn = document.getElementById('tnb-dark-mode-toggle-btn');
                    const icon = toggleBtn.querySelector('i');

                    // Detect current theme state
                    function getCurrentTheme() {
                        if (document.body.classList.contains('dark-mode')) {
                            return 'dark';
                        }
                        return localStorage.getItem('tnb-theme') ||
                            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                    }

                    // Update icon based on theme
                    function updateThemeIcon() {
                        const theme = getCurrentTheme();
                        icon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
                    }

                    // Initial icon setup
                    updateThemeIcon();

                    // Listen for theme changes
                    document.addEventListener('themeChanged', updateThemeIcon);

                    // Watch for system theme changes
                    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeIcon);
                });

                // Mock TopNavBar implementation (replace with your actual one)
                window.TopNavBar = {
                    toggleUserPreferredTheme: function () {
                        document.body.classList.toggle('dark-mode');
                        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                        localStorage.setItem('tnb-theme', theme);
                        document.dispatchEvent(new CustomEvent('themeChanged'));

                        // Update icon immediately
                        const icon = document.querySelector('#tnb-dark-mode-toggle-btn i');
                        icon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
                    }
                };
// ====================== Dark mode and Light mode javaScript code ===============


// =========================== Ads Section ===========================
  // Enhanced JavaScript
        const createPromoSection = (() => {
            let currentSlide = 0;
            let autoChangeInterval;
            let hoverTimer;
            let isMouseIn = false;
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

            function initCarousel() {
                const container = document.querySelector('.dynamic-promo-carousel');
                if (!container) return;

                const slides = container.querySelectorAll('.promo-slide');
                if (slides.length === 0) return;

                // Event Handling
                const handleInteraction = (event) => {
                    const url = event.target.closest('[data-url]')?.dataset.url;
                    if (url) window.open(url, '_blank');
                };

                if (isTouchDevice) {
                    container.addEventListener('touchend', handleInteraction);
                } else {
                    container.addEventListener('click', handleInteraction);
                    container.addEventListener('mouseenter', handleMouseEnter);
                    container.addEventListener('mouseleave', handleMouseLeave);
                }

                // Initialize carousel
                activateSlide(slides[0]);
                autoChangeInterval = setInterval(changeSlide, 7000);

                function handleMouseEnter() {
                    isMouseIn = true;
                    clearInterval(autoChangeInterval);
                    hoverTimer = setTimeout(redirectToAd, 5000);
                }

                function handleMouseLeave() {
                    isMouseIn = false;
                    clearTimeout(hoverTimer);
                    autoChangeInterval = setInterval(changeSlide, 7000);
                }

                function redirectToAd() {
                    const activeSlide = container.querySelector('.promo-slide.active');
                    const url = activeSlide?.dataset.url;
                    if (url) window.open(url, '_blank');
                }

                function activateSlide(slide) {
                    slide.classList.add('active');
                    if (isMouseIn) slide.style.pointerEvents = 'auto';
                }

                function deactivateSlide(slide) {
                    slide.classList.remove('active');
                }

                function changeSlide() {
                    deactivateSlide(slides[currentSlide]);
                    currentSlide = (currentSlide + 1) % slides.length;
                    activateSlide(slides[currentSlide]);
                }
            }

            return {
                init: () => {
                    setTimeout(() => {
                        try {
                            initCarousel();
                            document.querySelector('.loading-indicator').remove();
                        } catch (error) {
                            console.error('Carousel error:', error);
                            document.querySelector('.loading-indicator').remove();
                        }
                    }, 1000);
                }
            };
        })();

        document.addEventListener('DOMContentLoaded', createPromoSection.init);

        // =========================== Ads Section ===========================


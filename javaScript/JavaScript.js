// JavaScript code for the educational website
// This script handles dynamic content loading, overlays, navigation, card interactions, mobile sidebar, auto-scrolling, dark mode toggle, and promo carousel functionality.    
// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  loadSubjectsContent();
  initOverlays();
  initNavigation();
  initCardInteractions();
  initMobileSidebar(); // Mobile sidebar initialization
  initAutoScroll();
  initSubjectOverlays();
  initDarkModeToggle();
  initPromoCarousel();
  
  // Load subjects content
  function loadSubjectsContent() {
    fetch('subjects.html')
      .then(response => response.text())
      .then(data => {
        const container = document.getElementById('subjects-container');
        if (container) {
          container.innerHTML = data;
          // Re-initialize handlers after dynamic content loads
          initOverlays();
          initNavigation();
          initCardInteractions();
          initMobileSidebar(); // Re-init for dynamic content
        }
      })
      .catch(error => console.error('Error loading subjects:', error));
  }

  // Overlay functionality
  function initOverlays() {
    // Open overlay handlers
    document.querySelectorAll('[data-overlay]').forEach(button => {
      button.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        const overlayId = button.getAttribute('data-overlay');
        const overlay = document.getElementById(overlayId);
        if (overlay) {
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close overlay handlers
    document.querySelectorAll('.close-overlay').forEach(button => {
      button.addEventListener('click', function() {
        const overlay = this.closest('.overlay');
        if (overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close when clicking outside content
    document.querySelectorAll('.overlay').forEach(overlay => {
      overlay.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Navigation functionality
  function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function() {
        // Update active navigation item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Show target section
        const target = this.getAttribute('data-target');
        if (target) {
          document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
          const targetSection = document.getElementById(target);
          if (targetSection) targetSection.classList.add('active');
        }
      });
    });
  }

  // Card interactions
  function initCardInteractions() {
    document.querySelectorAll('.card').forEach(card => {
      // Hover effects
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  // Mobile sidebar functionality
  function initMobileSidebar() {
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
    if (menuToggle && mobileSidebar && sidebarOverlay) {
      menuToggle.addEventListener('click', function() {
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = mobileSidebar.classList.contains('active') 
          ? 'hidden' : '';
      });

      // Close sidebar when clicking overlay
      sidebarOverlay.addEventListener('click', function() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
      
      // Close when pressing Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
          mobileSidebar.classList.remove('active');
          sidebarOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // Auto-scroll functionality
  function initAutoScroll() {
    const scrollContainer = document.getElementById("subtopnav");
    if (!scrollContainer) return;
    
    const scrollSpeed = 0.5; // Adjust speed as needed
    let scrollPosition = 0;
    let animationFrame;

    function autoScroll() {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrame = requestAnimationFrame(autoScroll);
    }

    // Start scrolling
    animationFrame = requestAnimationFrame(autoScroll);

    // Pause on hover
    scrollContainer.addEventListener('mouseenter', () => cancelAnimationFrame(animationFrame));
    scrollContainer.addEventListener('mouseleave', () => animationFrame = requestAnimationFrame(autoScroll));
  }

  // Subject overlay functionality
  function initSubjectOverlays() {
    // Close when clicking outside or pressing Escape
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
  }

  // Dark mode functionality
  function initDarkModeToggle() {
    const toggleBtn = document.getElementById('tnb-dark-mode-toggle-btn');
    if (!toggleBtn) return;
    
    const icon = toggleBtn.querySelector('i');
    
    function updateThemeIcon() {
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      icon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
    }
    
    // Initial setup
    updateThemeIcon();
    
    // Listen for theme changes
    document.addEventListener('themeChanged', updateThemeIcon);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeIcon);
  }

  // Promo carousel functionality
  function initPromoCarousel() {
    const container = document.querySelector('.dynamic-promo-carousel');
    if (!container) return;
    
    const slides = container.querySelectorAll('.promo-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoChangeInterval;
    
    // Initialize carousel
    activateSlide(slides[0]);
    autoChangeInterval = setInterval(changeSlide, 7000);
    
    // Event handling
    container.addEventListener('click', handleInteraction);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    function handleInteraction(e) {
      const url = e.target.closest('[data-url]')?.dataset.url;
      if (url) window.open(url, '_blank');
    }
    
    function handleMouseEnter() {
      clearInterval(autoChangeInterval);
    }
    
    function handleMouseLeave() {
      autoChangeInterval = setInterval(changeSlide, 1000);
    }
    
    function activateSlide(slide) {
      slides.forEach(s => s.classList.remove('active'));
      slide.classList.add('active');
    }
    
    function changeSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      activateSlide(slides[currentSlide]);
    }
  }
});

// Global functions for subject overlays
function openOverlay(title, subjects) {
  const overlay = document.getElementById('overlay');
  if (!overlay) return;
  
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const subjectListDiv = document.getElementById('subject-list');
  if (subjectListDiv) {
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
  }
}

function closeOverlay() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function getSubjectIcon(index) {
  const icons = [
    'laptop-code', 'project-diagram', 'algorithm', 'chart-line',
    'lock', 'book', 'cogs', 'globe', 'server', 'file-alt',
    'database', 'briefcase', 'graduation-cap'
  ];
  return icons[index % icons.length];
}

function downloadContent() {
  showToast('Preparing all materials for download...');
}

function shareContent() {
  showToast('Share options will appear here');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Dark mode toggle function (global)
window.TopNavBar = window.TopNavBar || {
  toggleUserPreferredTheme: function() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('tnb-theme', theme);
    document.dispatchEvent(new CustomEvent('themeChanged'));
    
    const icon = document.querySelector('#tnb-dark-mode-toggle-btn i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
    }
  }
};


// =========================================================


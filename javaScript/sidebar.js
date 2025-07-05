document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contentDisplay = document.getElementById('contentDisplay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');

    // 1. Populate Mobile Sidebar
    if (leftSidebar && rightSidebar && mobileSidebar) {
        mobileSidebar.innerHTML = leftSidebar.innerHTML + rightSidebar.innerHTML;
    }

    // 2. Combine Content Data from All Lessons
    const allContentData = {};
    for (let i = 1; i <= 12; i++) {
        const lessonData = window[`lesson${i}Data`];
        if (lessonData) Object.assign(allContentData, lessonData);
    }

    // 3. Content Loading Function
    function loadContent(contentId) {
        // Show loading state
        contentDisplay.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading content...</p>
            </div>
        `;

        setTimeout(() => {
            const content = allContentData[contentId];
            
            if (content) {
                contentDisplay.innerHTML = `
                    <div class="content-card">
                        ${content.content}
                    </div>
                `;
                document.title = `${content.title} | Pipara Academy`;
            } else {
                contentDisplay.innerHTML = `
                    <div class="content-card">
                        <h1>Content Not Found</h1>
                        <p>The requested content could not be loaded.</p>
                    </div>
                `;
            }

            // Update active links
            document.querySelectorAll('.menu-link').forEach(link => {
                link.classList.toggle('active-link', link.dataset.content === contentId);
            });
        }, 600);
    }

    // 4. Menu Link Event Handling
    function handleMenuClick(e) {
        e.preventDefault();
        const contentId = this.dataset.content;
        loadContent(contentId);
        
        // Update URL hash
        window.location.hash = contentId;
        
        // Close mobile menu
        if (mobileSidebar) mobileSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    // Attach event listeners
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });

    // 5. Mobile Menu Functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = mobileSidebar.classList.contains('active') 
                ? 'hidden' : '';
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 6. Load Initial Content
    const initialContentId = window.location.hash.substring(1);
    if (initialContentId && allContentData[initialContentId]) {
        loadContent(initialContentId);
    } else {
        // Load default content if no hash
        loadContent('intro-overview');
    }
});
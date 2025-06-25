document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contentDisplay = document.getElementById('contentDisplay');
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');

    // 1. Populate Mobile Sidebar (if elements exist)
    if (leftSidebar && rightSidebar && mobileSidebar) {
        mobileSidebar.innerHTML = leftSidebar.innerHTML + rightSidebar.innerHTML;
    }

    // 2. Combine Content Data from All Lessons using object spread
    const allContentData = {
        ...(typeof lesson1Data !== 'undefined' ? lesson1Data : {}),
        ...(typeof lesson2Data !== 'undefined' ? lesson2Data : {}),
        ...(typeof lesson3Data !== 'undefined' ? lesson3Data : {}),
        ...(typeof lesson4Data !== 'undefined' ? lesson4Data : {}),
        ...(typeof lesson5Data !== 'undefined' ? lesson5Data : {}),
        ...(typeof lesson6Data !== 'undefined' ? lesson6Data : {}),
        ...(typeof lesson7Data !== 'undefined' ? lesson7Data : {}),
        ...(typeof lesson8Data !== 'undefined' ? lesson8Data : {}),
        ...(typeof lesson9Data !== 'undefined' ? lesson9Data : {}),
        ...(typeof lesson10Data !== 'undefined' ? lesson10Data : {}),
        ...(typeof lesson11Data !== 'undefined' ? lesson11Data : {}),
        ...(typeof lesson12Data !== 'undefined' ? lesson12Data : {}),
    };

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
                        <p>Please select another topic from the menu.</p>
                    </div>
                `;
            }

            // Update active state for all menu links
            document.querySelectorAll('.menu-link').forEach(link => {
                link.classList.toggle('active-link', link.dataset.content === contentId);
            });
        }, 600);
    }

    // 4. Menu Click Handler
    function handleMenuClick(e) {
        e.preventDefault();
        const contentId = this.dataset.content;
        
        // Update URL and load content
        window.location.hash = contentId;
        loadContent(contentId);
        
        // Close mobile menu if open
        if (mobileSidebar && mobileSidebar.classList.contains('active')) {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 5. Event Listeners
    // Menu links
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });

    // Mobile menu toggle
    if (menuToggle && mobileSidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = mobileSidebar.classList.contains('active') 
                ? 'hidden' : '';
        });

        sidebarOverlay.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 6. Initial Content Load
    // const initialContentId = window.location.hash.substring(1) || 'intro-overview';
    // if (allContentData[initialContentId]) {
    //     loadContent(initialContentId);
    // } else {
    //     // Load default content if hash is invalid
    //     loadContent('intro-overview');
    //     window.location.hash = 'intro-overview';
    // }
});


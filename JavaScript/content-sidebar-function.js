// content-sidebar-function.js
document.addEventListener('DOMContentLoaded', function() {
    const contentDisplay = document.getElementById('contentDisplay');
    const menuLinks = document.querySelectorAll('.menu-link');


    // Safely combine content from all lessons
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

    // Function to load content
    function loadContent(contentId) {
        // Show loading state
        contentDisplay.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading content...</p>
            </div>
        `;
        
        setTimeout(() => {
            if (allContentData[contentId]) {
                const content = allContentData[contentId];
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
            
            // Update active menu item
            menuLinks.forEach(link => {
                link.classList.toggle(
                    'active-link',
                    link.dataset.content === contentId
                );
            });
            
            // Update mobile menu active state
            if (mobileSidebar) {
                const mobileLinks = mobileSidebar.querySelectorAll('.menu-link');
                mobileLinks.forEach(link => {
                    link.classList.toggle(
                        'active-link',
                        link.dataset.content === contentId
                    );
                });
            }
        }, 600);
    }
    
    // Add click event to menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadContent(this.dataset.content);
            
            // Close mobile menu
            if (mobileSidebar) mobileSidebar.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    });
    
    // Mobile menu toggle functionality
    if (menuToggle && mobileSidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', function() {
            mobileSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
        
        sidebarOverlay.addEventListener('click', function() {
            mobileSidebar.classList.remove('active');
            this.classList.remove('active');
        });
    }
    
    // Load initial content based on URL hash
    const initialContentId = window.location.hash.substring(1);
    if (initialContentId && allContentData[initialContentId]) {
        loadContent(initialContentId);
    }


    
    
});

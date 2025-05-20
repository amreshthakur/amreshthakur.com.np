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




// document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class 'ga-nav'
    // const links = document.querySelectorAll('.ga-nav');

    // links.forEach(link => {
        // Get the title from the title attribute or the link's text
        // const title = link.getAttribute('title') || link.textContent.trim();

        // Convert the title to lowercase and replace spaces with hyphens
        // const slug = title.toLowerCase().replace(/ /g, '-');

        // Generate the href dynamically
        // const href = `/search/label/${slug}`;

        // Set the href attribute
        // link.setAttribute('href', href);

        // Optionally, set the title attribute if needed
        // link.setAttribute('title', title);
    // });
// });




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


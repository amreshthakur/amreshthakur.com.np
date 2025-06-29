// Reusable function to open apps or fallback to web
function openAppOrWeb(appLink, webLink) {
    window.location.href = appLink;
    setTimeout(() => {
        window.location.href = webLink;
    }, 500); // fallback delay
}

// Social Media Links
const socialMediaLinks = {
    youtube: {
        app: "vnd.youtube://channel/UCl2IeC8anS0ae_nOYYkjSFg",
        web: "https://www.youtube.com/channel/UCl2IeC8anS0ae_nOYYkjSFg"
    },
    github: {
        app: "github://user?username=yourusername",
        web: "https://github.com/yourusername"
    },
    twitter: {
        app: "twitter://user?screen_name=yourusername",
        web: "https://twitter.com/yourusername"
    },
    linkedin: {
        app: "linkedin://in/yourusername",
        web: "https://www.linkedin.com/in/yourusername"
    },
    discord: {
        app: "discord://discordapp.com/users/yourid",
        web: "https://discord.gg/yourserver"
    }
};

// Generic open handler
function openSocialMedia(platform) {
    const link = socialMediaLinks[platform];
    if (link) openAppOrWeb(link.app, link.web);
}
// Event listeners for social media buttons
// Add event listener for all social icons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            openSocialMedia(platform);
        });
    });
});





// ==========================================================================================


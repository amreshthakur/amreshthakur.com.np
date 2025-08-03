// Robust reusable opener with fallback
function openAppOrWeb(appLink, webLink, fallbackDelay = 500) {
    let fallbackTimeout = setTimeout(() => {
        window.location.href = webLink;
    }, fallbackDelay);

    // If the page becomes hidden shortly after trying, assume the app opened and cancel fallback
    const handleVisibility = () => {
        if (document.hidden) {
            clearTimeout(fallbackTimeout);
            document.removeEventListener('visibilitychange', handleVisibility);
        }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Try to open app
    window.location.href = appLink;
}

// === Configure your usernames / IDs here ===
const userHandles = {
    youtubeChannelId: "UCl2IeC8anS0ae_nOYYkjSFg",
    githubUsername: "yourusername",
    twitterUsername: "yourusername",
    linkedinUsername: "yourusername",
    discordInvite: "yourserver", // or user ID if preferred
    instagramUsername: "yourusername",
    facebookPage: "abirathshrma", // could be username or page ID
    tiktokUsername: "yourusername",
    redditUsername: "yourusername",
    snapchatUsername: "yourusername",
    pinterestUsername: "yourusername",
    telegramUsername: "yourusername",
    whatsappNumber: "1234567890", // in international format without +
    mastodonInstance: "fosstodon.org",
    mastodonHandle: "@yourusername"
};

// === Social Media Links with app/web schemes ===
const socialMediaLinks = {
    youtube: {
        app: `vnd.youtube://channel/${userHandles.youtubeChannelId}`,
        web: `https://www.youtube.com/channel/${userHandles.youtubeChannelId}`
    },
    github: {
        app: `github://user?username=${userHandles.githubUsername}`,
        web: `https://github.com/${userHandles.githubUsername}`
    },
    twitter: {
        app: `twitter://user?screen_name=${userHandles.twitterUsername}`,
        web: `https://twitter.com/${userHandles.twitterUsername}`
    },
    linkedin: {
        app: `linkedin://in/${userHandles.linkedinUsername}`,
        web: `https://www.linkedin.com/in/${userHandles.linkedinUsername}`
    },
    discord: {
        app: `discord://discordapp.com/invite/${userHandles.discordInvite}`,
        web: `https://discord.gg/${userHandles.discordInvite}`
    },
    instagram: {
        app: `instagram://user?username=${userHandles.instagramUsername}`,
        web: `https://www.instagram.com/${userHandles.instagramUsername}`
    },
    facebook: {
        app: `fb://profile/${userHandles.facebookPage}`,
        web: `https://www.facebook.com/${userHandles.facebookPage}`
    },
    tiktok: {
        app: `snssdk1233://user/profile/${userHandles.tiktokUsername}`, // platform-specific; may vary
        web: `https://www.tiktok.com/@${userHandles.tiktokUsername}`
    },
    reddit: {
        app: `reddit://user/${userHandles.redditUsername}`,
        web: `https://www.reddit.com/user/${userHandles.redditUsername}`
    },
    snapchat: {
        app: `snapchat://add/${userHandles.snapchatUsername}`,
        web: `https://www.snapchat.com/add/${userHandles.snapchatUsername}`
    },
    pinterest: {
        app: `pinterest://user/${userHandles.pinterestUsername}`,
        web: `https://www.pinterest.com/${userHandles.pinterestUsername}`
    },
    telegram: {
        app: `tg://resolve?domain=${userHandles.telegramUsername}`,
        web: `https://t.me/${userHandles.telegramUsername}`
    },
    whatsapp: {
        app: `whatsapp://send?phone=${userHandles.whatsappNumber}`,
        web: `https://wa.me/${userHandles.whatsappNumber}`
    },
    mastodon: {
        app: `https://${userHandles.mastodonInstance}/@${userHandles.mastodonHandle.replace(/^@/, '')}`, // Mastodon doesn't have a well-defined universal app scheme
        web: `https://${userHandles.mastodonInstance}/@${userHandles.mastodonHandle.replace(/^@/, '')}`
    }
};

// Generic opener
function openSocialMedia(platform) {
    const link = socialMediaLinks[platform];
    if (!link) {
        console.warn(`No link configured for platform: ${platform}`);
        return;
    }
    openAppOrWeb(link.app, link.web);
}

// Attach to DOM buttons / links
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            openSocialMedia(platform);
        });
    });
});

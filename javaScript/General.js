     function openYouTubeApp() {
                        const app = "vnd.youtube://channel/UCl2IeC8anS0ae_nOYYkjSFg";
                        const web = "https://www.youtube.com/channel/UCl2IeC8anS0ae_nOYYkjSFg";
                        openApp(app, web);
                    }

                    function openGitHub() {
                        const app = "github://user?username=yourusername"; // Custom URI not standard
                        const web = "https://github.com/yourusername";
                        openApp(app, web);
                    }

                    function openTwitter() {
                        const app = "twitter://user?screen_name=yourusername";
                        const web = "https://twitter.com/yourusername";
                        openApp(app, web);
                    }

                    function openLinkedIn() {
                        const app = "linkedin://in/yourusername";
                        const web = "https://www.linkedin.com/in/yourusername";
                        openApp(app, web);
                    }

                    function openDiscord() {
                        const app = "discord://discordapp.com/users/yourid"; // Not supported by all browsers
                        const web = "https://discord.gg/yourserver";
                        openApp(app, web);
                    }

                    function openApp(appLink, webLink) {
                        window.location.href = appLink;
                        setTimeout(function () {
                            window.location.href = webLink;
                        }, 500); // Fallback to web link after 500ms
                    }


// ===========================================social media open=============================================


// Footer script to set current year and extract title
// This script sets the current year in the footer and extracts the main title from the document title.
// Footer.js
document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Get <title> text
    const titleText = document.title;

    // Example: "BSc CSIT Notes - All Semesters | Pipara Academy"
    // Split to get the part before '|'
    const [beforePipe, afterPipe] = titleText.split('|').map(part => part.trim());

    // From beforePipe, get the part before '-'
    const mainTitle = beforePipe.split('-')[0].trim(); // "BSc CSIT Notes"



    // Set site name in footer
    const siteNameElement = document.getElementById('websiteName');
    if (siteNameElement && afterPipe) {
        siteNameElement.textContent = afterPipe;
    }
});







// ==================================footer code ending tag========================================



// ========================================================================================
// Search functionality for curriculum
// ========================================================================================



// Search functionality for curriculum
// This script provides a search functionality for the curriculum, allowing users to search through subjects and units.
// Curriculum.js
// Curriculum search functionality
 // DOM handling
document.addEventListener('DOMContentLoaded', () => {
    // Overlay functionality
    const searchTrigger = document.getElementById('searchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeOverlay = document.getElementById('closeOverlay');
    const searchInput = document.getElementById('biru-nepal-search-input');

    // Open overlay when search area is clicked
    searchTrigger.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    // Close overlay when X is clicked
    closeOverlay.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Close overlay when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Close overlay when clicking outside content
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });

    // DOM Elements for search functionality
    const searchBox = document.getElementById('biru-nepal-search-box-inner');
    const resultsContainer = document.getElementById('biru-nepal-results-grid');
    const resultCount = document.getElementById('biru-nepal-result-count');
    const searchTime = document.getElementById('biru-nepal-search-time');
    const filterButtons = document.querySelectorAll('.biru-nepal-filter-btn');
    const resultsTitle = document.getElementById('biru-nepal-results-title');

    let currentFilter = "all";

    // Search input event handler
    searchInput.addEventListener('input', function() {
        const query = this.value;
        const { results, searchTime: time } = searchCurriculum(query, currentFilter);

        // Update stats
        resultCount.textContent = results.length;
        searchTime.textContent = time;

        // Show/hide results title
        if (query.trim() && results.length > 0) {
            resultsTitle.style.display = "block";
        } else {
            resultsTitle.style.display = "none";
        }

        // Render results
        renderSearchResults(results, query);
    });

    // Search box focus effect
    searchInput.addEventListener('focus', () => {
        searchBox.classList.add('focused');
    });

    searchInput.addEventListener('blur', () => {
        searchBox.classList.remove('focused');
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update current filter
            currentFilter = this.dataset.filter;

            // Perform new search with current query
            const query = searchInput.value;
            const { results, searchTime: time } = searchCurriculum(query, currentFilter);

            // Update stats
            resultCount.textContent = results.length;
            searchTime.textContent = time;

            // Show/hide results title
            if (query.trim() && results.length > 0) {
                resultsTitle.style.display = "block";
            } else {
                resultsTitle.style.display = "none";
            }

            // Render results
            renderSearchResults(results, query);
        });
    });

    // Quick search links
    document.querySelectorAll('.biru-nepal-quick-link').forEach(link => {
        link.addEventListener('click', function() {
            searchInput.value = this.textContent;
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
        });
    });

    // URL formatting helper function
    function toHyphenatedURL(str) {
        return str.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
            .replace(/\s+/g, '-')           // Replace spaces with hyphens
            .replace(/-+/g, '-');            // Remove consecutive hyphens
    }

    // Helper function to get semester slug from title
    function getSemesterSlug(title) {
        const semesterMap = {
            "BSc.CSIT : First Semester": "first-semester",
            "BSc.CSIT : Second Semester": "second-semester",
            "BSc.CSIT : Third Semester": "third-semester",
            "BSc.CSIT : Fourth Semester": "fourth-semester",
            "BSc.CSIT : Fifth Semester": "fifth-semester",
            "BSc.CSIT : Sixth Semester": "sixth-semester",
            "BSc.CSIT : Seventh Semester": "seventh-semester",
            "BSc.CSIT : Eighth Semester": "eighth-semester"
        };
        return semesterMap[title] || toHyphenatedURL(title);
    }

    // Highlight matching text
    function highlightText(text, query) {
        if (!query || !text) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, '<span class="biru-nepal-highlight">$1</span>');
    }

    // Main search function
    function searchCurriculum(query, filter = "all") {
        const startTime = performance.now();
        if (!query.trim()) return { results: [], searchTime: 0 };

        const normalizedQuery = query.toLowerCase().trim();
        const results = [];

        // Helper function to check matches
        const matches = (text) => text && text.toLowerCase().includes(normalizedQuery);

        // Search through semesters
        semesterData.forEach(semester => {
            const semesterSlug = getSemesterSlug(semester.title);

            if ((filter === "all" || filter === "semester") &&
                (matches(semester.title) || matches(semester.description))) {
                // Calculate core and elective counts
                const coreCount = semester.subjects.filter(s => !s.elective).length;
                const electiveCount = semester.subjects.filter(s => s.elective).length;

                results.push({
                    type: 'semester',
                    title: semester.title,
                    description: semester.description,
                    subjects: semester.subjects.length,
                    core: coreCount,
                    electives: electiveCount,
                    link: `csit/${semesterSlug}/`,
                    semesterIndex: semesterData.indexOf(semester)
                });
            }

            // Search through subjects in semester
            semester.subjects.forEach(subject => {
                const subjectSlug = toHyphenatedURL(subject.name);

                if ((filter === "all" || filter === "subject") &&
                    (matches(subject.name) || matches(subject.description))) {
                    results.push({
                        type: 'subject',
                        title: subject.name,
                        description: subject.description,
                        semester: semester.title,
                        link: `csit/${semesterSlug}/${subjectSlug}/`
                    });
                }

                // Search through units in subject
                const units = subjectUnits[subject.name] || [];
                if (filter === "all" || filter === "unit") {
                    units.forEach(unit => {
                        // Check for matches in title, description, or topics
                        const topicMatch = unit.topics
                            ? unit.topics.find(topic => matches(topic))
                            : null;

                        if (matches(unit.title) ||
                            (unit.description && matches(unit.description)) ||
                            topicMatch) {

                            const unitSlug = toHyphenatedURL(unit.title);
                            results.push({
                                type: 'unit',
                                title: unit.title,
                                description: unit.description,
                                matchingTopic: topicMatch,
                                topics: unit.topics,
                                subject: subject.name,
                                semester: semester.title,
                                link: `csit/${semesterSlug}/${subjectSlug}/${unitSlug}`
                            });
                        }
                    });
                }
            });
        });

        const endTime = performance.now();
        return {
            results: results.slice(0, 8), // Limit to 8 results
            searchTime: (endTime - startTime).toFixed(2)
        };
    }

    // Render search results function
    function renderSearchResults(results, query) {
        resultsContainer.innerHTML = '';

        if (results.length === 0 && query.length > 0) {
            resultsContainer.innerHTML =
                `<div class="biru-nepal-no-results">
                    <i class="fas fa-frown"></i>
                    <h3>No results found</h3>
                    <p>We couldn't find any matches for "${query}". Try different keywords or check your spelling.</p>
                    
                    <div class="biru-nepal-quick-links">
                        <div class="biru-nepal-quick-link">Computer Networks</div>
                        <div class="biru-nepal-quick-link">Algorithms</div>
                        <div class="biru-nepal-quick-link">Database</div>
                        <div class="biru-nepal-quick-link">Fourth Semester</div>
                    </div>
                </div>`;

            // Re-attach quick link listeners
            document.querySelectorAll('.biru-nepal-quick-link').forEach(link => {
                link.addEventListener('click', function() {
                    searchInput.value = this.textContent;
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                });
            });

            return;
        }

        if (results.length === 0) {
            resultsContainer.innerHTML =
                `<div class="biru-nepal-no-results">
                    <i class="fas fa-search"></i>
                    <h3>Search the Curriculum</h3>
                    <p>Enter keywords related to semesters, subjects, units, or topics in the search box above to get started.</p>
                    
                    <div class="biru-nepal-quick-links">
                        <div class="biru-nepal-quick-link">Computer Networks</div>
                        <div class="biru-nepal-quick-link">Algorithms</div>
                        <div class="biru-nepal-quick-link">Database</div>
                        <div class="biru-nepal-quick-link">Fourth Semester</div>
                    </div>
                </div>`;

            // Re-attach quick link listeners
            document.querySelectorAll('.biru-nepal-quick-link').forEach(link => {
                link.addEventListener('click', function() {
                    searchInput.value = this.textContent;
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                });
            });

            return;
        }

        results.forEach((result, index) => {
            // Add result number to all cards
            const resultNumber = document.createElement('div');
            resultNumber.className = 'biru-result-number';
            resultNumber.textContent = index + 1;

            // Use semester card design for semester results
            if (result.type === 'semester') {
                const card = document.createElement('div');
                card.className = 'biru-course-card';
                if (result.electives > 0) {
                    card.classList.add('elective');
                }
                card.style.setProperty('--delay', result.semesterIndex);

                // Add result number to card
                card.appendChild(resultNumber);

                card.innerHTML += `
                    <div class="biru-course-semester-number">${result.semesterIndex + 1}</div>
                    <h2>${highlightText(result.title, query)}</h2>
                    <p>${highlightText(result.description, query)}</p>
                    <span class="biru-course-subjects-count">${result.subjects} Subjects</span>
                    <div class="biru-course-subject-breakdown">
                        <span class="biru-course-core-count">${result.core} Core</span>
                        <span class="biru-course-elective-count">${result.electives} Electives</span>
                    </div>
                `;

                // Find the actual semester data
                const semester = semesterData.find(s => s.title === result.title);
                if (semester) {
                    card.addEventListener('click', () => {
                        window.location.href = result.link;
                    });
                }

                resultsContainer.appendChild(card);
            }
            // Subject result card
            else if (result.type === 'subject') {
                const card = document.createElement('div');
                card.className = 'biru-nepal-result-card';
                card.style.position = 'relative';

                // Add result number to card
                card.appendChild(resultNumber);

                card.innerHTML +=
                    `<div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: rgba(74, 105, 189, 0.2); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                            <i class="fas fa-book" style="color: #4a69bd; font-size: 1.8rem;"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600; color: #4a69bd; margin-bottom: 5px;">Subject</div>
                            <h3 style="margin: 0;">${highlightText(result.title, query)}</h3>
                        </div>
                    </div>
                    <p>${result.description ? highlightText(result.description, query) : 'Detailed content and resources for this subject'}</p>
                    <div class="meta" style="margin-top: 15px; display: flex; gap: 15px; color: #a0a0d0; font-size: 0.95rem;">
                        ${result.semester ? `<span><i class="fas fa-calendar-alt"></i> ${highlightText(result.semester, query)}</span>` : ''}
                    </div>
                    <a href="${result.link}" class="biru-nepal-view-link">View Subject Details</a>`;

                card.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') {
                        window.location.href = result.link;
                    }
                });

                resultsContainer.appendChild(card);
            }
            // Unit result card
            else if (result.type === 'unit') {
                const card = document.createElement('div');
                card.className = 'biru-nepal-result-card';
                card.style.position = 'relative';

                // Add result number to card
                card.appendChild(resultNumber);

                // Prepare topics HTML if available
                let topicsHTML = '';
                if (result.topics && result.topics.length > 0) {
                    topicsHTML = `<div class="biru-nepal-topics-container">
                        <strong>Topics:</strong>
                        <div class="biru-nepal-topics-list">
                            ${result.topics.map(topic => {
                                const highlighted = highlightText(topic, query);
                                return `<span class="biru-nepal-topic">${highlighted}</span>`;
                            }).join('')}
                        </div>
                    </div>`;
                }

                // Show matching topic in description if found
                let descriptionContent = result.description || 'Detailed content and resources for this topic';
                if (result.matchingTopic) {
                    descriptionContent = `Topic found: <strong>"${highlightText(result.matchingTopic, query)}"</strong>`;
                } else {
                    descriptionContent = highlightText(descriptionContent, query);
                }

                card.innerHTML +=
                    `<div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: rgba(178, 31, 31, 0.2); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                            <i class="fas fa-file-alt" style="color: #b21f1f; font-size: 1.8rem;"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600; color: #b21f1f; margin-bottom: 5px;">Unit</div>
                            <h3 style="margin: 0;">${highlightText(result.title, query)}</h3>
                        </div>
                    </div>
                    <p>${descriptionContent}</p>
                    ${topicsHTML}
                    <div class="meta" style="margin-top: 15px; display: flex; gap: 15px; color: #a0a0d0; font-size: 0.95rem;">
                        ${result.semester ? `<span><i class="fas fa-calendar-alt"></i> ${highlightText(result.semester, query)}</span>` : ''}
                        ${result.subject ? `<span><i class="fas fa-book"></i> ${highlightText(result.subject, query)}</span>` : ''}
                    </div>
                    <a href="${result.link}" class="biru-nepal-view-link">View Unit Details</a>`;

                card.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') {
                        window.location.href = result.link;
                    }
                });

                resultsContainer.appendChild(card);
            }
        });
    }
});
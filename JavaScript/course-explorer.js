// ==================================================================================================================================================================================

const semesterGrid = document.querySelector('.pipara-academy-course-semester-grid');
const filterBtns = document.querySelectorAll('.pipara-academy-course-filter-btn');
const overlay = document.getElementById('pipara-academy-course-overlay');
const unitOverlay = document.getElementById('pipara-academy-course-unit-overlay');
const subjectList = document.getElementById('pipara-academy-course-subject-list');
const unitList = document.getElementById('pipara-academy-course-unit-list');

// Helper function to generate slugs
function generateSlug(text) {
    // Remove "BSC.CSIT : " prefix if it exists
    const cleanedText = text.replace(/^BSC\.CSIT\s*:\s*/i, '');
    return encodeURIComponent(cleanedText.toLowerCase().replace(/\s+/g, '-'));
}

// Generate proper URL structure
function generateUnitLink(subject, unitTitle) {
    const courseSlug = "csit";
    const semesterSlug = generateSlug(currentSemesterTitle);
    const subjectSlug = generateSlug(subject);
    const unitSlug = generateSlug(unitTitle);
    return `/${courseSlug}/${semesterSlug}/${subjectSlug}/${unitSlug}/`;
}

// Store current state
let currentSubject = "";
let currentSemesterTitle = "";
let currentUnits = [];

// Filter initialization
document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(btn => {
            btn.classList.remove('pipara-academy-course-active');
        });

        // Add active class to clicked button
        this.classList.add('pipara-academy-course-active');

        // Get filter type
        const filterValue = this.dataset.filter;

        // Show/hide courses based on filter
        document.querySelectorAll('.pipara-academy-course-card').forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                // Filter based on subject type
                const semesterIndex = Array.from(semesterGrid.children).indexOf(card);
                const semester = semesterData[semesterIndex];
                const hasElectives = semester.subjects.some(s => s.elective && filterValue === 'elective');
                const hasCore = semester.subjects.some(s => !s.elective && filterValue === 'core');

                if (filterValue === 'elective') {
                    card.style.display = hasElectives ? 'block' : 'none';
                } else if (filterValue === 'core') {
                    card.style.display = hasCore ? 'block' : 'none';
                }
            }
        });
    });
});

// Initialize semester cards
function initSemesterCards() {
    semesterGrid.innerHTML = '';

    semesterData.forEach((semester, index) => {
        // Calculate core and elective counts
        const coreCount = semester.subjects.filter(s => !s.elective).length;
        const electiveCount = semester.subjects.filter(s => s.elective).length;

        const card = document.createElement('div');
        card.className = 'pipara-academy-course-card';
        if (electiveCount > 0) {
            card.classList.add('elective');
        }
        card.style.setProperty('--delay', index);

        card.innerHTML = `
                    <div class="pipara-academy-course-semester-number">${index + 1}</div>
                    <h2>${semester.title}</h2>
                    <p>${semester.description}</p>
                    <span class="pipara-academy-course-subjects-count">${semester.subjects.length} Subjects</span>
                    <div class="pipara-academy-course-subject-breakdown">
                        <span class="pipara-academy-course-core-count">${coreCount} Core</span>
                        <span class="pipara-academy-course-elective-count">${electiveCount} Electives</span>
                    </div>
                `;

        card.addEventListener('click', () => openOverlay(semester.title, semester.subjects));
        semesterGrid.appendChild(card);
    });
}

function openOverlay(title, subjects) {
    currentSemesterData = subjects;
    currentSemesterTitle = title;
    document.getElementById("pipara-academy-course-semester-title").textContent = title;

    renderSubjectCards();

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function renderSubjectCards() {
    subjectList.innerHTML = "";

    const subjectIcons = [
        "fa-book", "fa-laptop-code", "fa-calculator",
        "fa-network-wired", "fa-microchip", "fa-database",
        "fa-code", "fa-brain", "fa-server", "fa-cloud",
        "fa-shield-alt", "fa-mobile-alt", "fa-globe", "fa-cogs"
    ];

    currentSemesterData.forEach((subject, index) => {
        const unitCount = subjectUnits[subject.name] ? subjectUnits[subject.name].length : 0;
        const iconIndex = index % subjectIcons.length;

        const card = document.createElement("div");
        card.className = "pipara-academy-course-unit-card";
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
                    <div class="pipara-academy-course-unit-header">
                        <div class="pipara-academy-course-unit-icon">
                            <i class="fas ${subjectIcons[iconIndex]}"></i>
                        </div>
                        <div class="pipara-academy-course-unit-title-container">
                            <h4>${subject.name}</h4>
                            ${subject.elective ? '<span class="pipara-academy-course-resource-badge">ELECTIVE</span>' : ''}
                        </div>
                    </div>
                    <p>${subject.description}</p>
                    <div class="pipara-academy-course-units-count">${unitCount} Units</div>
                `;
        card.addEventListener('click', () => openUnitOverlay(subject.name));
        subjectList.appendChild(card);
    });
}

function closeOverlay() {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function openUnitOverlay(subjectName) {
    currentSubject = subjectName;
    document.getElementById("pipara-academy-course-subject-title").textContent = subjectName;
    document.getElementById("pipara-academy-course-overlay-subtitle").textContent = "Select a unit to view content";

    // Get units for this subject
    currentUnits = subjectUnits[subjectName] || [];

    // Render unit cards
    renderUnitCards();

    unitOverlay.style.display = "flex";
    overlay.style.display = "none";
}

function renderUnitCards() {
    unitList.innerHTML = "";
    
    const unitIcons = [
        "fa-book-open", "fa-laptop-code", "fa-shapes",
        "fa-calculator", "fa-network-wired", "fa-chart-line",
        "fa-database", "fa-microchip", "fa-code", "fa-brain",
        "fa-cogs", "fa-server", "fa-cloud", "fa-shield-alt",
        "fa-lock", "fa-mobile-alt", "fa-globe", "fa-sitemap"
    ];

    if (currentUnits.length > 0) {
        currentUnits.forEach((unit, index) => {
            const unitNumber = index + 1;
            // Generate proper unit link
            const unitLink = generateUnitLink(currentSubject, unit.title);
            const iconIndex = index % unitIcons.length;

            const unitCard = document.createElement("div");
            unitCard.className = "pipara-academy-course-unit-card";
            unitCard.style.animationDelay = `${index * 0.05}s`;
            unitCard.innerHTML = `
                        <div class="pipara-academy-course-unit-header">
                            <div class="pipara-academy-course-unit-icon">
                                <i class="fas ${unitIcons[iconIndex]}"></i>
                            </div>
                            <div class="pipara-academy-course-unit-title-container">
                                <div class="pipara-academy-course-unit-number">Unit ${unitNumber}</div>
                                <h4>${unit.title}</h4>
                            </div>
                        </div>
                        <p>${unit.description}</p>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
                    
            // Add click handler to navigate to the unit
            unitCard.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                // Show loading indicator
                const loadingOverlay = document.getElementById('loadingOverlay');
                const loadingText = document.getElementById('loadingText');
                if (loadingOverlay && loadingText) {
                    loadingText.textContent = `Opening ${unit.title}...`;
                    loadingOverlay.classList.add('active');
                }
                
                // Use smooth navigation without page reload
                setTimeout(() => {
                    // Use location.replace to prevent creating new history entries
                    location.replace(unitLink);
                }, 300);
            });


            
            
            unitList.appendChild(unitCard);
        });
    } else {
        // Fallback to default units if no external data
        const unitThemes = [
            "Fundamentals and Introduction",
            "Core Concepts and Principles",
            "Advanced Techniques",
            "Practical Applications",
            "Case Studies and Real-world Examples"
        ];

        // Create 5 units for each subject
        for (let i = 1; i <= 5; i++) {
            const themeIndex = (i - 1) % unitThemes.length;
            const unitTitle = unitThemes[themeIndex];
            
            // Generate proper unit link
            const unitLink = generateUnitLink(currentSubject, unitTitle);
            const iconIndex = (i - 1) % unitIcons.length;

            const unitCard = document.createElement("div");
            unitCard.className = "pipara-academy-course-unit-card";
            unitCard.style.animationDelay = `${i * 0.05}s`;
            unitCard.innerHTML = `
                        <div class="pipara-academy-course-unit-header">
                            <div class="pipara-academy-course-unit-icon">
                                <i class="fas ${unitIcons[iconIndex] || 'fa-book'}"></i>
                            </div>
                            <div class="pipara-academy-course-unit-title-container">
                                <div class="pipara-academy-course-unit-number">Unit ${i}</div>
                                <h4>${unitTitle}</h4>
                            </div>
                        </div>
                        <p>${getUnitDescription(i, currentSubject)}</p>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
                    
            // Add click handler to navigate to the unit
            unitCard.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                // Show loading indicator
                const loadingOverlay = document.getElementById('loadingOverlay');
                const loadingText = document.getElementById('loadingText');
                if (loadingOverlay && loadingText) {
                    loadingText.textContent = `Opening ${unitTitle}...`;
                    loadingOverlay.classList.add('active');
                }
                
                // Use smooth navigation without page reload
                setTimeout(() => {
                    // Use location.replace to prevent creating new history entries
                    location.replace(unitLink);
                }, 300);
            });
            
            unitList.appendChild(unitCard);
        }
    }
}

function getUnitDescription(unit, subject) {
    const topics = [
        "Introduction, history, and fundamental concepts",
        "Core principles, theories, and methodologies",
        "Advanced techniques, algorithms, and implementations",
        "Practical applications, case studies, and real-world examples",
        "Emerging trends, research directions, and future outlook"
    ];

    const topicIndex = (unit - 1) % topics.length;
    return `${topics[topicIndex]}`;
}

function closeUnitOverlay() {
    unitOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function goBackToSubjects() {
    unitOverlay.style.display = "none";
    overlay.style.display = "flex";
}

// Close overlays when clicking outside the container
overlay.addEventListener('click', function (e) {
    if (e.target === this) {
        closeOverlay();
    }
});

unitOverlay.addEventListener('click', function (e) {
    if (e.target === this) {
        closeUnitOverlay();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initSemesterCards();
    
    // Hide loading overlay after page loads
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        // Set timeout to ensure loading overlay is hidden even if it was active
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
        }, 500);
    }
});

// Expose navigation functions to global scope
window.goBackToSubjects = goBackToSubjects;
// ==================================================================================================================================================================================

const semesterGrid = document.querySelector('.pipara-academy-course-semester-grid');
const filterBtns = document.querySelectorAll('.pipara-academy-course-filter-btn');
const overlay = document.getElementById('pipara-academy-course-overlay');
const unitOverlay = document.getElementById('pipara-academy-course-unit-overlay');
const subjectList = document.getElementById('pipara-academy-course-subject-list');
const unitList = document.getElementById('pipara-academy-course-unit-list');

// Helper function to generate slugs
function generateSlug(text) {
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

document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(btn => {
            btn.classList.remove('pipara-academy-course-active');
        });
        this.classList.add('pipara-academy-course-active');

        const filterValue = this.dataset.filter;

        document.querySelectorAll('.pipara-academy-course-card').forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                const semesterIndex = Array.from(semesterGrid.children).indexOf(card);
                const semester = semesterData[semesterIndex];
                const hasElectives = semester.subjects.some(s => s.elective && filterValue === 'elective');
                const hasCore = semester.subjects.some(s => !s.elective && filterValue === 'core');
                card.style.display = (filterValue === 'elective' && hasElectives) || (filterValue === 'core' && hasCore) ? 'block' : 'none';
            }
        });
    });
});

function initSemesterCards() {
    semesterGrid.innerHTML = '';
    semesterData.forEach((semester, index) => {
        const coreCount = semester.subjects.filter(s => !s.elective).length;
        const electiveCount = semester.subjects.filter(s => s.elective).length;

        const card = document.createElement('div');
        card.className = 'pipara-academy-course-card';
        if (electiveCount > 0) card.classList.add('elective');
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
        "fa-book", "fa-laptop-code", "fa-calculator", "fa-network-wired",
        "fa-microchip", "fa-database", "fa-code", "fa-brain",
        "fa-server", "fa-cloud", "fa-shield-alt", "fa-mobile-alt",
        "fa-globe", "fa-cogs"
    ];

    currentSemesterData.forEach((subject, index) => {
        const unitCount = subjectUnits[subject.name]?.length || 0;
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

function openUnitOverlay(subjectName) {
    currentSubject = subjectName;
    document.getElementById("pipara-academy-course-subject-title").textContent = subjectName;
    document.getElementById("pipara-academy-course-overlay-subtitle").textContent = "Select a unit to view content";
    currentUnits = subjectUnits[subjectName] || [];
    renderUnitCards();
    unitOverlay.style.display = "flex";
    overlay.style.display = "none";
}

function renderUnitCards() {
    unitList.innerHTML = "";
    const unitIcons = [
        "fa-book-open", "fa-laptop-code", "fa-shapes", "fa-calculator", "fa-network-wired",
        "fa-chart-line", "fa-database", "fa-microchip", "fa-code", "fa-brain",
        "fa-cogs", "fa-server", "fa-cloud", "fa-shield-alt", "fa-lock", "fa-mobile-alt", "fa-globe", "fa-sitemap"
    ];

    const units = currentUnits.length > 0 ? currentUnits : Array.from({ length: 5 }, (_, i) => ({
        title: [
            "Fundamentals and Introduction",
            "Core Concepts and Principles",
            "Advanced Techniques",
            "Practical Applications",
            "Case Studies and Real-world Examples"
        ][i % 5],
        description: getUnitDescription(i + 1, currentSubject)
    }));

    units.forEach((unit, index) => {
        const unitNumber = index + 1;
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
        unitCard.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const loadingOverlay = document.getElementById('loadingOverlay');
            const loadingText = document.getElementById('loadingText');
            if (loadingOverlay && loadingText) {
                loadingText.textContent = `Opening ${unit.title}...`;
                loadingOverlay.classList.add('active');
            }

            setTimeout(() => {
                history.pushState({ subject: currentSubject, unit: unit.title }, '', unitLink);
                window.location.href = unitLink;
            }, 300);
        });
        unitList.appendChild(unitCard);
    });
}

function getUnitDescription(unit, subject) {
    const topics = [
        "Introduction, history, and fundamental concepts",
        "Core principles, theories, and methodologies",
        "Advanced techniques, algorithms, and implementations",
        "Practical applications, case studies, and real-world examples",
        "Emerging trends, research directions, and future outlook"
    ];
    return topics[(unit - 1) % topics.length];
}

function closeOverlay() {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function closeUnitOverlay() {
    unitOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function goBackToSubjects() {
    unitOverlay.style.display = "none";
    overlay.style.display = "flex";
}

overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
unitOverlay.addEventListener('click', e => { if (e.target === unitOverlay) closeUnitOverlay(); });

document.addEventListener('DOMContentLoaded', () => {
    initSemesterCards();
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => loadingOverlay.classList.remove('active'), 500);
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state?.subject) {
        goBackToSubjects(); // Show subject overlay again
    } else {
        closeUnitOverlay();
        closeOverlay();
    }
});

// Make goBackToSubjects globally accessible
window.goBackToSubjects = goBackToSubjects;

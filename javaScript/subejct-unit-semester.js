const semesterGrid = document.querySelector('.pipara-academy-course-semester-grid');
const filterBtns = document.querySelectorAll('.pipara-academy-course-filter-btn');
const overlay = document.getElementById('pipara-academy-course-overlay');
const unitOverlay = document.getElementById('pipara-academy-course-unit-overlay');
const subjectList = document.getElementById('pipara-academy-course-subject-list');
const unitList = document.getElementById('pipara-academy-course-unit-list');

// Helper function to generate slugs
function generateSlug(text) {
    return encodeURIComponent(text.toLowerCase().replace(/\s+/g, '-'));
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
            // Generate slugs for subject and unit title
            const subjectSlug = generateSlug(currentSubject);
            const unitSlug = generateSlug(unit.title);
            const unitLink = `https://www.amreshthakur.com.np/${subjectSlug}/${unitSlug}`;
            const resourceType = "Tutorial";
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
                        <a href="${unitLink}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open ${resourceType}
                        </a>
                        <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
            unitCard.addEventListener('click', () => showUnitDetails(unit, unitNumber));
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
            
            // Generate slugs for subject and unit title
            const subjectSlug = generateSlug(currentSubject);
            const unitSlug = generateSlug(unitTitle);
            const unitLink = `https://www.amreshthakur.com.np/${subjectSlug}/${unitSlug}`;
            const resourceType = "Tutorial";
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
                        <a href="${unitLink}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open ${resourceType}
                        </a>
                        <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
            unitCard.addEventListener('click', () => showUnitDetails({
                title: unitTitle,
                description: getUnitDescription(i, currentSubject)
            }, i));
            unitList.appendChild(unitCard);
        }
    }
}

function showUnitDetails(unit, unitNumber) {
    // Update the overlay to show unit details
    document.getElementById("pipara-academy-course-subject-title").textContent = unit.title;
    document.getElementById("pipara-academy-course-overlay-subtitle").textContent = `Unit ${unitNumber} of ${currentSubject}`;

    // Generate slugs for subject and unit title
    const subjectSlug = generateSlug(currentSubject);
    const unitSlug = generateSlug(unit.title);
    const unitLink = `https://www.amreshthakur.com.np/${subjectSlug}/${unitSlug}`;

    // Hide the unit list and show the unit details
    document.getElementById("pipara-academy-course-unit-content").innerHTML = `
                <button class="pipara-academy-course-back-btn" onclick="goBackToUnitList()">
                    <i class="fas fa-arrow-left"></i> Back to Units
                </button>
                
                <div class="pipara-academy-course-unit-card" style="animation: none; padding: 2rem;">
                    <div class="pipara-academy-course-unit-header">
                        <div class="pipara-academy-course-unit-icon" style="width: 60px; height: 60px; font-size: 1.8rem; margin-right: 1.2rem;">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="pipara-academy-course-unit-title-container">
                            <div class="pipara-academy-course-unit-number" style="font-size: 1.1rem;">Unit ${unitNumber} of ${currentUnits.length || 5}</div>
                            <h4 style="font-size: 1.5rem; margin-bottom: 0.8rem;">${unit.title}</h4>
                        </div>
                    </div>
                    <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.5rem;">${unit.description}</p>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: #4facfe;">Topics Covered</h4>
                        <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.8rem;">
                            ${unit.topics ? unit.topics.map(topic => `
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    ${topic}
                                </li>
                            `).join('') : `
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Introduction to ${unit.title}
                                </li>
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Core concepts and principles
                                </li>
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Advanced techniques
                                </li>
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Practical applications
                                </li>
                            `}
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: #4facfe;">Learning Resources</h4>
                <!-- HTML -->
<div class="resource-links">
    <a href="${unitLink}" class="resource-btn" target="_blank">
        <i class="fas fa-book"></i> Study Material
    </a>
    <a href="${unitLink}/videos" class="resource-btn" target="_blank">
        <i class="fas fa-video"></i> Video Lectures
    </a>
    <a href="${unitLink}/exercises" class="resource-btn" target="_blank">
        <i class="fas fa-tasks"></i> Practice Exercises
    </a>
    <a href="${unitLink}/quiz" class="resource-btn" target="_blank">
        <i class="fas fa-question-circle"></i> Unit Quiz
    </a>
</div>

<!-- CSS -->
<style>
.resource-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.resource-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: #fff;
    padding: 0.75rem 1.4rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.resource-btn:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1c6396 100%);
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.resource-btn i {
    font-size: 1.1rem;
}
</style>

                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                        <a href="${unitLink}" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(46, 204, 113, 0.2); color: white; padding: 0.8rem 1.5rem; border-radius: 50px; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open Full Unit
                        </a>
                        <span class="pipara-academy-course-resource-badge" style="position: static; font-size: 0.9rem;">TUTORIAL</span>
                    </div>
                </div>
            `;
}

function goBackToUnitList() {
    // Restore the unit list view
    document.getElementById("pipara-academy-course-unit-content").innerHTML = `
                <button class="pipara-academy-course-back-btn" onclick="goBackToSubjects()">
                    <i class="fas fa-arrow-left"></i> Back to Subjects
                </button>
                <div class="pipara-academy-course-unit-list" id="pipara-academy-course-unit-list"></div>
            `;

    // Render the units again
    renderUnitCards();
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
});
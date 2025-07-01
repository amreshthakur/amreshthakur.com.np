// DOM Elements
const subjectGrid = document.getElementById('pa-subject-grid');
const unitList = document.getElementById('pa-unit-list');
const unitOverlay = document.getElementById('pa-unit-overlay');
const subjectTitle = document.getElementById('pa-subject-title');
const filterBtns = document.querySelectorAll('.pa-filter-btn');

// Helper function to generate slugs
function generateSlug(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/(^|\/)bsc-?csit-/g, '$1'); // Remove prefixes
}

// Generate unit tutorial URL with semester
function generateUnitLink(semester, subjectName, unitTitle) {
    const semesterSlug = generateSlug(semester);
    const subjectSlug = generateSlug(subjectName);
    const unitSlug = generateSlug(unitTitle);
    return `/csit/${semesterSlug}/${subjectSlug}/${unitSlug}/`;
}

// Initialize subject cards
function initSubjectCards() {
    subjectGrid.innerHTML = '';

    subjectData.forEach((subject, index) => {
        const subjectIcon = getSubjectIcon(subject.name);
        const card = document.createElement('div');
        card.className = `pa-subject-card ${subject.type}`;
        card.style.animationDelay = `${index * 0.05}s`;
        card.dataset.semester = subject.semester; // Store semester in dataset

        card.innerHTML = `
            <div class="pa-subject-header">
                <div>
                    <h3 class="pa-subject-title">${subject.name}</h3>
                    <div class="pa-subject-meta">
                        <span class="pa-semester-badge">${subject.semester.replace('-', ' ')}</span>
                        <span>${subject.units} Units</span>
                    </div>
                </div>
                <div class="pa-subject-icon">
                    <i class="fas ${subjectIcon}"></i>
                </div>
            </div>
            <div class="pa-subject-description">
                ${subject.description}
            </div>
            <div class="pa-subject-footer">
                ${subject.type === 'elective' ? 
                    '<span class="pa-resource-badge pa-elective-badge">ELECTIVE</span>' : 
                    '<span class="pa-resource-badge pa-core-count-badge">CORE</span>'}
                <span class="pa-units-count">${subject.units} Learning Units</span>
            </div>
        `;

        card.addEventListener('click', () => openUnitOverlay(subject.name, subject.semester));
        subjectGrid.appendChild(card);
    });
}

// Get appropriate icon for subject
function getSubjectIcon(subjectName) {
    const iconMap = {
        "Programming": "fa-laptop-code",
        "Artificial": "fa-brain",
        "Database": "fa-database",
        "Networks": "fa-network-wired",
        "Web": "fa-globe",
        "Operating": "fa-desktop",
        "Data Structures": "fa-sitemap",
        "Cybersecurity": "fa-shield-alt"
    };
    
    for (const key in iconMap) {
        if (subjectName.includes(key)) {
            return iconMap[key];
        }
    }
    return "fa-book";
}

// Open unit overlay with semester
function openUnitOverlay(subjectName, semester) {
    subjectTitle.textContent = subjectName;
    renderUnitCards(subjectName, semester);
    unitOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Render unit cards with semester
function renderUnitCards(subjectName, semester) {
    unitList.innerHTML = '';
    
    const units = unitData[subjectName] || [];
    const unitIcons = [
        "fa-book-open", "fa-shapes", "fa-sitemap",
        "fa-cogs", "fa-cube", "fa-project-diagram",
        "fa-palette", "fa-chart-line", "fa-code-branch", "fa-bug"
    ];

    if (units.length > 0) {
        units.forEach((unit, index) => {
            const unitNumber = index + 1;
            const iconIndex = index % unitIcons.length;
            const unitLink = generateUnitLink(semester, subjectName, unit.title);

            const unitCard = document.createElement("div");
            unitCard.className = 'pa-unit-card';
            unitCard.style.animationDelay = `${index * 0.05}s`;
            unitCard.innerHTML = `
                <div class="pa-unit-header">
                    <div class="pa-unit-icon">
                        <i class="fas ${unitIcons[iconIndex]}"></i>
                    </div>
                    <div class="pa-unit-title-container">
                        <div class="pa-unit-number">Unit ${unitNumber}</div>
                        <h4 class="pa-unit-title">${unit.title}</h4>
                    </div>
                </div>
                <p>${unit.description}</p>
                <div class="pa-tutorial-link">
                    <i class="fas fa-external-link-alt"></i> Click to open tutorial
                </div>
                <div class="pa-unit-progress">
                    <div class="pa-progress-bar"></div>
                </div>
            `;
            
            unitCard.addEventListener('click', function() {
                window.location.href = unitLink;
            });
            
            unitList.appendChild(unitCard);
        });
        
        // Initialize progress bars with random values
        setTimeout(() => {
            document.querySelectorAll('.pa-progress-bar').forEach(bar => {
                const width = Math.floor(Math.random() * 60) + 20;
                bar.style.width = `${width}%`;
            });
        }, 300);
    } else {
        unitList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.7)">
                <i class="fas fa-book" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>No Units Available</h3>
                <p>This subject doesn't have any units defined yet.</p>
            </div>
        `;
    }
}

// Close unit overlay
function closeUnitOverlay() {
    unitOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}

// Filter initialization
filterBtns.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => {
            btn.classList.remove('pa-active');
        });

        // Add active class to clicked button
        this.classList.add('pa-active');

        // Get filter type
        const filterValue = this.dataset.filter;

        // Show/hide subjects based on filter
        document.querySelectorAll('.pa-subject-card').forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'flex';
            } else {
                const cardType = card.classList.contains('core') ? 'core' : 'elective';
                card.style.display = (cardType === filterValue) ? 'flex' : 'none';
            }
        });
    });
});

// Close overlay when clicking outside the container
unitOverlay.addEventListener('click', function(e) {
    if (e.target === this) {
        closeUnitOverlay();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initSubjectCards();
});


        const subjectIcons = [
            "fa-laptop-code", "fa-microchip", "fa-paint-brush",
            "fa-diagram-project", "fa-desktop", "fa-network-wired",
            "fa-brain", "fa-database", "fa-calculator", "fa-server",
            "fa-code", "fa-shield-alt", "fa-mobile", "fa-globe"
        ];

        const unitIcons = [
            "fa-book-open", "fa-shapes", "fa-sitemap",
            "fa-cogs", "fa-cube", "fa-project-diagram",
            "fa-palette", "fa-chart-line", "fa-code-branch", "fa-bug"
        ];

        // DOM Elements
        const subjectGrid = document.getElementById('pa-subject-grid');
        const unitGrid = document.getElementById('pa-unit-grid');
        const filterBtns = document.querySelectorAll('.pa-filter-btn');
        const unitOverlay = document.getElementById('pa-unit-overlay');
        const subjectTitle = document.getElementById('pa-subject-title');
        const overlaySubtitle = document.getElementById('pa-overlay-subtitle');

        // State
        let currentSubject = "";
        let currentUnits = [];
        let isRestoringFromHistory = false;

        // Initialize subject cards
        function initSubjectCards() {
            subjectGrid.innerHTML = '';

            subjectData.forEach((subject, index) => {
                const iconIndex = index % subjectIcons.length;
                const cardType = subject.elective ? 'elective' : 'core';

                const card = document.createElement('div');
                card.className = `pa-subject-card ${cardType}`;
                card.innerHTML = `
            <div class="pa-subject-header">
                <h3 class="pa-subject-title">${subject.name}</h3>
                <div class="pa-subject-meta">
                    <span>${subject.semester}</span>
                    <span>${subject.units} Units</span>
                </div>
                <div class="pa-subject-icon">
                    <i class="fas ${subjectIcons[iconIndex]}"></i>
                </div>
            </div>
            <div class="pa-subject-description">
                ${subject.description}
            </div>
            <div class="pa-subject-footer">
                ${subject.elective ?
                        '<span class="pa-resource-badge">ELECTIVE</span>' :
                        '<span class="pa-resource-badge">CORE</span>'}
                <span class="pa-units-count">${subject.units} Learning Units</span>
            </div>
        `;

                card.addEventListener('click', () => openUnitOverlay(subject.name));
                subjectGrid.appendChild(card);
            });

            // Initialize progress bars
            setTimeout(() => {
                document.querySelectorAll('.pa-progress-bar').forEach(bar => {
                    const width = Math.floor(Math.random() * 60) + 20;
                    bar.style.width = `${width}%`;
                });
            }, 300);
        }

        // Generate slugs for URLs
        function generateSlug(text) {
            return text.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-');
        }

        // Generate unit links with semester
        function generateUnitLink(semester, subject, unitTitle) {
            const courseSlug = "csit";
            const semesterSlug = generateSlug(semester);
            const subjectSlug = generateSlug(subject);
            const unitSlug = generateSlug(unitTitle);
            return `/${courseSlug}/${semesterSlug}/${subjectSlug}/${unitSlug}/`;
        }

        // Open unit overlay with history state management
        function openUnitOverlay(subjectName, fromHistory = false) {
            currentSubject = subjectName;
            subjectTitle.textContent = subjectName;
            overlaySubtitle.textContent = "Select a unit to open its tutorial";

            // Only push state if not restoring from history
            if (!fromHistory) {
                history.pushState({ overlay: subjectName }, '');
            }

            currentUnits = unitData[subjectName] || generateDefaultUnits(subjectName);

            renderUnitCards();

            unitOverlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

        // Render unit cards
        function renderUnitCards() {
            unitGrid.innerHTML = '';

            const subjectObj = subjectData.find(s => s.name === currentSubject);
            const semester = subjectObj ? subjectObj.semester : 'unknown-semester';

            if (currentUnits.length > 0) {
                currentUnits.forEach((unit, index) => {
                    const unitNumber = index + 1;
                    const unitLink = generateUnitLink(semester, currentSubject, unit.title);
                    const iconIndex = index % unitIcons.length;

                    const unitCard = document.createElement('div');
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

                    // Direct navigation without loading overlay
                    unitCard.addEventListener('click', () => {
                        window.location.href = unitLink;
                    });

                    unitGrid.appendChild(unitCard);
                });
            }

            setTimeout(() => {
                document.querySelectorAll('.pa-progress-bar').forEach(bar => {
                    const width = Math.floor(Math.random() * 60) + 20;
                    bar.style.width = `${width}%`;
                });
            }, 300);
        }

        // Generate default units
        function generateDefaultUnits(subjectName) {
            const unitThemes = [
                "Fundamentals and Introduction",
                "Core Concepts and Principles",
                "Advanced Techniques",
                "Practical Applications",
                "Case Studies and Real-world Examples",
                "Implementation and Optimization",
                "Advanced Topics and Research",
                "Future Directions and Trends"
            ];

            return unitThemes.map((theme, index) => ({
                title: `${theme} of ${subjectName}`,
                description: `This unit covers ${theme.toLowerCase()} related to ${subjectName}`
            }));
        }

        // Close unit overlay
        function closeUnitOverlay() {
            unitOverlay.style.display = "none";
            document.body.style.overflow = "auto";
        }

        // Filter buttons
        filterBtns.forEach(button => {
            button.addEventListener('click', function () {
                filterBtns.forEach(btn => btn.classList.remove('pa-active'));
                this.classList.add('pa-active');

                const filterValue = this.dataset.filter;
                const subjectCards = document.querySelectorAll('.pa-subject-card');
                subjectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (filterValue === 'core') {
                        card.style.display = card.classList.contains('core') ? 'block' : 'none';
                    } else if (filterValue === 'elective') {
                        card.style.display = card.classList.contains('elective') ? 'block' : 'none';
                    }
                });
            });
        });

        // History state management
        window.addEventListener('popstate', function (event) {
            if (event.state && event.state.overlay) {
                // Restore overlay from history
                isRestoringFromHistory = true;
                openUnitOverlay(event.state.overlay, true);
                isRestoringFromHistory = false;
            } else {
                // Close overlay when going back
                closeUnitOverlay();
            }
        });

        // Close overlay on outside click
        unitOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                history.back();
            }
        });

        // Initialize app
        document.addEventListener('DOMContentLoaded', () => {
            initSubjectCards();

            // Restore overlay state if present in history
            if (history.state && history.state.overlay) {
                isRestoringFromHistory = true;
                openUnitOverlay(history.state.overlay, true);
                isRestoringFromHistory = false;
            }
        });
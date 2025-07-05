// ==================================================================================================================================================================================
  // DOM Elements
        const semesterGrid = document.getElementById('pa-semester-grid');
        const subjectList = document.getElementById('pa-subject-list');
        const unitList = document.getElementById('pa-unit-list');
        const subjectOverlay = document.getElementById('pa-subject-overlay');
        const unitOverlay = document.getElementById('pa-unit-overlay');
        const semesterTitle = document.getElementById('pa-semester-title');
        const subjectTitle = document.getElementById('pa-subject-title');
        const overlaySubtitle = document.getElementById('pa-overlay-subtitle');
        const filterBtns = document.querySelectorAll('.pa-filter-btn');
        const searchInput = document.querySelector('.pa-search-input');
        
        // Search elements
        const searchOverlay = document.getElementById('pa-search-overlay');
        const searchTriggerInput = document.getElementById('paSearchTriggerInput');
        const searchCloseBtn = document.getElementById('paSearchCloseBtn');
        const searchBoxInner = document.getElementById('paSearchBoxInner');
        const searchInputField = document.getElementById('paSearchInput');
        const searchResultsGrid = document.getElementById('paSearchResultsGrid');
        const searchResultCount = document.getElementById('paSearchResultCount');
        const searchTime = document.getElementById('paSearchTime');
        const searchFilterBtns = document.querySelectorAll('.pa-search-filter-btn');

        // Store current state
        let currentSubject = "";
        let currentSemesterTitle = "";
        let currentSemesterData = [];
        let currentSearchFilter = "all";

        // Helper function to generate slugs
        function generateSlug(text) {
            return text.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-');
        }

        // Generate proper URL structure
        function generateUnitLink(subject, unitTitle) {
            const courseSlug = "csit";
            const semesterSlug = generateSlug(currentSemesterTitle);
            const subjectSlug = generateSlug(subject);
            const unitSlug = generateSlug(unitTitle);
            return `${courseSlug}/${semesterSlug}/${subjectSlug}/${unitSlug}/`;
        }

        // Initialize semester cards
        function initSemesterCards() {
            semesterGrid.innerHTML = '';

            semesterData.forEach((semester, index) => {
                // Calculate core and elective counts
                const coreCount = semester.subjects.filter(s => !s.elective).length;
                const electiveCount = semester.subjects.filter(s => s.elective).length;

                const card = document.createElement('div');
                card.className = 'pa-semester-card';
                if (electiveCount > 0) {
                    card.classList.add('elective');
                }
                card.style.animationDelay = `${index * 0.1}s`;

                card.innerHTML = `
                    <div class="pa-semester-number">${index + 1}</div>
                    <div class="pa-semester-content">
                        <h2>${semester.title}</h2>
                        <p>${semester.description}</p>
                        <span class="pa-subjects-count">${semester.subjects.length} Subjects</span>
                        <div class="pa-subject-breakdown">
                            <span class="pa-core-count">${coreCount} Core</span>
                            <span class="pa-elective-count">${electiveCount} Electives</span>
                        </div>
                    </div>
                `;

                card.addEventListener('click', () => openSubjectOverlay(semester.title, semester.subjects));
                semesterGrid.appendChild(card);
            });
        }

        function openSubjectOverlay(title, subjects) {
            currentSemesterData = subjects;
            currentSemesterTitle = title;
            semesterTitle.textContent = title;
            renderSubjectCards();
            subjectOverlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

        function renderSubjectCards() {
            subjectList.innerHTML = "";

            const subjectIcons = [
                "fa-laptop-code", "fa-microchip", "fa-paint-brush",
                "fa-diagram-project", "fa-desktop", "fa-network-wired",
                "fa-brain", "fa-database", "fa-calculator", "fa-server",
                "fa-code", "fa-shield-alt", "fa-mobile", "fa-globe"
            ];

            currentSemesterData.forEach((subject, index) => {
                const unitCount = subjectUnits[subject.name] ? subjectUnits[subject.name].length : 5;
                const iconIndex = index % subjectIcons.length;
                const cardType = subject.elective ? 'elective' : 'core';

                const card = document.createElement("div");
                card.className = `pa-subject-card ${cardType}`;
                card.style.animationDelay = `${index * 0.05}s`;
                card.innerHTML = `
                    <div class="pa-subject-header">
                        <div>
                            <h3 class="pa-subject-title">${subject.name}</h3>
                            <div class="pa-subject-meta">
                                <span>${currentSemesterTitle}</span>
                                <span>${unitCount} Units</span>
                            </div>
                        </div>
                        <div class="pa-subject-icon">
                            <i class="fas ${subjectIcons[iconIndex]}"></i>
                        </div>
                    </div>
                    <div class="pa-subject-description">
                        ${getSubjectDescription(subject.name)}
                    </div>
                    <div class="pa-subject-footer">
                        ${subject.elective ? 
                            '<span class="pa-resource-badge pa-elective-badge">ELECTIVE</span>' : 
                            '<span class="pa-resource-badge pa-core-count-badge">CORE</span>'}
                        <span class="pa-units-count">${unitCount} Learning Units</span>
                    </div>
                `;
                card.addEventListener('click', () => openUnitOverlay(subject.name));
                subjectList.appendChild(card);
            });
        }

        function getSubjectDescription(subjectName) {
            return subjectData[subjectName]?.description || "Comprehensive study of concepts and principles in this subject area.";
        }

        function closeSubjectOverlay() {
            subjectOverlay.style.display = "none";
            document.body.style.overflow = "auto";
        }

        function openUnitOverlay(subjectName) {
            currentSubject = subjectName;
            subjectTitle.textContent = subjectName;
            overlaySubtitle.textContent = "Select a unit to open its tutorial";

            // Get units for this subject
            const units = subjectUnits[subjectName] || generateDefaultUnits(subjectName);

            // Render unit cards
            renderUnitCards(units);

            unitOverlay.style.display = "flex";
            subjectOverlay.style.display = "none";
        }

        function renderUnitCards(units) {
            unitList.innerHTML = "";
            
            const unitIcons = [
                "fa-book-open", "fa-shapes", "fa-sitemap",
                "fa-cogs", "fa-cube", "fa-project-diagram",
                "fa-palette", "fa-chart-line", "fa-code-branch", "fa-bug"
            ];

            if (units.length > 0) {
                units.forEach((unit, index) => {
                    const unitNumber = index + 1;
                    // Generate proper unit link
                    const unitLink = generateUnitLink(currentSubject, unit.title);
                    const iconIndex = index % unitIcons.length;

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
            }
        }

        function generateDefaultUnits(subjectName) {
            const unitThemes = [
                "Fundamentals and Introduction",
                "Core Concepts and Principles",
                "Advanced Techniques",
                "Practical Applications",
                "Case Studies and Real-world Examples"
            ];

            return unitThemes.map((theme, index) => ({
                title: `${theme} of ${subjectName}`,
                description: `This unit covers ${theme.toLowerCase()} related to ${subjectName}`
            }));
        }

        function closeUnitOverlay() {
            unitOverlay.style.display = "none";
            document.body.style.overflow = "auto";
        }

        function goBackToSubjects() {
            unitOverlay.style.display = "none";
            subjectOverlay.style.display = "flex";
        }

        // Filter initialization
        filterBtns.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(btn => {
                    btn.classList.remove('pa-active');
                });

                // Add active class to clicked button
                this.classList.add('pa-active');

                // Get filter type
                const filterValue = this.dataset.filter;

                // Show/hide courses based on filter
                document.querySelectorAll('.pa-semester-card').forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
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

        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (!searchTerm) {
                document.querySelectorAll('.pa-semester-card').forEach(card => card.style.display = 'block');
                return;
            }
            
            document.querySelectorAll('.pa-semester-card').forEach(card => {
                const semesterIndex = Array.from(semesterGrid.children).indexOf(card);
                const semester = semesterData[semesterIndex];
                
                // Check if semester title or description matches
                const matchesSemester = semester.title.toLowerCase().includes(searchTerm) || 
                                       semester.description.toLowerCase().includes(searchTerm);
                
                // Check if any subject in the semester matches
                const matchesSubject = semester.subjects.some(subject => 
                    subject.name.toLowerCase().includes(searchTerm) || 
                    getSubjectDescription(subject.name).toLowerCase().includes(searchTerm)
                );
                
                card.style.display = (matchesSemester || matchesSubject) ? 'block' : 'none';
            });
        });

        // Close overlays when clicking outside the container
        subjectOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeSubjectOverlay();
            }
        });

        unitOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeUnitOverlay();
            }
        });

        // ========================================================================================
        // Search functionality for curriculum (Improved Link Handling)
        // ========================================================================================

        // Toggle search overlay
        function toggleSearchOverlay(show) {
            if (show) {
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                searchInputField.focus();
            } else {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Event listeners for search
        searchTriggerInput.addEventListener('click', () => toggleSearchOverlay(true));
        searchCloseBtn.addEventListener('click', () => toggleSearchOverlay(false));
        document.addEventListener('keydown', e => e.key === 'Escape' && toggleSearchOverlay(false));
        searchOverlay.addEventListener('click', e => e.target === searchOverlay && toggleSearchOverlay(false));

        searchInputField.addEventListener('focus', () => searchBoxInner.classList.add('focused'));
        searchInputField.addEventListener('blur', () => searchBoxInner.classList.remove('focused'));

        searchFilterBtns.forEach(btn => btn.addEventListener('click', () => {
            searchFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSearchFilter = btn.dataset.filter;
            triggerSearch();
        }));

        searchInputField.addEventListener('input', triggerSearch);

        function triggerSearch() {
            const query = searchInputField.value.trim();
            const { results, searchTime: time } = searchCurriculum(query, currentSearchFilter);

            searchResultCount.textContent = `${results.length} ${results.length === 1 ? 'result' : 'results'}`;
            searchTime.textContent = `${time}ms`;
            
            renderSearchResults(results, query);
        }

        function toSlug(str) {
            return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }

        function getSemesterSlug(title) {
            const map = {
                "First Semester": "first-semester",
                "Second Semester": "second-semester",
                "Third Semester": "third-semester",
                "Fourth Semester": "fourth-semester",
                "Fifth Semester": "fifth-semester",
                "Sixth Semester": "sixth-semester",
                "Seventh Semester": "seventh-semester",
                "Eighth Semester": "eighth-semester"
            };
            return map[title] || toSlug(title);
        }

        function highlight(text, query) {
            if (!query) return text;
            return text.replace(new RegExp(`(${query})`, 'gi'), '<span class="pa-highlight">$1</span>');
        }

        function searchCurriculum(query, filter) {
            const t0 = performance.now();
            const q = query.toLowerCase();
            const results = [];

            const match = txt => txt?.toLowerCase().includes(q);

            semesterData.forEach((semester, si) => {
                const semSlug = getSemesterSlug(semester.title);

                if ((filter === 'all' || filter === 'semester') && (match(semester.title) || match(semester.description))) {
                    results.push({
                        type: 'semester',
                        title: semester.title,
                        description: semester.description,
                        subjects: semester.subjects.length,
                        core: semester.subjects.filter(s => !s.elective).length,
                        electives: semester.subjects.filter(s => s.elective).length,
                        // Make root-relative link
                        link: `/csit/${semSlug}/`,
                        semesterIndex: si
                    });
                }

                semester.subjects.forEach(subject => {
                    const subjSlug = toSlug(subject.name);

                    if ((filter === 'all' || filter === 'subject') && (match(subject.name) || match(subject.description))) {
                        results.push({
                            type: 'subject',
                            title: subject.name,
                            description: subject.description,
                            semester: semester.title,
                            // Make root-relative link
                            link: `/csit/${semSlug}/${subjSlug}/`,
                            elective: subject.elective
                        });
                    }

                    const units = subjectUnits[subject.name] || [];
                    units.forEach(unit => {
                        if ((filter === 'all' || filter === 'unit') && (match(unit.title) || match(unit.description))) {
                            results.push({
                                type: 'unit',
                                title: unit.title,
                                description: unit.description,
                                subject: subject.name,
                                semester: semester.title,
                                // Make root-relative link
                                link: `/csit/${semSlug}/${subjSlug}/${toSlug(unit.title)}`
                            });
                        }
                    });
                });
            });

            return { results: results.slice(0, 18), searchTime: (performance.now() - t0).toFixed(2) };
        }

        function renderSearchResults(results, query) {
            searchResultsGrid.innerHTML = '';
            if (!results.length) {
                searchResultsGrid.innerHTML = `<div class="pa-search-no-results">
                    <i class="fas fa-${query ? 'frown' : 'search'}"></i>
                    <h3>${query ? 'No results found' : 'Search the Curriculum'}</h3>
                    <p>${query ? `We couldn't find any matches for "${query}".` : 'Enter keywords related to semesters, subjects, units, or topics.'}</p>
                    <div class="pa-search-quick-links">
                        <div class="pa-search-quick-link">Computer Networks</div>
                        <div class="pa-search-quick-link">Algorithms</div>
                        <div class="pa-search-quick-link">Database</div>
                        <div class="pa-search-quick-link">Fourth Semester</div>
                    </div>
                </div>`;
                
                // Add click handlers for quick links
                document.querySelectorAll('.pa-search-quick-link').forEach(link => {
                    link.addEventListener('click', () => {
                        searchInputField.value = link.textContent;
                        triggerSearch();
                    });
                });
                return;
            }

            results.forEach((r, i) => {
                const card = document.createElement('div');
                card.className = 'pa-search-result-card';
                
                if (r.type === 'semester') {
                    card.style.setProperty('--delay', r.semesterIndex);
                    card.innerHTML = `
                        <div class="pa-search-result-number">${i + 1}</div>
                        <div class="pa-search-result-type">Semester</div>
                        <h3 class="pa-search-result-title">${highlight(r.title, query)}</h3>
                        <p class="pa-search-result-description">${highlight(r.description, query)}</p>
                        <div class="pa-search-result-meta">
                            <span>${r.subjects} Subjects</span>
                            <span>${r.core} Core</span>
                            <span>${r.electives} Electives</span>
                        </div>
                        <a href="${r.link}" class="pa-search-result-link">View Semester <i class="fas fa-arrow-right"></i></a>
                    `;
                } else {
                    const icon = r.type === 'subject' ? 'book' : 'file-alt';
                    const color = r.type === 'subject' ? '#4a69bd' : '#b21f1f';
                    const bg = color.replace('#', '');
                    const title = r.type.charAt(0).toUpperCase() + r.type.slice(1);

                    card.innerHTML = `
                        <div class="pa-search-result-number">${i + 1}</div>
                        <div class="pa-search-result-type" style="background: rgba(${bg === '4a69bd' ? '74,105,189' : '178,31,31'},0.2); color: ${color}">${title}</div>
                        <h3 class="pa-search-result-title">${highlight(r.title, query)}</h3>
                        <p class="pa-search-result-description">${highlight(r.description || '', query)}</p>
                        <div class="pa-search-result-meta">
                            ${r.semester ? `<span><i class="fas fa-calendar-alt"></i> ${highlight(r.semester, query)}</span>` : ''}
                            ${r.subject ? `<span><i class="fas fa-book"></i> ${highlight(r.subject, query)}</span>` : ''}
                            ${r.elective ? '<span class="pa-resource-badge pa-elective-badge">ELECTIVE</span>' : ''}
                        </div>
                        <a href="${r.link}" class="pa-search-result-link">View ${title} <i class="fas fa-arrow-right"></i></a>
                    `;
                }

                // Improved click handling
                card.addEventListener('click', (e) => {
                    // Ignore if clicked on anchor element
                    if (e.target.tagName === 'A') return;
                    
                    // Navigate to original link
                    window.location.href = r.link;
                });

                searchResultsGrid.appendChild(card);
            });
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            initSemesterCards();
        });


        // DOM elements
        const semesterGrid = document.querySelector('.pipara-academy-course-semester-grid');
        const filterBtns = document.querySelectorAll('.pipara-academy-course-filter-btn');
        const overlay = document.getElementById('pipara-academy-course-overlay');
        const unitOverlay = document.getElementById('pipara-academy-course-unit-overlay');
        const smallCardViewBtn = document.getElementById('smallCardViewBtn');
        const wideCardViewBtn = document.getElementById('wideCardViewBtn');
        const unitSmallCardViewBtn = document.getElementById('unitSmallCardViewBtn');
        const unitWideCardViewBtn = document.getElementById('unitWideCardViewBtn');
        const subjectSmallCardViewBtn = document.getElementById('subjectSmallCardViewBtn');
        const subjectWideCardViewBtn = document.getElementById('subjectWideCardViewBtn');
        const unitList = document.getElementById('pipara-academy-course-unit-list');
        const wideUnitList = document.getElementById('pipara-academy-course-wide-unit-list');
        const subjectListSmall = document.getElementById('pipara-academy-course-subject-list-small');
        const subjectListWide = document.getElementById('pipara-academy-course-subject-list-wide');

        // Store current state
        let currentSubject = "";
        let currentSemesterTitle = "";
        let currentUnits = [];
        let currentView = "small";
        let unitView = "small";
        let subjectView = "small";
        let currentSemesterData = []; // Store current semester subjects

        // Initialize view toggle buttons
        smallCardViewBtn.addEventListener('click', () => {
            setView('small');
        });

        wideCardViewBtn.addEventListener('click', () => {
            setView('wide');
        });

        unitSmallCardViewBtn.addEventListener('click', () => {
            setUnitView('small');
        });

        unitWideCardViewBtn.addEventListener('click', () => {
            setUnitView('wide');
        });

        subjectSmallCardViewBtn.addEventListener('click', () => {
            setSubjectView('small');
        });

        subjectWideCardViewBtn.addEventListener('click', () => {
            setSubjectView('wide');
        });

        function setView(viewType) {
            currentView = viewType;
            smallCardViewBtn.classList.toggle('pipara-academy-course-active', viewType === 'small');
            wideCardViewBtn.classList.toggle('pipara-academy-course-active', viewType === 'wide');
            initSemesterCards();
        }

        function setUnitView(viewType) {
            unitView = viewType;
            unitSmallCardViewBtn.classList.toggle('pipara-academy-course-active', viewType === 'small');
            unitWideCardViewBtn.classList.toggle('pipara-academy-course-active', viewType === 'wide');
            
            if (viewType === 'small') {
                unitList.style.display = 'grid';
                wideUnitList.style.display = 'none';
            } else {
                unitList.style.display = 'none';
                wideUnitList.style.display = 'block';
                renderWideUnitCards();
            }
        }

        function setSubjectView(viewType) {
            subjectView = viewType;
            subjectSmallCardViewBtn.classList.toggle('pipara-academy-course-active', viewType === 'small');
            subjectWideCardViewBtn.classList.toggle('pipara-academy-course-active', viewType === 'wide');
            
            if (viewType === 'small') {
                subjectListSmall.style.display = 'grid';
                subjectListWide.style.display = 'none';
                renderSmallSubjectCards();
            } else {
                subjectListSmall.style.display = 'none';
                subjectListWide.style.display = 'flex';
                renderWideSubjectCards();
            }
        }

        // Filter initialization
        document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(button => {
            button.addEventListener('click', function() {
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
                        card.style.display = card.classList.contains(filterValue) 
                            ? 'block' 
                            : 'none';
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
                
                if (currentView === 'small') {
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
                } else {
                    // Wide card view
                    card.innerHTML = `
                        <div class="pipara-academy-course-semester-number">${index + 1}</div>
                        <h2>${semester.title}</h2>
                        <p>${semester.description}</p>
                        <div class="pipara-academy-course-subject-breakdown">
                            <span class="pipara-academy-course-core-count">${coreCount} Core Subjects</span>
                            <span class="pipara-academy-course-elective-count">${electiveCount} Electives</span>
                        </div>
                        <div class="pipara-academy-course-subject-list" style="margin-top: 1rem;">
                            ${semester.subjects.map(subject => `
                                <div class="pipara-academy-course-subject-item" style="margin-bottom: 0.8rem; padding: 1rem;">
                                    <h3 class="pipara-academy-course-subject-title" style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                                        <i class="fas ${subject.elective ? 'fa-star' : 'fa-book'}"></i>
                                        ${subject.name}
                                    </h3>
                                    <p class="pipara-academy-course-subject-desc" style="font-size: 0.9rem;">${subject.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
                
                card.addEventListener('click', () => openOverlay(semester.title, semester.subjects));
                semesterGrid.appendChild(card);
            });
        }

        // Filter subjects
        function filterSubjects(filter) {
            filterBtns.forEach(btn => {
                btn.classList.remove('pipara-academy-course-active');
                if(btn.dataset.filter === filter) {
                    btn.classList.add('pipara-academy-course-active');
                }
            });
            
            // For this implementation, filtering is at semester level
            initSemesterCards();
        }

        // Initialize filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterSubjects(btn.dataset.filter);
            });
        });

        function openOverlay(title, subjects) {
            currentSemesterData = subjects;
            currentSemesterTitle = title;
            document.getElementById("pipara-academy-course-semester-title").textContent = title;
            
            // Reset to small card view when opening subject overlay
            setSubjectView('small');
            
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

        function renderSmallSubjectCards() {
            subjectListSmall.innerHTML = "";
            
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
                subjectListSmall.appendChild(card);
            });
        }
        
        function renderWideSubjectCards() {
            subjectListWide.innerHTML = "";
            
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
                card.className = `pipara-academy-course-subject-card ${subject.elective ? 'elective' : ''}`;
                card.innerHTML = `
                    <div class="pipara-academy-course-subject-card-header">
                        <h3 class="pipara-academy-course-subject-card-title ${subject.elective ? 'elective' : ''}">
                            <i class="fas ${subjectIcons[iconIndex]}"></i>
                            ${subject.name}
                        </h3>
                        ${subject.elective ? '<span class="pipara-academy-course-subject-card-type">ELECTIVE</span>' : ''}
                    </div>
                    <div class="pipara-academy-course-subject-card-desc">
                        ${subject.description}
                    </div>
                    <div class="pipara-academy-course-subject-card-footer">
                        <div class="pipara-academy-course-subject-card-units">
                            ${unitCount} Units
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => openUnitOverlay(subject.name));
                subjectListWide.appendChild(card);
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
            
            // Reset to small card view when opening unit overlay
            setUnitView('small');
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
                    const unitLink = `https://www.amreshthakur.com.np/${encodeURIComponent(currentSubject.toLowerCase().replace(/\s+/g, '-'))}/unit-${unitNumber}`;
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
                                <h4>${unit}</h4>
                            </div>
                        </div>
                        <p>Detailed content for ${unit}</p>
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
                    const unitLink = `https://www.amreshthakur.com.np/${encodeURIComponent(currentSubject.toLowerCase().replace(/\s+/g, '-'))}/unit-${i}`;
                    const resourceType = "Tutorial";
                    const themeIndex = (i-1) % unitThemes.length;
                    const iconIndex = (i-1) % unitIcons.length;
                    
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
                                <h4>${unitThemes[themeIndex]}</h4>
                            </div>
                        </div>
                        <p>Detailed content for ${unitThemes[themeIndex]}</p>
                        <a href="${unitLink}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open ${resourceType}
                        </a>
                        <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
                    unitCard.addEventListener('click', () => showUnitDetails({
                        title: unitThemes[themeIndex],
                        description: "Detailed content for " + unitThemes[themeIndex]
                    }, i));
                    unitList.appendChild(unitCard);
                }
            }
        }
        
        function renderWideUnitCards() {
            wideUnitList.innerHTML = "";
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
                    const unitLink = `https://www.amreshthakur.com.np/${encodeURIComponent(currentSubject.toLowerCase().replace(/\s+/g, '-'))}/unit-${unitNumber}`;
                    const resourceType = "Tutorial";
                    const iconIndex = index % unitIcons.length;
                    
                    const wideUnitCard = document.createElement("div");
                    wideUnitCard.className = "pipara-academy-course-wide-unit-card";
                    wideUnitCard.innerHTML = `
                        <div class="pipara-academy-course-wide-unit-header">
                            <div class="pipara-academy-course-wide-unit-icon">
                                <i class="fas ${unitIcons[iconIndex]}"></i>
                            </div>
                            <div class="pipara-academy-course-wide-unit-title-container">
                                <h3>${unit}</h3>
                                <div class="pipara-academy-course-wide-unit-number">Unit ${unitNumber} of ${currentUnits.length}</div>
                            </div>
                        </div>
                        <div class="pipara-academy-course-unit-progress-wide">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                        <p class="pipara-academy-course-wide-unit-desc">Detailed content for ${unit}</p>
                        
                        <div class="pipara-academy-course-unit-topics">
                            <h4>Topics Covered</h4>
                            <ul class="pipara-academy-course-topic-list">
                                <li class="pipara-academy-course-topic-item">Topic 1: Introduction</li>
                                <li class="pipara-academy-course-topic-item">Topic 2: Core Concepts</li>
                                <li class="pipara-academy-course-topic-item">Topic 3: Practical Applications</li>
                                <li class="pipara-academy-course-topic-item">Topic 4: Case Studies</li>
                            </ul>
                        </div>
                        
                        <div class="pipara-academy-course-unit-resources">
                            <h4>Learning Resources</h4>
                            <div class="pipara-academy-course-resource-list">
                                <a href="${unitLink}" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-book"></i> Study Material
                                </a>
                                <a href="${unitLink}/videos" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-video"></i> Video Lectures
                                </a>
                                <a href="${unitLink}/exercises" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-tasks"></i> Practice Exercises
                                </a>
                                <a href="${unitLink}/quiz" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-question-circle"></i> Unit Quiz
                                </a>
                            </div>
                        </div>
                        
                        <div class="pipara-academy-course-wide-unit-footer">
                            <a href="${unitLink}" class="pipara-academy-course-resource-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Open Unit
                            </a>
                            <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        </div>
                    `;
                    wideUnitList.appendChild(wideUnitCard);
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
                    const unitLink = `https://www.amreshthakur.com.np/${encodeURIComponent(currentSubject.toLowerCase().replace(/\s+/g, '-'))}/unit-${i}`;
                    const resourceType = "Tutorial";
                    const themeIndex = (i-1) % unitThemes.length;
                    const iconIndex = (i-1) % unitIcons.length;
                    
                    const wideUnitCard = document.createElement("div");
                    wideUnitCard.className = "pipara-academy-course-wide-unit-card";
                    wideUnitCard.innerHTML = `
                        <div class="pipara-academy-course-wide-unit-header">
                            <div class="pipara-academy-course-wide-unit-icon">
                                <i class="fas ${unitIcons[iconIndex] || 'fa-book'}"></i>
                            </div>
                            <div class="pipara-academy-course-wide-unit-title-container">
                                <h3>${unitThemes[themeIndex]}</h3>
                                <div class="pipara-academy-course-wide-unit-number">Unit ${i} of 5</div>
                            </div>
                        </div>
                        <div class="pipara-academy-course-unit-progress-wide">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                        <p class="pipara-academy-course-wide-unit-desc">Detailed content for ${unitThemes[themeIndex]}</p>
                        
                        <div class="pipara-academy-course-unit-topics">
                            <h4>Topics Covered</h4>
                            <ul class="pipara-academy-course-topic-list">
                                <li class="pipara-academy-course-topic-item">Topic 1: Introduction</li>
                                <li class="pipara-academy-course-topic-item">Topic 2: Core Concepts</li>
                                <li class="pipara-academy-course-topic-item">Topic 3: Practical Applications</li>
                                <li class="pipara-academy-course-topic-item">Topic 4: Case Studies</li>
                            </ul>
                        </div>
                        
                        <div class="pipara-academy-course-unit-resources">
                            <h4>Learning Resources</h4>
                            <div class="pipara-academy-course-resource-list">
                                <a href="${unitLink}" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-book"></i> Study Material
                                </a>
                                <a href="${unitLink}/videos" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-video"></i> Video Lectures
                                </a>
                                <a href="${unitLink}/exercises" class="pipara-academy-course-resource-link" target="_blank">
                                    <i class="fas fa-tasks"></i> Practice Exercises
                                </a>
                            </div>
                        </div>
                        
                        <div class="pipara-academy-course-wide-unit-footer">
                            <a href="${unitLink}" class="pipara-academy-course-resource-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Open Unit
                            </a>
                            <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        </div>
                    `;
                    wideUnitList.appendChild(wideUnitCard);
                }
            }
        }

        function showUnitDetails(unit, unitNumber) {
            // Update the overlay to show unit details
            document.getElementById("pipara-academy-course-subject-title").textContent = unit;
            document.getElementById("pipara-academy-course-overlay-subtitle").textContent = `Unit ${unitNumber} of ${currentSubject}`;
            
            const unitLink = `https://www.amreshthakur.com.np/${encodeURIComponent(currentSubject.toLowerCase().replace(/\s+/g, '-'))}/unit-${unitNumber}`;
            
            // Hide the unit list and show the unit details
            document.getElementById("pipara-academy-course-unit-content").innerHTML = `
                <button class="pipara-academy-course-back-btn" onclick="goBackToUnitList()">
                    <i class="fas fa-arrow-left"></i> Back to Units
                </button>
                
                <div class="pipara-academy-course-wide-unit-card">
                    <div class="pipara-academy-course-wide-unit-header">
                        <div class="pipara-academy-course-wide-unit-icon" style="background: rgba(52, 152, 219, 0.2);">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="pipara-academy-course-wide-unit-title-container">
                            <h3>${unit}</h3>
                            <div class="pipara-academy-course-wide-unit-number">Unit ${unitNumber} of ${currentUnits.length || 5}</div>
                        </div>
                    </div>
                    
                    <div class="pipara-academy-course-unit-progress-wide">
                        <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                    </div>
                    
                    <p class="pipara-academy-course-wide-unit-desc">Detailed content for ${unit}</p>
                    
                    <div class="pipara-academy-course-unit-topics">
                        <h4>Topics Covered</h4>
                        <ul class="pipara-academy-course-topic-list">
                            <li class="pipara-academy-course-topic-item">Introduction to ${unit}</li>
                            <li class="pipara-academy-course-topic-item">Core concepts and principles</li>
                            <li class="pipara-academy-course-topic-item">Advanced techniques</li>
                            <li class="pipara-academy-course-topic-item">Practical applications</li>
                        </ul>
                    </div>
                    
                    <div class="pipara-academy-course-unit-resources">
                        <h4>Learning Resources</h4>
                        <div class="pipara-academy-course-resource-list">
                            <a href="${unitLink}" class="pipara-academy-course-resource-link" target="_blank">
                                <i class="fas fa-book"></i> Study Material
                            </a>
                            <a href="${unitLink}/videos" class="pipara-academy-course-resource-link" target="_blank">
                                <i class="fas fa-video"></i> Video Lectures
                            </a>
                            <a href="${unitLink}/exercises" class="pipara-academy-course-resource-link" target="_blank">
                                <i class="fas fa-tasks"></i> Practice Exercises
                            </a>
                            <a href="${unitLink}/quiz" class="pipara-academy-course-resource-link" target="_blank">
                                <i class="fas fa-question-circle"></i> Unit Quiz
                            </a>
                        </div>
                    </div>
                    
                    <div class="pipara-academy-course-wide-unit-footer">
                        <a href="${unitLink}" class="pipara-academy-course-resource-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open Full Unit
                        </a>
                        <span class="pipara-academy-course-resource-badge">TUTORIAL</span>
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
                <div class="pipara-academy-course-view-toggle">
                    <button class="pipara-academy-course-view-btn pipara-academy-course-active" id="unitSmallCardViewBtn">
                        <i class="fas fa-th"></i> Small Cards
                    </button>
                    <button class="pipara-academy-course-view-btn" id="unitWideCardViewBtn">
                        <i class="fas fa-list"></i> Wide Cards
                    </button>
                </div>
                <div id="pipara-academy-course-unit-content-inner">
                    <div class="pipara-academy-course-unit-list" id="pipara-academy-course-unit-list"></div>
                    <div class="pipara-academy-course-wide-unit-list" id="pipara-academy-course-wide-unit-list" style="display:none"></div>
                </div>
            `;
            
            // Reinitialize the buttons
            document.getElementById('unitSmallCardViewBtn').addEventListener('click', () => setUnitView('small'));
            document.getElementById('unitWideCardViewBtn').addEventListener('click', () => setUnitView('wide'));
            
            // Render the units again
            renderUnitCards();
            if (unitView === 'wide') {
                renderWideUnitCards();
                document.getElementById('pipara-academy-course-unit-list').style.display = 'none';
                document.getElementById('pipara-academy-course-wide-unit-list').style.display = 'block';
            }
        }

        function closeUnitOverlay() {
            unitOverlay.style.display = "none";
            document.body.style.overflow = "auto";
        }

        function goBackToSubjects() {
            unitOverlay.style.display = "none";
            overlay.style.display = "flex";
            
            // Re-render subject cards to ensure they appear
            if (subjectView === 'small') {
                renderSmallSubjectCards();
            } else {
                renderWideSubjectCards();
            }
        }

        // Close overlays when clicking outside the container
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeOverlay();
            }
        });
        
        unitOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeUnitOverlay();
            }
        });

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            initSemesterCards();
        });
  document.addEventListener('DOMContentLoaded', function() {
            // Get DOM elements
            // const menuToggle = document.getElementById('menuToggle');
            // const mobileSidebar = document.getElementById('mobileSidebar');
            // const sidebarOverlay = document.getElementById('sidebarOverlay');
            // const leftSidebar = document.getElementById('leftSidebar');
            const contentDisplay = document.getElementById('contentDisplay');
            const menuLinks = document.querySelectorAll('.menu-link');
            
            // Copy desktop sidebar content to mobile sidebar
            // if (leftSidebar && mobileSidebar) {
            //     mobileSidebar.innerHTML = leftSidebar.innerHTML;
            // }
            
            // Content data
            const contentData = {
                // Hardware topics
                'hardware-intro': {
                    title: 'Introduction to Computer Hardware',
                    content: `
                        <h1>Introduction to Computer Hardware</h1>
                        <p>Computer hardware refers to the physical components that make up a computer system. These components work together to process data and execute instructions.</p>
                        
                        <h2>Basic Components</h2>
                        <p>A typical computer system consists of:</p>
                        <ul>
                            <li><strong>Central Processing Unit (CPU)</strong>: The brain of the computer that executes instructions</li>
                            <li><strong>Memory (RAM)</strong>: Temporary storage for data and instructions currently in use</li>
                            <li><strong>Storage Devices</strong>: Long-term data storage (HDD, SSD)</li>
                            <li><strong>Input/Output Devices</strong>: Allow interaction with the computer (keyboard, mouse, monitor)</li>
                            <li><strong>Motherboard</strong>: The main circuit board that connects all components</li>
                        </ul>
                        
                        <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800" alt="Computer Hardware Components">
                        
                        <h2>How Hardware Works Together</h2>
                        <p>When you perform any task on a computer, multiple hardware components work in concert:</p>
                        <ol>
                            <li>Input devices send data to the computer</li>
                            <li>The CPU processes instructions using data from memory</li>
                            <li>Results are stored in memory or permanent storage</li>
                            <li>Output devices display or communicate the results</li>
                        </ol>
                        
                        <div class="diagram">
                            <h3>Computer Hardware Architecture</h3>
                            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800" alt="Computer Architecture Diagram">
                        </div>
                    `
                },
                'hardware-cpu': {
                    title: 'Central Processing Unit (CPU)',
                    content: `
                        <h1>Central Processing Unit (CPU)</h1>
                        <p>The CPU, often called the processor, is the primary component of a computer that performs most of the processing inside the computer.</p>
                        
                        <h2>CPU Components</h2>
                        <div class="flex-container">
                            <div class="flex-item">
                                <h3>Control Unit (CU)</h3>
                                <p>Directs all operations of the processor by communicating with both the ALU and memory.</p>
                            </div>
                            <div class="flex-item">
                                <h3>Arithmetic Logic Unit (ALU)</h3>
                                <p>Performs arithmetic and logical operations on the data.</p>
                            </div>
                        </div>
                        
                        <img src="https://images.unsplash.com/photo-1587202372705-5ddd03a885a0?auto=format&fit=crop&w=800" alt="CPU Architecture">
                        
                        <h2>CPU Performance Factors</h2>
                        <ul>
                            <li><strong>Clock Speed</strong>: Measured in GHz, determines how many instructions per second the CPU can execute</li>
                            <li><strong>Number of Cores</strong>: Modern CPUs have multiple cores to handle parallel tasks</li>
                            <li><strong>Cache Memory</strong>: On-chip memory for faster access to frequently used data</li>
                            <li><strong>Instruction Set</strong>: The set of commands the CPU can understand and execute</li>
                        </ul>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>CPU Generation</th>
                                    <th>Typical Clock Speed</th>
                                    <th>Cores</th>
                                    <th>Cache Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Early 2000s</td>
                                    <td>1-2 GHz</td>
                                    <td>1</td>
                                    <td>128-512 KB</td>
                                </tr>
                                <tr>
                                    <td>Mid 2010s</td>
                                    <td>2-4 GHz</td>
                                    <td>4-8</td>
                                    <td>4-8 MB</td>
                                </tr>
                                <tr>
                                    <td>Current (2023)</td>
                                    <td>3-5 GHz</td>
                                    <td>8-16</td>
                                    <td>16-64 MB</td>
                                </tr>
                            </tbody>
                        </table>
                    `
                },
                
                // Memory topics
                'memory-intro': {
                    title: 'Introduction to Computer Memory',
                    content: `
                        <h1>Introduction to Computer Memory</h1>
                        <p>Computer memory refers to the electronic components that store data and instructions for processing. Memory is essential for all computing operations.</p>
                        
                        <h2>Types of Memory</h2>
                        <ul>
                            <li><strong>Primary Memory (Main Memory)</strong>: Directly accessible by CPU (RAM, ROM)</li>
                            <li><strong>Secondary Memory (Storage)</strong>: Long-term storage (HDD, SSD, optical media)</li>
                            <li><strong>Cache Memory</strong>: High-speed memory between CPU and RAM</li>
                            <li><strong>Registers</strong>: Smallest and fastest memory inside CPU</li>
                        </ul>
                        
                        <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800" alt="Memory Hierarchy">
                        
                        <h2>Memory Characteristics</h2>
                        <p>Different types of memory vary in several key aspects:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Characteristic</th>
                                    <th>Volatility</th>
                                    <th>Speed</th>
                                    <th>Capacity</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Registers</td>
                                    <td>Volatile</td>
                                    <td>Fastest</td>
                                    <td>Smallest</td>
                                    <td>Highest</td>
                                </tr>
                                <tr>
                                    <td>Cache</td>
                                    <td>Volatile</td>
                                    <td>Very Fast</td>
                                    <td>Small</td>
                                    <td>High</td>
                                </tr>
                                <tr>
                                    <td>RAM</td>
                                    <td>Volatile</td>
                                    <td>Fast</td>
                                    <td>Medium</td>
                                    <td>Medium</td>
                                </tr>
                                <tr>
                                    <td>SSD/HDD</td>
                                    <td>Non-volatile</td>
                                    <td>Slow</td>
                                    <td>Large</td>
                                    <td>Low</td>
                                </tr>
                            </tbody>
                        </table>
                    `
                },
                'memory-hierarchy': {
                    title: 'Memory Hierarchy',
                    content: `
                        <h1>Memory Hierarchy</h1>
                        <p>The memory hierarchy in computers organizes different types of storage based on speed, cost, and capacity.</p>
                        
                        <h2>Hierarchy Levels</h2>
                        <p>From fastest/smallest to slowest/largest:</p>
                        <ol>
                            <li><strong>CPU Registers</strong>: Smallest, fastest storage directly in the processor</li>
                            <li><strong>Cache Memory</strong>: L1, L2, L3 caches with increasing size and decreasing speed</li>
                            <li><strong>Main Memory (RAM)</strong>: Working memory for active programs and data</li>
                            <li><strong>Secondary Storage</strong>: Hard drives, SSDs for long-term storage</li>
                            <li><strong>Tertiary Storage</strong>: Tape drives, optical media for archival</li>
                        </ol>
                        
                        <img src="https://images.unsplash.com/photo-1589652717521-10c0d09de1d8?auto=format&fit=crop&w=800" alt="Memory Hierarchy Pyramid">
                        
                        <h2>Why Hierarchy Exists</h2>
                        <p>The memory hierarchy exists because:</p>
                        <ul>
                            <li>Faster memory is more expensive per byte</li>
                            <li>Slower memory is cheaper and can be larger</li>
                            <li>Most programs access a small portion of data frequently (temporal locality)</li>
                            <li>Programs tend to access data near recently accessed data (spatial locality)</li>
                        </ul>
                    `
                }
            };
            
            // Function to load content
            function loadContent(contentId) {
                // Show loading state
                contentDisplay.innerHTML = `
                    <div class="loading">
                        <div class="spinner"></div>
                        <p>Loading content...</p>
                    </div>
                `;
                
                // Simulate loading delay
                setTimeout(() => {
                    if (contentData[contentId]) {
                        const content = contentData[contentId];
                        contentDisplay.innerHTML = `
                            <div class="content-card">
                                ${content.content}
                            </div>
                        `;
                        
                        // Update document title
                        document.title = `${content.title} | Hardware Academy`;
                    } else {
                        contentDisplay.innerHTML = `
                            <div class="content-card">
                                <h1>Content Not Found</h1>
                                <p>The requested content could not be loaded.</p>
                                <p>Please select another topic from the menu.</p>
                            </div>
                        `;
                    }
                    
                    // Update active menu item
                    menuLinks.forEach(link => {
                        link.classList.remove('active-link');
                        if (link.getAttribute('data-content') === contentId) {
                            link.classList.add('active-link');
                        }
                    });
                    
                    // Also update mobile menu active state
                    const mobileLinks = mobileSidebar.querySelectorAll('.menu-link');
                    mobileLinks.forEach(link => {
                        link.classList.remove('active-link');
                        if (link.getAttribute('data-content') === contentId) {
                            link.classList.add('active-link');
                        }
                    });
                }, 600);
            }
            
            // Add click event to menu links
            menuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const contentId = this.getAttribute('data-content');
                    loadContent(contentId);
                    
                    // Close mobile menu if open
                    mobileSidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                });
            });
            
            // Mobile menu toggle functionality
            menuToggle.addEventListener('click', function() {
                mobileSidebar.classList.toggle('active');
                sidebarOverlay.classList.toggle('active');
            });
            
            sidebarOverlay.addEventListener('click', function() {
                mobileSidebar.classList.remove('active');
                this.classList.remove('active');
            });
            
            // Add event listeners to mobile sidebar links
            mobileSidebar.addEventListener('click', function(e) {
                if (e.target.classList.contains('menu-link')) {
                    e.preventDefault();
                    const contentId = e.target.getAttribute('data-content');
                    loadContent(contentId);
                    
                    // Close mobile menu
                    mobileSidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                }
            });
        });
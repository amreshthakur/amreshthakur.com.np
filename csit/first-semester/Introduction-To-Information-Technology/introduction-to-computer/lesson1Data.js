 // Lesson 1: Introduction to Computer
        const lesson1Data = {
            // Unit 1: Introduction to Computer (3 Hours)
            'intro-overview': {
                title: 'Introduction to Computers',
                content: `
                    <h1>Introduction to Computers</h1>
                    <p>A computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data. You can use a computer to type documents, send email, play games, and browse the Web.</p>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>What is a Computer?</h3>
                            <p>A computer is a machine composed of hardware and software components. A computer receives data through an input unit based on the instructions it is given and after processing the data, sends it back through an output device.</p>
                        </div>
                        <div class="flex-item">
                            <h3>Basic Functions</h3>
                            <p>All computers perform four basic functions:</p>
                            <ul>
                                <li><strong>Input:</strong> Receiving data and instructions</li>
                                <li><strong>Processing:</strong> Performing operations on the data</li>
                                <li><strong>Output:</strong> Producing results</li>
                                <li><strong>Storage:</strong> Saving data for future use</li>
                            </ul>
                        </div>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800" alt="Computer components">
                    
                    <h2>Types of Computers</h2>
                    <p>Computers can be classified in several ways based on their size, processing power, and purpose:</p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Examples</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Personal Computer (PC)</td>
                                <td>Single-user computer designed for general use</td>
                                <td>Desktop, Laptop</td>
                            </tr>
                            <tr>
                                <td>Workstation</td>
                                <td>Powerful single-user computer for specialized tasks</td>
                                <td>CAD, graphic design systems</td>
                            </tr>
                            <tr>
                                <td>Server</td>
                                <td>Computer designed to provide services to other computers</td>
                                <td>Web server, File server</td>
                            </tr>
                            <tr>
                                <td>Mainframe</td>
                                <td>Powerful multi-user computer for large organizations</td>
                                <td>IBM zSeries</td>
                            </tr>
                            <tr>
                                <td>Supercomputer</td>
                                <td>Extremely fast computer for complex calculations</td>
                                <td>Cray, IBM Summit</td>
                            </tr>
                        </tbody>
                    </table>
                `
            },
            'intro-digital-analog': {
                title: 'Digital and Analog Computers',
                content: `
                    <h1>Digital vs. Analog Computers</h1>
                    <p>Computers can be broadly classified into two categories based on the type of data they process: digital and analog computers.</p>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Digital Computers</h3>
                            <p>Digital computers process data in binary form (0s and 1s). They are designed to perform calculations and logical operations at high speed. Most modern computers are digital computers.</p>
                            <p><strong>Characteristics:</strong></p>
                            <ul>
                                <li>Process discrete data</li>
                                <li>High precision</li>
                                <li>Programmable</li>
                                <li>Versatile applications</li>
                            </ul>
                        </div>
                        <div class="flex-item">
                            <h3>Analog Computers</h3>
                            <p>Analog computers process continuous data. They represent variables by physical quantities such as electrical voltage. These computers are used for specialized applications like scientific experiments and industrial control.</p>
                            <p><strong>Characteristics:</strong></p>
                            <ul>
                                <li>Process continuous data</li>
                                <li>Less precise than digital</li>
                                <li>Designed for specific tasks</li>
                                <li>Faster for some applications</li>
                            </ul>
                        </div>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800" alt="Analog vs Digital">
                    
                    <h2>Comparison</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Digital Computer</th>
                                <th>Analog Computer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data Representation</td>
                                <td>Discrete (binary digits)</td>
                                <td>Continuous (physical quantities)</td>
                            </tr>
                            <tr>
                                <td>Precision</td>
                                <td>High</td>
                                <td>Limited</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>Slower for complex simulations</td>
                                <td>Faster for real-time processing</td>
                            </tr>
                            <tr>
                                <td>Programming</td>
                                <td>Stored programs</td>
                                <td>Hardwired programs</td>
                            </tr>
                            <tr>
                                <td>Applications</td>
                                <td>General purpose</td>
                                <td>Specialized tasks</td>
                            </tr>
                        </tbody>
                    </table>
                `
            },
            'intro-characteristics': {
                title: 'Characteristics of Computer',
                content: `
                    <h1>Characteristics of Computers</h1>
                    <p>Modern computers possess several key characteristics that make them powerful and versatile tools for processing information.</p>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Speed</h3>
                            <p>Computers can perform tasks at incredible speeds. Modern computers can execute billions of instructions per second. The speed of a computer is measured in hertz (Hz) and commonly expressed in gigahertz (GHz).</p>
                        </div>
                        <div class="flex-item">
                            <h3>Accuracy</h3>
                            <p>Computers perform calculations with extremely high accuracy. Errors in computer processing are typically due to incorrect input data or programming errors, not the computer itself.</p>
                        </div>
                    </div>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Diligence</h3>
                            <p>Unlike humans, computers do not suffer from boredom or fatigue. They can perform repetitive tasks with the same speed and accuracy for extended periods without degradation in performance.</p>
                        </div>
                        <div class="flex-item">
                            <h3>Versatility</h3>
                            <p>Computers can perform a wide range of tasks by running different programs. From complex scientific calculations to graphic design and entertainment, computers are adaptable to many applications.</p>
                        </div>
                    </div>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Storage Capacity</h3>
                            <p>Computers can store vast amounts of data. Modern storage devices can hold terabytes of information that can be retrieved almost instantly when needed.</p>
                        </div>
                        <div class="flex-item">
                            <h3>Automation</h3>
                            <p>Once programmed, computers can perform tasks automatically without human intervention. This capability is essential for modern manufacturing, network operations, and many other applications.</p>
                        </div>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800" alt="Computer characteristics">
                `
            },
            'intro-history': {
                title: 'History of Computer',
                content: `
                    <h1>History of Computers</h1>
                    <p>The history of computers dates back to ancient times with devices like the abacus, but modern computing began in the 20th century with the development of electronic computers.</p>
                    
                    <h2>Key Milestones in Computer History</h2>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Early Mechanical Computers (1642-1940)</h3>
                            <ul>
                                <li><strong>1642:</strong> Blaise Pascal invents the Pascaline, a mechanical calculator</li>
                                <li><strong>1822:</strong> Charles Babbage designs the Difference Engine</li>
                                <li><strong>1837:</strong> Charles Babbage conceives the Analytical Engine</li>
                                <li><strong>1890:</strong> Herman Hollerith develops the punched card system for the US Census</li>
                            </ul>
                        </div>
                        <div class="flex-item">
                            <h3>First Generation (1940-1956): Vacuum Tubes</h3>
                            <ul>
                                <li><strong>1944:</strong> Harvard Mark I - electro-mechanical computer</li>
                                <li><strong>1946:</strong> ENIAC - first general-purpose electronic computer</li>
                                <li><strong>1951:</strong> UNIVAC I - first commercial computer</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Second Generation (1956-1963): Transistors</h3>
                            <ul>
                                <li>Transistors replaced vacuum tubes</li>
                                <li>Smaller, faster, more reliable computers</li>
                                <li>High-level programming languages developed (COBOL, FORTRAN)</li>
                            </ul>
                        </div>
                        <div class="flex-item">
                            <h3>Third Generation (1964-1971): Integrated Circuits</h3>
                            <ul>
                                <li>Multiple transistors on a single silicon chip</li>
                                <li>Development of operating systems</li>
                                <li>Minicomputers became popular</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="flex-container">
                        <div class="flex-item">
                            <h3>Fourth Generation (1971-Present): Microprocessors</h3>
                            <ul>
                                <li>Thousands of integrated circuits on a single chip</li>
                                <li>Personal computers became affordable</li>
                                <li>Graphical User Interfaces (GUIs) developed</li>
                            </ul>
                        </div>
                        <div class="flex-item">
                            <h3>Fifth Generation (Present and Beyond): AI and Parallel Processing</h3>
                            <ul>
                                <li>Artificial Intelligence</li>
                                <li>Quantum computing</li>
                                <li>Cloud computing and IoT</li>
                            </ul>
                        </div>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1592919505780-303950717430?auto=format&fit=crop&w=800" alt="Computer history timeline">
                `
            }
        };

        
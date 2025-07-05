  // Sample subject data
        const subjectData = [
            {
                name: "Programming Fundamentals",
                description: "Introduction to programming concepts, algorithms, and problem-solving techniques using a high-level programming language.",
                units: 5,
                type: "core"
            },
            {
                name: "Artificial Intelligence",
                description: "Study of intelligent agents, problem-solving, knowledge representation, machine learning, and natural language processing.",
                units: 7,
                type: "elective"
            },
            {
                name: "Database Management",
                description: "Fundamentals of database systems, data modeling, SQL, normalization, and transaction management.",
                units: 6,
                type: "core"
            },
            {
                name: "Computer Networks",
                description: "Design, implementation, and management of computer networks and communication protocols.",
                units: 8,
                type: "core"
            },
            {
                name: "Web Technology",
                description: "Modern web development technologies including HTML, CSS, JavaScript, and frameworks.",
                units: 6,
                type: "elective"
            },
            {
                name: "Operating Systems",
                description: "Design and implementation of operating system components including process management and memory allocation.",
                units: 7,
                type: "core"
            },
            {
                name: "Data Structures and Algorithms",
                description: "Advanced data structures and algorithm design techniques with complexity analysis.",
                units: 8,
                type: "core"
            },
            {
                name: "Cybersecurity Fundamentals",
                description: "Principles of information security, cryptography, and network security.",
                units: 6,
                type: "elective"
            }
        ];

        // Detailed unit data
        const unitData = {
            "Programming Fundamentals": [
                { title: "Introduction to Programming", description: "Basic concepts, variables, and data types" },
                { title: "Control Structures", description: "Conditionals, loops, and program flow" },
                { title: "Functions and Modules", description: "Creating reusable code components" },
                { title: "Data Structures", description: "Arrays, lists, and dictionaries" },
                { title: "Object-Oriented Programming", description: "Classes, objects, and inheritance" }
            ],
            "Artificial Intelligence": [
                { title: "Introduction to AI", description: "History and fundamental concepts" },
                { title: "Problem Solving Techniques", description: "Search algorithms and heuristics" },
                { title: "Knowledge Representation", description: "Logic and reasoning systems" },
                { title: "Machine Learning Basics", description: "Supervised and unsupervised learning" },
                { title: "Natural Language Processing", description: "Text analysis and understanding" },
                { title: "Computer Vision", description: "Image recognition and processing" },
                { title: "AI Ethics", description: "Ethical considerations in AI development" }
            ],
            "Database Management": [
                { title: "Database Fundamentals", description: "Concepts and architectures" },
                { title: "Relational Model", description: "Tables, keys, and relationships" },
                { title: "SQL Queries", description: "Data manipulation and retrieval" },
                { title: "Database Design", description: "Normalization and schema design" },
                { title: "Transaction Management", description: "ACID properties and concurrency" },
                { title: "NoSQL Databases", description: "Introduction to non-relational databases" }
            ],
            "Computer Networks": [
                { title: "Network Fundamentals", description: "OSI model and network topologies" },
                { title: "Network Protocols", description: "TCP/IP, UDP, and application protocols" },
                { title: "Routing and Switching", description: "Routers, switches, and network devices" },
                { title: "Wireless Networks", description: "Wi-Fi standards and security" },
                { title: "Network Security", description: "Firewalls, VPNs, and intrusion detection" },
                { title: "Cloud Networking", description: "Virtual networks and cloud infrastructure" }
            ],
            "Web Technology": [
                { title: "HTML & CSS Fundamentals", description: "Structure and styling of web pages" },
                { title: "JavaScript Essentials", description: "Client-side scripting and DOM manipulation" },
                { title: "Responsive Design", description: "Creating mobile-friendly websites" },
                { title: "Frontend Frameworks", description: "React, Angular, or Vue.js overview" },
                { title: "Backend Development", description: "Server-side programming with Node.js" },
                { title: "Database Integration", description: "Connecting to databases from web apps" }
            ],
            "Operating Systems": [
                { title: "OS Architecture", description: "Kernel, shell, and system components" },
                { title: "Process Management", description: "Process states and scheduling algorithms" },
                { title: "Memory Management", description: "Virtual memory and paging techniques" },
                { title: "File Systems", description: "Storage organization and management" },
                { title: "I/O Systems", description: "Device drivers and management" },
                { title: "Security and Protection", description: "Access control and system security" }
            ],
            "Data Structures and Algorithms": [
                { title: "Algorithm Analysis", description: "Time and space complexity" },
                { title: "Arrays and Linked Lists", description: "Linear data structures" },
                { title: "Stacks and Queues", description: "Abstract data types" },
                { title: "Trees and Graphs", description: "Non-linear data structures" },
                { title: "Sorting Algorithms", description: "Comparison and non-comparison sorts" },
                { title: "Searching Algorithms", description: "Efficient data retrieval techniques" }
            ],
            "Cybersecurity Fundamentals": [
                { title: "Security Principles", description: "CIA triad and security models" },
                { title: "Cryptography Basics", description: "Encryption and decryption techniques" },
                { title: "Network Security", description: "Protecting network infrastructure" },
                { title: "Web Security", description: "Securing web applications" },
                { title: "Ethical Hacking", description: "Penetration testing methodologies" }
            ]
        };

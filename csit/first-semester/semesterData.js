// Mock data for subjects and units
const subjectData = [
    {
        name: "Introduction to Information Technology",
        description: "Fundamentals of computer systems, IT components, and applications.",
        elective: false,
        semester: "First Semester",
        units: 11
    },
    {
        name: "C Programming",
        description: "Programming basics using C, including data types, control structures, and functions.",
        elective: false,
        semester: "First Semester",
        units: 11
    },
    {
        name: "Digital Logic",
        description: "Study of logic gates, Boolean algebra, and digital circuit design.",
        elective: false,
        type: "core",
        semester: "First Semester",
        units: 7
    },
    {
        name: "Mathematics I (Calculus)",
        description: "Differential and integral calculus relevant to computer science.",
        elective: false,
        semester: "First Semester",
        units: 11
    },
    {
        name: "Physics",
        description: "Mechanics, electricity, and magnetism in the context of computing.",
        elective: false,
        semester: "First Semester",
        units: 7
    }

];


// Sample Semester Data
const semesterData = [
    {
        title: "BSc.CSIT : First Semester",
        description: "Build a strong foundation in programming and computer science principles.",
        subjects: [
            {
                name: "Introduction to Information Technology",
                description: "Fundamentals of computer systems, IT components, and applications.",
                elective: false
            },
            {
                name: "C Programming",
                description: "Programming basics using C, including data types, control structures, and functions.",
                elective: false
            },
            {
                name: "Digital Logic",
                description: "Study of logic gates, Boolean algebra, and digital circuit design.",
                elective: false
            },
            {
                name: "Mathematics I (Calculus)",
                description: "Differential and integral calculus relevant to computer science.",
                elective: false
            },
            {
                name: "Physics",
                description: "Mechanics, electricity, and magnetism in the context of computing.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Second Semester",
        description: "Advance programming and understanding of discrete systems and microprocessors.",
        subjects: [
            {
                name: "Discrete Structures",
                description: "Sets, relations, functions, graphs, and combinatorics in computing.",
                elective: false
            },
            {
                name: "Object Oriented Programming",
                description: "Concepts like classes, inheritance, and polymorphism using Java/C++.",
                elective: false
            },
            {
                name: "Microprocessor",
                description: "Architecture and assembly-level programming of Intel 8085/8086.",
                elective: false
            },
            {
                name: "Mathematics II",
                description: "Linear algebra, matrices, and numerical solutions for equations.",
                elective: false
            },
            {
                name: "Statistics I",
                description: "Probability theory, data analysis, and statistical distributions.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Third Semester",
        description: "Core CS topics including algorithms, graphics, and architecture.",
        subjects: [
            {
                name: "Data Structures and Algorithms",
                description: "Linear/nonlinear data structures, searching, sorting, and recursion.",
                elective: false
            },
            {
                name: "Numerical Method",
                description: "Solutions for nonlinear equations, interpolation, and numerical integration.",
                elective: false
            },
            {
                name: "Computer Architecture",
                description: "Internal organization of computer systems and instruction cycles.",
                elective: false
            },
            {
                name: "Computer Graphics",
                description: "2D/3D transformations, viewing, and graphics programming using OpenGL.",
                elective: false
            },
            {
                name: "Statistics II",
                description: "Statistical inference, hypothesis testing, regression, and correlation.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Fourth Semester",
        description: "System-level computing, network fundamentals, and theory of computation.",
        subjects: [
            {
                name: "Theory of Computation",
                description: "Automata theory, grammars, and Turing machines.",
                elective: false
            },
            {
                name: "Computer Networks",
                description: "OSI model, IP addressing, switching, and routing basics.",
                elective: false
            },
            {
                name: "Operating Systems",
                description: "Processes, memory management, file systems, and concurrency.",
                elective: false
            },
            {
                name: "Database Management System",
                description: "SQL, ER modeling, relational algebra, normalization.",
                elective: false
            },
            {
                name: "Artificial Intelligence",
                description: "Search algorithms, expert systems, and machine learning basics.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Fifth Semester",
        description: "Web technology, project design, ethics, and technical elective options.",
        subjects: [
            {
                name: "Microprocessor Based Design",
                description: "Design of digital systems using microprocessors/microcontrollers.",
                elective: false
            },
            {
                name: "Web Technology",
                description: "HTML, CSS, JavaScript, server-side scripting, and web frameworks.",
                elective: false
            },
            {
                name: "System Analysis and Design",
                description: "Requirement analysis, system modeling, and software specification.",
                elective: false
            },
            {
                name: "Society and Ethics in Information Technology",
                description: "IT laws, digital ethics, and social implications of technology.",
                elective: false
            },
            {
                name: "Design and Analysis of Algorithms",
                description: "Divide-and-conquer, greedy algorithms, dynamic programming.",
                elective: true
            },
            {
                name: "Cryptography",
                description: "Symmetric/asymmetric encryption, hashing, digital signatures.",
                elective: true
            },
            {
                name: "Image Processing",
                description: "Image enhancement, filtering, compression, and segmentation.",
                elective: true
            },
            {
                name: "Knowledge Management",
                description: "Processes and systems to manage organizational knowledge.",
                elective: true
            },
            {
                name: "Simulation and Modeling",
                description: "Modeling of systems using discrete-event simulation techniques.",
                elective: true
            }
        ]
    },
    {
        title: "BSc.CSIT : Sixth Semester",
        description: "Advanced software development and NET-centric computing.",
        subjects: [
            {
                name: "Software Engineering",
                description: "Agile models, design patterns, testing, and project lifecycle.",
                elective: false
            },
            {
                name: "Compiler Design and Construction",
                description: "Lexical, syntax, and semantic analysis; code generation.",
                elective: false
            },
            {
                name: "E-Governance",
                description: "Use of ICT in public service delivery and governance.",
                elective: false
            },
            {
                name: "NET Centric Computing",
                description: "Distributed apps, web services, and .NET framework.",
                elective: false
            },
            {
                name: "Technical Writing",
                description: "Writing reports, documentation, and academic content.",
                elective: false
            },
            {
                name: "E-commerce",
                description: "Online business models, security, payment systems.",
                elective: true
            },
            {
                name: "Neural Networks",
                description: "ANN architectures, backpropagation, and training algorithms.",
                elective: true
            },
            {
                name: "Computer Hardware Design",
                description: "Designing computer components using VHDL or Verilog.",
                elective: true
            },
            {
                name: "Automation and Robotics",
                description: "Sensors, actuators, control systems in robotics.",
                elective: true
            },
            {
                name: "Cognitive Science",
                description: "Study of mind, perception, and decision-making models.",
                elective: true
            }
        ]
    },
    {
        title: "BSc.CSIT : Seventh Semester",
        description: "Specialization electives and real-world project implementation.",
        subjects: [
            {
                name: "Advanced Java Programming",
                description: "Swing, JDBC, multi-threading, and networking in Java.",
                elective: false
            },
            {
                name: "Data Warehousing and Data Mining",
                description: "Data cubes, OLAP, clustering, classification algorithms.",
                elective: false
            },
            {
                name: "Principles of Management",
                description: "Basics of organizational structure, leadership, and HRM.",
                elective: false
            },
            {
                name: "Project Work",
                description: "Capstone project solving real-world computing problems.",
                elective: false
            },
            {
                name: "Information Retrieval",
                description: "Search engines, indexing, relevance ranking.",
                elective: false
            },
            {
                name: "Software Project Management",
                description: "Planning, risk analysis, cost estimation, and tracking.",
                elective: true
            },
            {
                name: "Network Security",
                description: "Firewalls, IDS, VPNs, and security protocols.",
                elective: true
            },
            {
                name: "Network and System Administration",
                description: "Linux/Windows system setup, backup, configuration.",
                elective: true
            },
            {
                name: "Digital System Design",
                description: "Designing digital circuits and systems using HDL.",
                elective: true
            },
            {
                name: "Database Administration",
                description: "Backup, recovery, tuning, and security in DBMS.",
                elective: true
            },
            {
                name: "International Marketing",
                description: "Global market analysis and international trade strategies.",
                elective: true
            }
        ]
    },
    {
        title: "BSc.CSIT : Eighth Semester",
        description: "Emerging computing fields, advanced networks, and internship.",
        subjects: [
            {
                name: "Advanced Database",
                description: "Object-relational databases, indexing, and query optimization.",
                elective: false
            },
            {
                name: "Advanced Networking with IPv6",
                description: "IPv6 architecture, transition techniques, and routing protocols.",
                elective: false
            },
            {
                name: "Internship",
                description: "Industrial experience in real IT environment.",
                elective: false
            },
            {
                name: "Distributed Networking",
                description: "Peer-to-peer, client-server, and cloud-based networks.",
                elective: true
            },
            {
                name: "Game Technology",
                description: "Game design, development platforms, and game physics.",
                elective: true
            },
            {
                name: "Distributed and Object Oriented Database",
                description: "Advanced database structures and distributed queries.",
                elective: true
            },
            {
                name: "Introduction to Cloud Computing",
                description: "Cloud services, virtualization, SaaS/PaaS/IaaS.",
                elective: true
            },
            {
                name: "Geographical Information System",
                description: "Mapping, GPS, and spatial data visualization.",
                elective: true
            },
            {
                name: "Decision Support System and Expert System",
                description: "AI systems aiding decision-making in enterprises.",
                elective: true
            },
            {
                name: "Mobile Application Development",
                description: "Developing Android/iOS applications using Flutter/React Native.",
                elective: true
            },
            {
                name: "Embedded Systems Programming",
                description: "Programming microcontrollers for hardware-level tasks.",
                elective: true
            },
            {
                name: "International Business Management",
                description: "Global business strategies and foreign trade management.",
                elective: true
            }
        ]
    }
];






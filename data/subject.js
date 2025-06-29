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
    },
    {
        name: "Discrete Structures",
        description: "Sets, relations, functions, graphs, and combinatorics in computing.",
        elective: false,
        semester: "Second Semester",
        units: 6
    },
    {
        name: "Object Oriented Programming",
        description: "Concepts like classes, inheritance, and polymorphism using Java/C++.",
        elective: false,
        semester: "Second Semester",
        units: 8
    },
    {
        name: "Microprocessor",
        description: "Architecture and assembly-level programming of Intel 8085/8086.",
        elective: false,
        semester: "Second Semester",
        units: 7
    },
    {
        name: "Mathematics II",
        description: "Linear algebra, matrices, and numerical solutions for equations.",
        elective: false,
        semester: "Second Semester",
        units: 10
    },
    {
        name: "Statistics I",
        description: "Probability theory, data analysis, and statistical distributions.",
        elective: false,
        semester: "Second Semester",
        units: 7
    },
    {
        name: "Data Structures and Algorithms",
        description: "Linear/nonlinear data structures, searching, sorting, and recursion.",
        elective: false,
        semester: "Third Semester",
        units: 8
    },
    {
        name: "Numerical Method",
        description: "Solutions for nonlinear equations, interpolation, and numerical integration.",
        elective: false,
        semester: "Third Semester",
        units: 6
    },
    {
        name: "Computer Architecture",
        description: "Internal organization of computer systems and instruction cycles.",
        elective: false,
        semester: "Third Semester",
        units: 9
    },
    {
        name: "Computer Graphics",
        description: "2D/3D transformations, viewing, and graphics programming using OpenGL.",
        elective: false,
        semester: "Third Semester",
        units: 10
    },
    {
        name: "Statistics II",
        description: "Statistical inference, hypothesis testing, regression, and correlation.",
        elective: false,
        semester: "Third Semester",
        units: 6
    },
    {
        name: "Theory of Computation",
        description: "Automata theory, grammars, and Turing machines.",
        elective: false,
        semester: "Fourth Semester",
        units: 7
    },
    {
        name: "Computer Networks",
        description: "OSI model, IP addressing, switching, and routing basics.",
        elective: false,
        semester: "Fourth Semester",
        units: 7
    },
    {
        name: "Operating Systems",
        description: "Processes, memory management, file systems, and concurrency.",
        elective: false,
        semester: "Fourth Semester",
        units: 7
    },
    {
        name: "Database Management System",
        description: "SQL, ER modeling, relational algebra, normalization.",
        elective: false,
        semester: "Fourth Semester",
        units: 10
    },
    {
        name: "Artificial Intelligence",
        description: "Search algorithms, expert systems, and machine learning basics.",
        elective: false,
        semester: "Fourth Semester",
        units: 6
    },
    {
        name: "Microprocessor Based Design",
        description: "Design of digital systems using microprocessors/microcontrollers.",
        elective: false,
        semester: "Fifth Semester",
        units: 5
    },
    {
        name: "Web Technology",
        description: "HTML, CSS, JavaScript, server-side scripting, and web frameworks.",
        elective: false,
        semester: "Fifth Semester",
        units: 6
    },
    {
        name: "System Analysis and Design",
        description: "Requirement analysis, system modeling, and software specification.",
        elective: false,
        semester: "Fifth Semester",
        units: 6
    },
    {
        name: "Society and Ethics in Information Technology",
        description: "IT laws, digital ethics, and social implications of technology.",
        elective: false,
        semester: "Fifth Semester",
        units: 9
    },
    {
        name: "Design and Analysis of Algorithms",
        description: "Divide-and-conquer, greedy algorithms, dynamic programming.",
        elective: true,
        semester: "Fifth Semester",
        units: 8
    },
    {
        name: "Cryptography",
        description: "Symmetric/asymmetric encryption, hashing, digital signatures.",
        elective: true,
        semester: "Fifth Semester",
        units: 7
    },
    {
        name: "Image Processing",
        description: "Image enhancement, filtering, compression, and segmentation.",
        elective: true,
        semester: "Fifth Semester",
        units: 5
    },
    {
        name: "Knowledge Management",
        description: "Processes and systems to manage organizational knowledge.",
        elective: true,
        semester: "Fifth Semester",
        units: 0
    },
    {
        name: "Simulation and Modeling",
        description: "Modeling of systems using discrete-event simulation techniques.",
        elective: true,
        semester: "Fifth Semester",
        units: 8
    },
    {
        name: "Software Engineering",
        description: "Agile models, design patterns, testing, and project lifecycle.",
        elective: false,
        semester: "Sixth Semester",
        units: 10
    },
    {
        name: "Compiler Design and Construction",
        description: "Lexical, syntax, and semantic analysis; code generation.",
        elective: false,
        semester: "Sixth Semester",
        units: 4
    },
    {
        name: "E-Governance",
        description: "Use of ICT in public service delivery and governance.",
        elective: false,
        semester: "Sixth Semester",
        units: 6
    },
    {
        name: "NET Centric Computing",
        description: "Distributed apps, web services, and .NET framework.",
        elective: false,
        semester: "Sixth Semester",
        units: 9
    },
    {
        name: "Technical Writing",
        description: "Writing reports, documentation, and academic content.",
        elective: false,
        semester: "Sixth Semester",
        units: 12
    },
    {
        name: "E-commerce",
        description: "Online business models, security, payment systems.",
        elective: true,
        semester: "Sixth Semester",
        units: 7
    },
    {
        name: "Neural Networks",
        description: "ANN architectures, backpropagation, and training algorithms.",
        elective: true,
        semester: "Sixth Semester",
        units: 8
    },
    {
        name: "Computer Hardware Design",
        description: "Designing computer components using VHDL or Verilog.",
        elective: true,
        semester: "Sixth Semester",
        units: 7
    },
    {
        name: "Automation and Robotics",
        description: "Sensors, actuators, control systems in robotics.",
        elective: true,
        semester: "Sixth Semester",
        units: 6
    },
    {
        name: "Cognitive Science",
        description: "Study of mind, perception, and decision-making models.",
        elective: true,
        semester: "Sixth Semester",
        units: 8
    },
    {
        name: "Advanced Java Programming",
        description: "Swing, JDBC, multi-threading, and networking in Java.",
        elective: false,
        semester: "Seventh Semester",
        units: 8
    },
    {
        name: "Data Warehousing and Data Mining",
        description: "Data cubes, OLAP, clustering, classification algorithms.",
        elective: false,
        semester: "Seventh Semester",
        units: 9
    },
    {
        name: "Principles of Management",
        description: "Basics of organizational structure, leadership, and HRM.",
        elective: false,
        semester: "Seventh Semester",
        units: 12
    },
    {
        name: "Project Work",
        description: "Capstone project solving real-world computing problems.",
        elective: false,
        semester: "Seventh Semester",
        units: 0
    },
    {
        name: "Information Retrieval",
        description: "Search engines, indexing, relevance ranking.",
        elective: false,
        semester: "Seventh Semester",
        units: 11
    },
    {
        name: "Software Project Management",
        description: "Planning, risk analysis, cost estimation, and tracking.",
        elective: true,
        semester: "Seventh Semester",
        units: 9
    },
    {
        name: "Network Security",
        description: "Firewalls, IDS, VPNs, and security protocols.",
        elective: true,
        semester: "Seventh Semester",
        units: 8
    },
    {
        name: "Network and System Administration",
        description: "Linux/Windows system setup, backup, configuration.",
        elective: true,
        semester: "Seventh Semester",
        units: 9
    },
    {
        name: "Digital System Design",
        description: "Designing digital circuits and systems using HDL.",
        elective: true,
        semester: "Seventh Semester",
        units: 8
    },
    {
        name: "Database Administration",
        description: "Backup, recovery, tuning, and security in DBMS.",
        elective: true,
        semester: "Seventh Semester",
        units: 7
    },
    {
        name: "International Marketing",
        description: "Global market analysis and international trade strategies.",
        elective: true,
        semester: "Seventh Semester",
        units: 5
    },
    {
        name: "Advanced Database",
        description: "Object-relational databases, indexing, and query optimization.",
        elective: false,
        semester: "Eighth Semester",
        units: 5
    },
    {
        name: "Advanced Networking with IPv6",
        description: "IPv6 architecture, transition techniques, and routing protocols.",
        elective: false,
        semester: "Eighth Semester",
        units: 8
    },
    {
        name: "Internship",
        description: "Industrial experience in real IT environment.",
        elective: false,
        semester: "Eighth Semester",
        units: 9
    },
    {
        name: "Distributed Networking",
        description: "Peer-to-peer, client-server, and cloud-based networks.",
        elective: true,
        semester: "Eighth Semester",
        units: 6
    },
    {
        name: "Game Technology",
        description: "Game design, development platforms, and game physics.",
        elective: true,
        semester: "Eighth Semester",
        units: 0
    },
    {
        name: "Distributed and Object Oriented Database",
        description: "Advanced database structures and distributed queries.",
        elective: true,
        semester: "Eighth Semester",
        units: 3
    },
    {
        name: "Introduction to Cloud Computing",
        description: "Cloud services, virtualization, SaaS/PaaS/IaaS.",
        elective: true,
        semester: "Eighth Semester",
        units: 4
    },
    {
        name: "Geographical Information System",
        description: "Mapping, GPS, and spatial data visualization.",
        elective: true,
        semester: "Eighth Semester",
        units: 7
    },
    {
        name: "Decision Support System and Expert System",
        description: "AI systems aiding decision-making in enterprises.",
        elective: true,
        semester: "Eighth Semester",
        units: 4
    },
    {
        name: "Mobile Application Development",
        description: "Developing Android/iOS applications using Flutter/React Native.",
        elective: true,
        semester: "Eighth Semester",
        units: 0
    },
    {
        name: "Embedded Systems Programming",
        description: "Programming microcontrollers for hardware-level tasks.",
        elective: true,
        semester: "Eighth Semester",
        units: 0
    },
    {
        name: "International Business Management",
        description: "Global business strategies and foreign trade management.",
        elective: true,
        semester: "Eighth Semester",
        units: 0
    }
];


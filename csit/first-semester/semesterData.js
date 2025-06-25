// Sample Semester Data
const semesterData = [
{
    title: "Introduction to Information Technology",
    description: "Advance programming and understanding of discrete systems and microprocessors.",
    subjects: [
        {
            name: "Introduction to Computer",
            description: "Overview of basic computer concepts and evolution.",
            elective: false
        },
        {
            name: "The Computer System Hardware",
            description: "Understanding physical components of a computer system.",
            elective: false
        },
        {
            name: "Computer Memory",
            description: "Types, hierarchy, and functions of memory in computing.",
            elective: false
        },
        {
            name: "Input and Output Devices",
            description: "Devices used to interact with and receive data from computers.",
            elective: false
        },
        {
            name: "Data Representation",
            description: "Binary number systems, encoding schemes, and data formats.",
            elective: false
        },
        {
            name: "Computer Software",
            description: "System and application software with types and examples.",
            elective: false
        },
        {
            name: "Data Communication and Computer Network",
            description: "Basic concepts of networking, transmission modes, and topologies.",
            elective: false
        },
        {
            name: "The Internet and Internet Services",
            description: "Internet basics, protocols, and online services.",
            elective: false
        },
        {
            name: "Fundamentals of Database",
            description: "Database concepts, models, and management systems.",
            elective: false
        },
        {
            name: "Multimedia",
            description: "Text, audio, video, and interactive content in computing.",
            elective: false
        },
        {
            name: "Computer Security",
            description: "Cybersecurity principles, threats, and protection methods.",
            elective: false
        }
    ]
}
,
  {
    title: "C Programming",
    description: "Core CS topics including algorithms, graphics, and architecture.",
    subjects: [
   
        {
            name: "Problem Solving with Computer",
            description: "Understanding the fundamentals of problem-solving and algorithm design.",
            elective: false
        },
        {
            name: "Elements of C",
            description: "Basics of the C programming language including syntax and structure.",
            elective: false
        },
        {
            name: "Input and Output",
            description: "Standard input/output functions and formatted I/O in C.",
            elective: false
        },
        {
            name: "Operators and Expression",
            description: "Arithmetic, relational, logical operators and their precedence.",
            elective: false
        },
        {
            name: "Control Statement",
            description: "Decision making using if-else, switch, loops, and jump statements.",
            elective: false
        },
        {
            name: "Arrays",
            description: "One-dimensional, two-dimensional arrays and array manipulation.",
            elective: false
        },
        {
            name: "Functions",
            description: "User-defined functions, scope, recursion, and parameter passing.",
            elective: false
        },
        {
            name: "Structure and Union",
            description: "Group related data using structures and unions in C.",
            elective: false
        },
        {
            name: "Pointers",
            description: "Pointer basics, arithmetic, arrays, and functions with pointers.",
            elective: false
        },
        {
            name: "File Handling in C",
            description: "Reading from and writing to files using C file I/O.",
            elective: false
        },
        {
            name: "Introduction to Graphics",
            description: "Basic concepts of graphics in C using libraries like graphics.h.",
            elective: false
        }
    ]
}
,
    {
    title: "Digital Logic",
    description: "System-level computing, network fundamentals, and theory of computation.",
    subjects: [
        {
            name: "Binary Systems",
            description: "Number systems, conversions, and binary arithmetic.",
            elective: false
        },
        {
            name: "Boolean Algebra and Logic Gates",
            description: "Logic operations, Boolean identities, and gate-level design.",
            elective: false
        },
        {
            name: "Simplification of Boolean Functions",
            description: "Karnaugh maps and algebraic simplification techniques.",
            elective: false
        },
        {
            name: "Combinational Logic",
            description: "Design and analysis of combinational logic circuits.",
            elective: false
        },
        {
            name: "Combinational Logic with MSI and LSI",
            description: "Use of Medium and Large Scale Integration devices in circuits.",
            elective: false
        },
        {
            name: "Synchronous and Asynchronous Sequential Logic",
            description: "Design principles of sequential circuits and timing control.",
            elective: false
        },
        {
            name: "Registers and Counters",
            description: "Sequential storage elements and counting circuits.",
            elective: false
        }
    ]
}
,
    {
    title: "Mathematics I (Calculus)",
    description: "Web technology, project design, ethics, and technical elective options.",
    subjects: [
       {
            name: "Function of One Variable",
            description: "Introduction to functions and their properties.",
            elective: false
        },
        {
            name: "Limits and Continuity",
            description: "Concepts of limits and continuity in calculus.",
            elective: false
        },
        {
            name: "Derivatives",
            description: "Definition and techniques of differentiation.",
            elective: false
        },
        {
            name: "Applications of Derivatives",
            description: "Use of derivatives in optimization and motion problems.",
            elective: false
        },
        {
            name: "Antiderivatives",
            description: "Introduction to integration and antiderivatives.",
            elective: false
        },
        {
            name: "Applications of Antiderivatives",
            description: "Area under curves and other integral applications.",
            elective: false
        },
        {
            name: "Ordinary Differential Equations",
            description: "Basic concepts and solutions of ODEs.",
            elective: false
        },
        {
            name: "Infinite Sequence and Series",
            description: "Convergence and properties of sequences and series.",
            elective: false
        },
        {
            name: "Plane and Space Vectors",
            description: "Vector algebra and geometry in two and three dimensions.",
            elective: false
        },
        {
            name: "Partial Derivatives and Multiple Integrals",
            description: "Multivariable calculus topics and techniques.",
            elective: false
        }
    ]
}
,
    {
    title: "Physics",
    description: "Advanced software development and NET-centric computing.",
    subjects: [
   
        {
            name: "Rotational Dynamics and Oscillatory Motion",
            description: "Study of rotating bodies and oscillations in physical systems.",
            elective: false
        },
        {
            name: "Electric and Magnetic Field",
            description: "Fundamentals of electromagnetism and field theory.",
            elective: false
        },
        {
            name: "Fundamentals of Atomic Theory",
            description: "Atomic structure and properties of matter.",
            elective: false
        },
        {
            name: "Methods of Quantum Mechanics",
            description: "Basic principles and mathematical tools of quantum physics.",
            elective: false
        },
        {
            name: "Fundamentals of Solid State Physics",
            description: "Properties of solids and crystal structures.",
            elective: false
        },
        {
            name: "Semiconductor and Semiconductor Devices",
            description: "Semiconductor materials and electronic device physics.",
            elective: false
        },
        {
            name: "Universal Gates and Physics of Integrated Circuits",
            description: "Logic gates and physical principles behind ICs.",
            elective: false
        }
    ]
}
,
    {
        title: "Tu Questions",
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
        title: "TU Model Set Qustions",
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
    title: "Notes",
    description: "Different types of notes by style and format for effective learning and organization.",
    subjects: [
        {
            name: "Lecture Notes",
            description: "Notes taken during lectures focusing on key points and explanations.",
            elective: false
        },
        {
            name: "Summary Notes",
            description: "Condensed notes highlighting main ideas and important concepts.",
            elective: false
        },
        {
            name: "Outline Notes",
            description: "Structured notes using headings and subheadings to organize information.",
            elective: false
        },
        {
            name: "Mind Map Notes",
            description: "Visual notes that connect ideas using diagrams and branches.",
            elective: false
        },
        {
            name: "Cornell Notes",
            description: "Notes divided into cues, notes, and summary for effective review.",
            elective: false
        },
        {
            name: "Flashcards",
            description: "Small cards with questions and answers for memorization.",
            elective: false
        },
        {
            name: "Annotation Notes",
            description: "Notes made directly on texts with highlights and comments.",
            elective: false
        },
        {
            name: "Research Notes",
            description: "Detailed notes collected from various sources including quotes and references.",
            elective: false
        },
        {
            name: "Handwritten Notes (Hard Copy)",
            description: "Manual notes written on paper notebooks or sheets.",
            elective: false
        },
        {
            name: "Digital Notes (Note-taking Apps like OneNote, Evernote, Notion)",
            description: "Notes created and organized using digital applications.",
            elective: false
        },
        {
            name: "PDF Notes",
            description: "Notes saved or shared in PDF format, often scanned or exported.",
            elective: false
        },
        {
            name: "Audio Notes (Voice Recordings)",
            description: "Notes captured as voice recordings for lectures or reminders.",
            elective: false
        },
        {
            name: "Video Notes",
            description: "Recorded video explanations or tutorials combining visuals and audio.",
            elective: false
        },
        {
            name: "Typed Notes (Word Docs, Google Docs, Text Editors)",
            description: "Notes typed using text editors or word processing software.",
            elective: false
        },
        {
            name: "Bullet Journals",
            description: "Handwritten system combining notes and organization with symbols and logs.",
            elective: false
        },
        {
            name: "Whiteboard Notes",
            description: "Temporary notes written on whiteboards during meetings or study sessions.",
            elective: false
        }
    ]
}

];
// Export the semester data for use in other modules
// export default semesterData;
//             {
//                 title: "Discrete Structures",
//                 description: "Sets, relations, functions, graphs, and combinatorics in computing.",
//                 subjects: [
//                     {
//                         name: "Discrete Structures",
//                         description: "Sets, relations, functions, graphs, and combinatorics in computing.",
//                         elective: false
//                     },
//                     {
//                         name: "Object Oriented Programming",
//                         description: "Concepts like classes, inheritance, and polymorphism using Java/C++",
//                         elective: false
//                     },
//                     {
//                         name: "Microprocessor",
//                         description: "Architecture and assembly-level programming of Intel 8085/8086",
//                         elective: false
//                     },
//                     {
//                         name: "Mathematics II",
//                         description: "Linear algebra, matrices, and numerical solutions for equations",
//                         elective: false
//                     },
//                     {
//                         name: "Statistics I",
//                         description: "Probability theory, data analysis, and statistical distributions",
//                         elective: false
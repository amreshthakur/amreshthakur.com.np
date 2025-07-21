// Mock data for subjects and units
const subjectData = [
    {
        name: "Theory of Computation",
        description: "Automata theory, grammars, and Turing machines.",
        elective: false,
        semester: "Fourth Semester",
        units: 11
    },
    {
        name: "Computer Networks",
        description: "OSI model, IP addressing, switching, and routing basics.",
        elective: false,
        semester: "Fourth Semester",
        units: 11
    },
    {
        name: "Operating Systems",
        description: "Processes, memory management, file systems, and concurrency.",
        elective: false,
        semester: "Fourth Semester",
        units: 11
    },
    {
        name: "Database Management System",
        description: "SQL, ER modeling, relational algebra, normalization.",
        elective: false,
        semester: "Fourth Semester",
        units: 11
    },
    {
        name: "Artificial Intelligence",
        description: "Search algorithms, expert systems, and machine learning basics.",
        elective: false,
        semester: "Fourth Semester",
        units: 11
    }
];
const semesterData = [
    {
        title: "BSc.CSIT : Fourth Semester",
        description: "Advanced topics in computer science including networks, databases, and AI.",
        subjects: subjectData
    }
];
const subjectUnitData = {
    "Theory of Computation": [
        {
            title: "Introduction to Automata",
            description: "Basics of automata theory and formal languages",
            topics: ["Finite automata", "Regular expressions", "Context-free grammars"]
        },
        {
            title: "Turing Machines",
            description: "Understanding Turing machines and their significance",
            topics: ["Turing machine model", "Decidability", "Church-Turing thesis"]
        },
        {
            title: "Complexity Theory",
            description: "Introduction to computational complexity",
            topics: ["P vs NP problem", "Complexity classes", "NP-completeness"]
        }
    ],
    "Computer Networks": [
        {
            title: "Network Models",
            description: "Understanding OSI and TCP/IP models",
            topics: ["OSI layers", "TCP/IP stack", "Network protocols"]
        },
        {
            title: "IP Addressing and Subnetting",
            description: "",
            topics: []
        },
        {
            title: "Routing and Switching",
            description: "",
            topics: []
        }
    ],
    "Operating Systems": [
        {
            title: "Process Management",
            description: "",
            topics: []
        },
        {
            title: "Memory Management",
            description: "",
            topics: []
        },
        {
            title: "File Systems",
            description: "",
            topics: []
        }
    ],
    "Database Management System": [
        {
            title: "Database Design",
            description: "",
            topics: []
        },
        {
            title: "SQL Queries",
            description: "",
            topics: []
        },
        {
            title: "Normalization",
            description: "",
            topics: []
        }
    ],
    "Artificial Intelligence": [
        {
            title: "Introduction to AI",
            description: "",
            topics: []
        },
        {
            title: "Search Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Machine Learning Basics",
            description: "",
            topics: []
        }
    ]
};
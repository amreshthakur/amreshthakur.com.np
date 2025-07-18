const unitData = {
    "Introduction to Information Technology": [
        { title: "Introduction to Computer", description: "Learn the history, evolution, and fundamental concepts of computing technology" },
        { title: "The Computer System Hardware", description: "Explore the physical components that make up a computer system" },
        { title: "Computer Memory", description: "Understand different types of memory and their roles in computer systems" },
        { title: "Input and Output Devices", description: "" },
        { title: "Data Representation", description: "" },
        { title: "Computer Software", description: "" },
        { title: "Data Communication and Computer Network", description: "" },
        { title: "The Internet and Internet Services", description: "" },
        { title: "Fundamentals of Database", description: "" },
        { title: "Multimedia", description: "" },
        { title: "Computer Security", description: "" }
    ],
    "C Programming": [
        { title: "Problem Solving with Computer", description: "Learn algorithmic thinking and problem-solving techniques" },
        { title: "Elements of C", description: "Master the fundamental building blocks of the C programming language" },
        { title: "Input and Output", description: "" },
        { title: "Operators and Expression", description: "" },
        { title: "Control Statement", description: "" },
        { title: "Arrays", description: "" },
        { title: "Functions", description: "Understand function design, implementation, and usage in C" },
        { title: "Structure and Union", description: "" },
        { title: "Pointers", description: "" },
        { title: "File Handling in C", description: "" },
        { title: "Introduction to Graphics", description: "" }
    ],
    "Digital Logic": [
        { title: "Binary Systems", description: "Explore the foundation of digital computing with binary numbers" },
        { title: "Boolean Algebra and Logic Gates", description: "Learn the mathematical foundation of digital circuit design" },
        { title: "Simplification of Boolean Functions", description: "" },
        { title: "Combinational Logic", description: "Design and analyze circuits with outputs based solely on current inputs" },
        { title: "Combinational Logic with MSI and LSI", description: "" },
        { title: "Synchronous and Asynchronous Sequential Logic", description: "" },
        { title: "Registers and Counters", description: "" }
    ],
    "Mathematics I (Calculus)": [
        { title: "Function of One Variable", description: "Explore mathematical functions and their properties" },
        { title: "Limits and Continuity", description: "Understand the fundamental concepts of calculus" },
        { title: "Derivatives", description: "Master the concept of rates of change and slopes of curves" },
        { title: "Applications of Derivatives", description: "" },
        { title: "Antiderivatives", description: "" },
        { title: "Applications of Antiderivatives", description: "" },
        { title: "Ordinary Differential Equations", description: "" },
        { title: "Infinite Sequence and Series", description: "" },
        { title: "Plane and Space Vectors", description: "" },
        { title: "Partial Derivatives and Multiple Integrals", description: "" },
        { title: "Old Syllabus", description: "" }
    ],
    "Physics": [
        { title: "Rotational Dynamics and Oscillatory Motion", description: "Study motion of rigid bodies and periodic oscillations" },
        { title: "Electric and Magnetic Field", description: "Explore the fundamental forces of electromagnetism" },
        { title: "Fundamentals of Atomic Theory", description: "" },
        { title: "Methods of Quantum Mechanics", description: "" },
        { title: "Fundamentals of Solid State Physics", description: "" },
        { title: "Semiconductor and Semiconductor devices", description: "Understand the physics behind modern electronic components" },
        { title: "Universal Gates and Physics of Integrated Circuits", description: "" }
    ],
    "Chapter wise Notes": [
        // Introduction to IT
        { title: "Introduction to Computer", description: "Learn the history, evolution, and fundamental concepts of computing technology" },
        { title: "The Computer System Hardware", description: "Explore the physical components that make up a computer system" },
        { title: "Computer Memory", description: "Understand different types of memory and their roles in computer systems" },
        { title: "Input and Output Devices", description: "" },
        { title: "Data Representation", description: "" },
        { title: "Computer Software", description: "" },
        { title: "Data Communication and Computer Network", description: "" },
        { title: "The Internet and Internet Services", description: "" },
        { title: "Fundamentals of Database", description: "" },
        { title: "Multimedia", description: "" },
        { title: "Computer Security", description: "" },

        // C Programming
        { title: "Problem Solving with Computer", description: "Learn algorithmic thinking and problem-solving techniques" },
        { title: "Elements of C", description: "Master the fundamental building blocks of the C programming language" },
        { title: "Input and Output", description: "" },
        { title: "Operators and Expression", description: "" },
        { title: "Control Statement", description: "" },
        { title: "Arrays", description: "" },
        { title: "Functions", description: "Understand function design, implementation, and usage in C" },
        { title: "Structure and Union", description: "" },
        { title: "Pointers", description: "" },
        { title: "File Handling in C", description: "" },
        { title: "Introduction to Graphics", description: "" },

        // Digital Logic
        { title: "Binary Systems", description: "Explore the foundation of digital computing with binary numbers" },
        { title: "Boolean Algebra and Logic Gates", description: "Learn the mathematical foundation of digital circuit design" },
        { title: "Simplification of Boolean Functions", description: "" },
        { title: "Combinational Logic", description: "Design and analyze circuits with outputs based solely on current inputs" },
        { title: "Combinational Logic with MSI and LSI", description: "" },
        { title: "Synchronous and Asynchronous Sequential Logic", description: "" },
        { title: "Registers and Counters", description: "" },

        // Mathematics
        { title: "Function of One Variable", description: "Explore mathematical functions and their properties" },
        { title: "Limits and Continuity", description: "Understand the fundamental concepts of calculus" },
        { title: "Derivatives", description: "Master the concept of rates of change and slopes of curves" },
        { title: "Applications of Derivatives", description: "" },
        { title: "Antiderivatives", description: "" },
        { title: "Applications of Antiderivatives", description: "" },
        { title: "Ordinary Differential Equations", description: "" },
        { title: "Infinite Sequence and Series", description: "" },
        { title: "Plane and Space Vectors", description: "" },
        { title: "Partial Derivatives and Multiple Integrals", description: "" },
        { title: "Old Syllabus", description: "" },

        // Physics
        { title: "Rotational Dynamics and Oscillatory Motion", description: "Study motion of rigid bodies and periodic oscillations" },
        { title: "Electric and Magnetic Field", description: "Explore the fundamental forces of electromagnetism" },
        { title: "Fundamentals of Atomic Theory", description: "" },
        { title: "Methods of Quantum Mechanics", description: "" },
        { title: "Fundamentals of Solid State Physics", description: "" },
        { title: "Semiconductor and Semiconductor devices", description: "Understand the physics behind modern electronic components" },
        { title: "Universal Gates and Physics of Integrated Circuits", description: "" }
    ]
};





const subjectUnits = {
    "Introduction to Information Technology": [
        {
            title: "Introduction to Computer",
            description: "Learn the history, evolution, and fundamental concepts of computing technology",
            topics: ["Computer generations", "Computer classification", "Basic computer architecture"]
        },
        {
            title: "The Computer System Hardware",
            description: "Explore the physical components that make up a computer system",
            topics: ["CPU architecture", "Motherboard components", "Storage devices", "Peripherals"]
        },
        {
            title: "Computer Memory",
            description: "Understand different types of memory and their roles in computer systems",
            topics: ["RAM vs ROM", "Cache memory", "Virtual memory", "Storage hierarchies"]
        },
        {
            title: "Input and Output Devices",
            description: "",
            topics: []
        },
        {
            title: "Data Representation",
            description: "",
            topics: []
        },
        {
            title: "Computer Software",
            description: "",
            topics: []
        },
        {
            title: "Data Communication and Computer Network",
            description: "",
            topics: []
        },
        {
            title: "The Internet and Internet Services",
            description: "",
            topics: []
        },
        {
            title: "Fundamentals of Database",
            description: "",
            topics: []
        },
        {
            title: "Multimedia",
            description: "",
            topics: []
        },
        {
            title: "Computer Security",
            description: "",
            topics: []
        }
    ],
    "C Programming": [
        {
            title: "Problem Solving with Computer",
            description: "Learn algorithmic thinking and problem-solving techniques",
            topics: ["Algorithm design", "Flowcharts", "Pseudocode", "Problem decomposition"]
        },
        {
            title: "Elements of C",
            description: "Master the fundamental building blocks of the C programming language",
            topics: ["Data types", "Variables", "Operators", "Control structures"]
        },
        {
            title: "Input and Output",
            description: "",
            topics: []
        },
        {
            title: "Operators and Expression",
            description: "",
            topics: []
        },
        {
            title: "Control Statement",
            description: "",
            topics: []
        },
        {
            title: "Arrays",
            description: "",
            topics: []
        },
        {
            title: "Functions",
            description: "Understand function design, implementation, and usage in C",
            topics: ["Function declaration", "Parameters", "Recursion", "Scope rules"]
        },
        {
            title: "Structure and Union",
            description: "",
            topics: []
        },
        {
            title: "Pointers",
            description: "",
            topics: []
        },
        {
            title: "File Handling in C",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Graphics",
            description: "",
            topics: []
        }
    ],
    "Digital Logic": [
        {
            title: "Binary Systems",
            description: "Explore the foundation of digital computing with binary numbers",
            topics: ["Binary arithmetic", "Number conversions", "Signed numbers", "Binary codes"]
        },
        {
            title: "Boolean Algebra and Logic Gates",
            description: "Learn the mathematical foundation of digital circuit design",
            topics: ["Boolean operators", "Logic gates", "Truth tables", "Boolean laws"]
        },
        {
            title: "Simplification of Boolean Functions",
            description: "",
            topics: []
        },
        {
            title: "Combinational Logic",
            description: "Design and analyze circuits with outputs based solely on current inputs",
            topics: ["Adders", "Multiplexers", "Decoders", "Combinational circuit design"]
        },
        {
            title: "Combinational Logic with MSI and LSI",
            description: "",
            topics: []
        },
        {
            title: "Synchronous and Asynchronous Sequential Logic",
            description: "",
            topics: []
        },
        {
            title: "Registers and Counters",
            description: "",
            topics: []
        }
    ],
    "Mathematics I (Calculus)": [
        {
            title: "Function of One Variable",
            description: "Explore mathematical functions and their properties",
            topics: ["Domain and range", "Graphs of functions", "Composite functions", "Inverse functions"]
        },
        {
            title: "Limits and Continuity",
            description: "Understand the fundamental concepts of calculus",
            topics: ["Limit definitions", "Continuity tests", "Discontinuities", "Intermediate value theorem"]
        },
        {
            title: "Derivatives",
            description: "Master the concept of rates of change and slopes of curves",
            topics: ["Derivative rules", "Chain rule", "Implicit differentiation", "Applications"]
        },
        {
            title: "Applications of Derivatives",
            description: "",
            topics: []
        },
        {
            title: "Antiderivatives",
            description: "",
            topics: []
        },
        {
            title: "Applications of Antiderivatives",
            description: "",
            topics: []
        },
        {
            title: "Ordinary Differential Equations",
            description: "",
            topics: []
        },
        {
            title: "Infinite Sequence and Series",
            description: "",
            topics: []
        },
        {
            title: "Plane and Space Vectors",
            description: "",
            topics: []
        },
        {
            title: "Partial Derivatives and Multiple Integrals",
            description: "",
            topics: []
        },
        {
            title: "Old Syllabus",
            description: "",
            topics: []
        }
    ],
    "Physics": [
        {
            title: "Rotational Dynamics and Oscillatory Motion",
            description: "Study motion of rigid bodies and periodic oscillations",
            topics: ["Torque", "Moment of inertia", "Simple harmonic motion", "Pendulum motion"]
        },
        {
            title: "Electric and Magnetic Field",
            description: "Explore the fundamental forces of electromagnetism",
            topics: ["Coulomb's law", "Gauss's law", "Magnetic fields", "Electromagnetic induction"]
        },
        {
            title: "Fundamentals of Atomic Theory",
            description: "",
            topics: []
        },
        {
            title: "Methods of Quantum Mechanics",
            description: "",
            topics: []
        },
        {
            title: "Fundamentals of Solid State Physics",
            description: "",
            topics: []
        },
        {
            title: "Semiconductor and Semiconductor devices",
            description: "Understand the physics behind modern electronic components",
            topics: ["Band theory", "Diodes", "Transistors", "Integrated circuits"]
        },
        {
            title: "Universal Gates and Physics of Integrated Circuits",
            description: "",
            topics: []
        }
    ],
    "Discrete Structures": [
        {
            title: "Basic Discrete Structures",
            description: "",
            topics: []
        },
        {
            title: "Integers and Matrices",
            description: "",
            topics: []
        },
        {
            title: "Logic and Proof Methods",
            description: "",
            topics: []
        },
        {
            title: "Induction and Recursion",
            description: "",
            topics: []
        },
        {
            title: "Counting and Discrete Probability",
            description: "",
            topics: []
        },
        {
            title: "Relations and Graphs",
            description: "",
            topics: []
        }
    ],
    "Object Oriented Programming": [
        {
            title: "Introduction to Object Oriented Programming",
            description: "Learn the fundamental principles of object-oriented programming",
            topics: ["Classes and objects", "Encapsulation", "Abstraction", "OOP vs procedural"]
        },
        {
            title: "Basics of C++ programming",
            description: "",
            topics: []
        },
        {
            title: "Classes & Objects",
            description: "Master the building blocks of OOP systems",
            topics: ["Class definition", "Constructors", "Methods", "Access modifiers"]
        },
        {
            title: "Operator Overloading",
            description: "",
            topics: []
        },
        {
            title: "Inheritance",
            description: "Understand how classes can inherit properties from other classes",
            topics: ["Superclass/subclass", "Method overriding", "Abstract classes", "Inheritance hierarchies"]
        },
        {
            title: "Virtual Function, Polymorphism, and miscellaneous",
            description: "",
            topics: []
        },
        {
            title: "Function Templates and Exception Handling",
            description: "",
            topics: []
        },
        {
            title: "File handling",
            description: "",
            topics: []
        }
    ],
    "Microprocessor": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Basic Architecture",
            description: "",
            topics: []
        },
        {
            title: "Instruction Cycle",
            description: "",
            topics: []
        },
        {
            title: "Basic I/O, Memory R/W and Interrupt Operations",
            description: "",
            topics: []
        },
        {
            title: "Assembly Language Programming",
            description: "",
            topics: []
        },
        {
            title: "Input/ Output Interfaces",
            description: "",
            topics: []
        },
        {
            title: "Advanced Microprocessors",
            description: "",
            topics: []
        }
    ],
    "Statistics I": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Descriptive Statistics",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Probability",
            description: "",
            topics: []
        },
        {
            title: "Sampling",
            description: "",
            topics: []
        },
        {
            title: "Random Variables and Mathematical Expectation",
            description: "",
            topics: []
        },
        {
            title: "Probability Distributions",
            description: "",
            topics: []
        },
        {
            title: "Correlation and Linear Regression",
            description: "",
            topics: []
        }
    ],
    "Mathematics II": [
        {
            title: "Linear Equations in Linear Algebra",
            description: "",
            topics: []
        },
        {
            title: "Transformation",
            description: "",
            topics: []
        },
        {
            title: "Matrix Algebra",
            description: "",
            topics: []
        },
        {
            title: "Determinants",
            description: "",
            topics: []
        },
        {
            title: "Vector Spaces",
            description: "",
            topics: []
        },
        {
            title: "Vector Space Continued",
            description: "",
            topics: []
        },
        {
            title: "Eigenvalues and Eigen Vectors",
            description: "",
            topics: []
        },
        {
            title: "Orthogonality and Least Squares",
            description: "",
            topics: []
        },
        {
            title: "Groups and Subgroups",
            description: "",
            topics: []
        },
        {
            title: "Rings and Fields",
            description: "",
            topics: []
        }
    ],
    "Data Structures and Algorithms": [
        {
            title: "Introduction to Data Structures & Algorithms",
            description: "Learn to analyze the efficiency of algorithms",
            topics: ["Time complexity", "Space complexity", "Big O notation", "Algorithm efficiency"]
        },
        {
            title: "Stack",
            description: "",
            topics: []
        },
        {
            title: "Queue",
            description: "",
            topics: []
        },
        {
            title: "Recursion",
            description: "",
            topics: []
        },
        {
            title: "Lists",
            description: "",
            topics: []
        },
        {
            title: "Sorting",
            description: "",
            topics: []
        },
        {
            title: "Searching and Hashing",
            description: "",
            topics: []
        },
        {
            title: "Trees and Graphs",
            description: "Understand hierarchical data structures and their applications",
            topics: ["Tree terminology", "Binary trees", "BST operations", "Tree traversals"]
        }
    ],
    "Numerical Method": [
        {
            title: "Solution of Nonlinear Equations",
            description: "",
            topics: []
        },
        {
            title: "Interpolation and Regression",
            description: "",
            topics: []
        },
        {
            title: "Numerical Differentiation and Integration",
            description: "",
            topics: []
        },
        {
            title: "Solving System of Linear Equations",
            description: "",
            topics: []
        },
        {
            title: "Solution of Ordinary Differential Equations",
            description: "",
            topics: []
        },
        {
            title: "Solution of Partial Differential Equations",
            description: "",
            topics: []
        }
    ],
    "Computer Architecture": [
        {
            title: "Data Representation",
            description: "",
            topics: []
        },
        {
            title: "Register Transfer and Microoperations",
            description: "",
            topics: []
        },
        {
            title: "Basic Computer Organization and Design",
            description: "",
            topics: []
        },
        {
            title: "Microprogrammed Control",
            description: "",
            topics: []
        },
        {
            title: "Central Processing Unit",
            description: "",
            topics: []
        },
        {
            title: "Pipelining",
            description: "",
            topics: []
        },
        {
            title: "Computer Arithmetic",
            description: "",
            topics: []
        },
        {
            title: "Input Output Organization",
            description: "",
            topics: []
        },
        {
            title: "Memory Organization",
            description: "",
            topics: []
        }
    ],
    "Computer Graphics": [
        {
            title: "Introduction of Computer Graphics",
            description: "",
            topics: []
        },
        {
            title: "Scan Conversion Algorithm",
            description: "",
            topics: []
        },
        {
            title: "Two-Dimensional Geometric Transformations",
            description: "",
            topics: []
        },
        {
            title: "Three-Dimensional Geometric Transformation",
            description: "",
            topics: []
        },
        {
            title: "3D Objects Representation",
            description: "",
            topics: []
        },
        {
            title: "Solid Modeling",
            description: "",
            topics: []
        },
        {
            title: "Visible Surface Detections",
            description: "",
            topics: []
        },
        {
            title: "Illumination Models and Surface Rendering Techniq",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Virtual Reality",
            description: "",
            topics: []
        },
        {
            title: "Introduction to OpenGL",
            description: "",
            topics: []
        }
    ],
    "Statistics II": [
        {
            title: "Sampling Distribution and Estimation",
            description: "",
            topics: []
        },
        {
            title: "Testing of hypothesis",
            description: "",
            topics: []
        },
        {
            title: "Non parametric test",
            description: "",
            topics: []
        },
        {
            title: "Multiple correlation and regression",
            description: "",
            topics: []
        },
        {
            title: "Design of experiment",
            description: "",
            topics: []
        },
        {
            title: "Stochastic Process",
            description: "",
            topics: []
        }
    ],
    "Theory of Computation": [
        {
            title: "Basic Foundations",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Finite Automata",
            description: "",
            topics: []
        },
        {
            title: "Regular Expressions",
            description: "",
            topics: []
        },
        {
            title: "Context Free Grammar",
            description: "",
            topics: []
        },
        {
            title: "Push Down Automata",
            description: "",
            topics: []
        },
        {
            title: "Turing Machines",
            description: "",
            topics: []
        },
        {
            title: "Undecidability and Intractability",
            description: "",
            topics: []
        }
    ],
    "Computer Networks": [
        {
            title: "Introduction to Computer Network",
            description: "Understand the basic concepts of computer networking",
            topics: ["Network types", "Topologies", "Protocols", "OSI model"]
        },
        {
            title: "Physical Layer and Network Media",
            description: "",
            topics: []
        },
        {
            title: "Data Link Layer",
            description: "",
            topics: []
        },
        {
            title: "Network Layer",
            description: "",
            topics: []
        },
        {
            title: "Transport Layer",
            description: "Learn about end-to-end communication services",
            topics: ["TCP", "UDP", "Flow control", "Congestion control"]
        },
        {
            title: "Application Layer",
            description: "Explore network applications and their protocols",
            topics: ["HTTP", "FTP", "SMTP", "DNS"]
        },
        {
            title: "Multimedia &Future Networking",
            description: "",
            topics: []
        }
    ],
    "Operating Systems": [
        {
            title: "Operating System Overview",
            description: "Explore the fundamental concepts of operating systems",
            topics: ["OS functions", "Kernel types", "System calls", "OS evolution"]
        },
        {
            title: "Process Management",
            description: "Understand how operating systems manage program execution",
            topics: ["Process states", "Context switching", "Scheduling algorithms", "Inter-process communication"]
        },
        {
            title: "Process Deadlocks",
            description: "",
            topics: []
        },
        {
            title: "Memory Management",
            description: "Learn how operating systems manage computer memory",
            topics: ["Paging", "Segmentation", "Virtual memory", "Memory allocation"]
        },
        {
            title: "File Management",
            description: "",
            topics: []
        },
        {
            title: "Device Management",
            description: "",
            topics: []
        },
        {
            title: "Linux Case Study",
            description: "",
            topics: []
        }
    ],
    "Database Management System": [
        {
            title: "Database and Database Users",
            description: "Learn the fundamental principles of database systems",
            topics: ["Data models", "Database architecture", "DBMS components", "Data independence"]
        },
        {
            title: "Database System – Concepts and Architecture",
            description: "",
            topics: []
        },
        {
            title: "Data Modeling Using the Entity-Relational Model",
            description: "",
            topics: []
        },
        {
            title: "The Relational Data Model and Relational Database",
            description: "Master the most widely used database model",
            topics: ["Relations and tuples", "Keys and constraints", "Relational algebra", "Normalization"]
        },
        {
            title: "The Relational Algebra and Relational Calculus",
            description: "",
            topics: []
        },
        {
            title: "SQL",
            description: "Learn to interact with databases using SQL",
            topics: ["DDL commands", "DML commands", "Queries", "Joins and subqueries"]
        },
        {
            title: "Relational Database Design",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Transaction Processing Concepts an",
            description: "",
            topics: []
        },
        {
            title: "Concurrency Control Techniques",
            description: "",
            topics: []
        },
        {
            title: "Database Recovery Techniques",
            description: "",
            topics: []
        }
    ],
    "Artificial Intelligence": [
        {
            title: "Introduction",
            description: "Fundamentals of AI and machine learning",
            topics: ["AI history", "AI approaches", "Applications of AI"]
        },
        {
            title: "Intelligent Agents",
            description: "",
            topics: []
        },
        {
            title: "Problem Solving by Searching",
            description: "",
            topics: []
        },
        {
            title: "Knowledge Representation",
            description: "",
            topics: []
        },
        {
            title: "Machine Learning",
            description: "",
            topics: []
        },
        {
            title: "Applications of AI",
            description: "",
            topics: []
        }
    ],
    "Microprocessor Based Design": [
        {
            title: "Introduction to Microcontroller",
            description: "",
            topics: []
        },
        {
            title: "Sensors and Actuators",
            description: "",
            topics: []
        },
        {
            title: "Bus and Communication Technology",
            description: "",
            topics: []
        },
        {
            title: "Introduction to 8051 Microcontroller and Programming",
            description: "",
            topics: []
        },
        {
            title: "Electromagnetic Interference and Compatibility",
            description: "",
            topics: []
        }
    ],
    "Wireless Networking": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Wireless Channel Characterization",
            description: "",
            topics: []
        },
        {
            title: "Wireless Communication Techniques",
            description: "",
            topics: []
        },
        {
            title: "Fundamental of Cellular Communications",
            description: "",
            topics: []
        },
        {
            title: "Mobility Management in Wireless Networks",
            description: "",
            topics: []
        },
        {
            title: "Overview of Mobile Network and Transport Layer",
            description: "",
            topics: []
        },
        {
            title: "Advances in Wireless Networking",
            description: "",
            topics: []
        }
    ],
    "Multimedia Computing": [
        {
            title: "Introduction to Computers",
            description: "",
            topics: []
        },
        {
            title: "Sound Audio System",
            description: "",
            topics: []
        },
        {
            title: "Images and Graphics",
            description: "",
            topics: []
        },
        {
            title: "Video and Animation",
            description: "",
            topics: []
        },
        {
            title: "Data Compression",
            description: "",
            topics: []
        },
        {
            title: "User Interfaces",
            description: "",
            topics: []
        },
        {
            title: "Abstractions for programming",
            description: "",
            topics: []
        },
        {
            title: "Multimedia Application",
            description: "",
            topics: []
        }
    ],
    "Web Technology": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Hyper Text Markup Language",
            description: "",
            topics: []
        },
        {
            title: "Cascading Style Sheets",
            description: "",
            topics: []
        },
        {
            title: "Client Side Scripting with JavaScript",
            description: "",
            topics: []
        },
        {
            title: "AJAX and XML",
            description: "",
            topics: []
        },
        {
            title: "Server Side Scripting using PHP",
            description: "",
            topics: []
        }
    ],
    "System Analysis and Design": [
        {
            title: "Foundations for Systems Development",
            description: "",
            topics: []
        },
        {
            title: "Planning",
            description: "",
            topics: []
        },
        {
            title: "Analysis",
            description: "",
            topics: []
        },
        {
            title: "Design",
            description: "",
            topics: []
        },
        {
            title: "Implementation and Maintenance",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Object-Oriented Development",
            description: "",
            topics: []
        }
    ],
    "Society and Ethics in Information Technology": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Social and cultural change",
            description: "",
            topics: []
        },
        {
            title: "Understanding development",
            description: "",
            topics: []
        },
        {
            title: "Process of transformation",
            description: "",
            topics: []
        },
        {
            title: "Ethics and Ethical Analysis",
            description: "",
            topics: []
        },
        {
            title: "Intellectual Property Rights and Computer Technology",
            description: "",
            topics: []
        },
        {
            title: "Social Context of Computing",
            description: "",
            topics: []
        },
        {
            title: "Software Issues",
            description: "",
            topics: []
        },
        {
            title: "New Frontiers for Computer Ethics",
            description: "",
            topics: []
        }
    ],
    "Knowledge Management": [],
    "Design and Analysis of Algorithms": [
        {
            title: "Foundation of Algorithm Analysis",
            description: "",
            topics: []
        },
        {
            title: "Iterative Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Divide and Conquer Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Greedy Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Dynamic Programming",
            description: "",
            topics: []
        },
        {
            title: "Backtracking",
            description: "",
            topics: []
        },
        {
            title: "Number Theoretic Algorithms",
            description: "",
            topics: []
        },
        {
            title: "NP Completeness",
            description: "",
            topics: []
        }
    ],
    "Simulation and Modelling": [
        {
            title: "Introduction to Simulation",
            description: "",
            topics: []
        },
        {
            title: "Simulation of Continuous and Discrete System",
            description: "",
            topics: []
        },
        {
            title: "Queuing System",
            description: "",
            topics: []
        },
        {
            title: "Markov Chains",
            description: "",
            topics: []
        },
        {
            title: "Random Numbers",
            description: "",
            topics: []
        },
        {
            title: "Verification and Validation",
            description: "",
            topics: []
        },
        {
            title: "Analysis of Simulation Output",
            description: "",
            topics: []
        },
        {
            title: "Simulation of Computer Systems",
            description: "",
            topics: []
        }
    ],
    "Image Processing": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Image Enhancement and Filter in Spatial Domain",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Morphological Image Processing",
            description: "",
            topics: []
        },
        {
            title: "Image Segmentation",
            description: "",
            topics: []
        },
        {
            title: "Representations, Description and Recognition",
            description: "",
            topics: []
        }
    ],
    "Cryptography": [
        {
            title: "Introduction and Classical Ciphers",
            description: "",
            topics: []
        },
        {
            title: "Symmetric Ciphers",
            description: "",
            topics: []
        },
        {
            title: "Asymmetric Ciphers",
            description: "",
            topics: []
        },
        {
            title: "Cryptographic Hash Functions and Digital Signature",
            description: "",
            topics: []
        },
        {
            title: "Authentication",
            description: "",
            topics: []
        },
        {
            title: "Malicious Logic",
            description: "",
            topics: []
        },
        {
            title: "Network Security and Public Key Infrastructure",
            description: "",
            topics: []
        }
    ],
    "Software Engineering": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Software Processes",
            description: "",
            topics: []
        },
        {
            title: "Agile Software Development",
            description: "",
            topics: []
        },
        {
            title: "Requirements Engineering",
            description: "",
            topics: []
        },
        {
            title: "System Modeling",
            description: "",
            topics: []
        },
        {
            title: "Architectural Design",
            description: "",
            topics: []
        },
        {
            title: "Design and Implementation",
            description: "",
            topics: []
        },
        {
            title: "Software Testing",
            description: "",
            topics: []
        },
        {
            title: "Software Evolution",
            description: "",
            topics: []
        },
        {
            title: "Software Management",
            description: "",
            topics: []
        }
    ],
    "Compiler Design and Construction": [
        {
            title: "Unit 1",
            description: "",
            topics: []
        },
        {
            title: "Unit 2",
            description: "",
            topics: []
        },
        {
            title: "Unit 3",
            description: "",
            topics: []
        },
        {
            title: "Unit 4",
            description: "",
            topics: []
        }
    ],
    "E-Governance": [
        {
            title: "Introduction to E-Government and E-Governance",
            description: "",
            topics: []
        },
        {
            title: "Models of E-Governance",
            description: "",
            topics: []
        },
        {
            title: "E-Government Infrastructure Development",
            description: "",
            topics: []
        },
        {
            title: "Security for e-Government",
            description: "",
            topics: []
        },
        {
            title: "Applications of Data Warehousing and Data Mining in Government",
            description: "",
            topics: []
        },
        {
            title: "Case Studies",
            description: "",
            topics: []
        }
    ],
    "NET Centric Computing": [
        {
            title: "Language Preliminaries",
            description: "",
            topics: []
        },
        {
            title: "Introduction to ASP.NET",
            description: "",
            topics: []
        },
        {
            title: "HTTP and ASP.NET Core",
            description: "",
            topics: []
        },
        {
            title: "Creating ASP.NET core MVC applications",
            description: "",
            topics: []
        },
        {
            title: "Working with Database",
            description: "",
            topics: []
        },
        {
            title: "State Management on ASP.NET Core Application",
            description: "",
            topics: []
        },
        {
            title: "Client-side Development in ASP.NET Core",
            description: "",
            topics: []
        },
        {
            title: "Securing in ASP.NET Core Application",
            description: "",
            topics: []
        },
        {
            title: "Hosting and Deploying ASP.NET Core Application",
            description: "",
            topics: []
        }
    ],
    "Technical Writing": [
        {
            title: "What Is Technical Writing",
            description: "",
            topics: []
        },
        {
            title: "Audience and Purpose",
            description: "",
            topics: []
        },
        {
            title: "Writing Process",
            description: "",
            topics: []
        },
        {
            title: "Brief Correspondence",
            description: "",
            topics: []
        },
        {
            title: "Document Design and Graphics",
            description: "",
            topics: []
        },
        {
            title: "Writing for the Web",
            description: "",
            topics: []
        },
        {
            title: "Information Reports",
            description: "",
            topics: []
        },
        {
            title: "Employment Communication",
            description: "",
            topics: []
        },
        {
            title: "Presentations",
            description: "",
            topics: []
        },
        {
            title: "Recommendation Reports",
            description: "",
            topics: []
        },
        {
            title: "Proposals",
            description: "",
            topics: []
        },
        {
            title: "Ethics in the Workplace",
            description: "",
            topics: []
        }
    ],
    "Applied Logic": [
        {
            title: "Argument Analysis",
            description: "",
            topics: []
        },
        {
            title: "Categorical Propositions and Syllogisms",
            description: "",
            topics: []
        },
        {
            title: "Symbolic Logic",
            description: "",
            topics: []
        },
        {
            title: "Quantification Theory",
            description: "",
            topics: []
        },
        {
            title: "Fallacies",
            description: "",
            topics: []
        },
        {
            title: "Analogical and Casual Reasoning",
            description: "",
            topics: []
        }
    ],
    "E-commerce": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "E-commerce Business Model",
            description: "",
            topics: []
        },
        {
            title: "Electronic Payment System",
            description: "",
            topics: []
        },
        {
            title: "Building E-commerce System",
            description: "",
            topics: []
        },
        {
            title: "Security in E-Commerce",
            description: "",
            topics: []
        },
        {
            title: "Digital Marketing",
            description: "",
            topics: []
        },
        {
            title: "Optimizing E-commerce Systems",
            description: "",
            topics: []
        }
    ],
    "Automation and Robotics": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Power Sources and Sensors",
            description: "",
            topics: []
        },
        {
            title: "Manipulators, Actuators, and Grippers",
            description: "",
            topics: []
        },
        {
            title: "Kinematics and Path Planning",
            description: "",
            topics: []
        },
        {
            title: "Process Control",
            description: "",
            topics: []
        },
        {
            title: "Case Studies",
            description: "",
            topics: []
        }
    ],
    "Neural Networks": [
        {
            title: "Introduction to Neural Network",
            description: "",
            topics: []
        },
        {
            title: "Rosenblatt’s Perceptron",
            description: "",
            topics: []
        },
        {
            title: "Model Building through Regression",
            description: "",
            topics: []
        },
        {
            title: "The Least-Mean-Square Algorithm",
            description: "",
            topics: []
        },
        {
            title: "Multilayer Perceptron",
            description: "",
            topics: []
        },
        {
            title: "Kernel Methods and Radial-Basis Function Networks",
            description: "",
            topics: []
        },
        {
            title: "Self-Organizing Maps",
            description: "",
            topics: []
        },
        {
            title: "Dynamic Driven Recurrent Networks",
            description: "",
            topics: []
        }
    ],
    "Computer Hardware Design": [
        {
            title: "Computer Abstractions and Technology",
            description: "",
            topics: []
        },
        {
            title: "Instructions: Language of the Computer",
            description: "",
            topics: []
        },
        {
            title: "Arithmetic for Computers",
            description: "",
            topics: []
        },
        {
            title: "The Processor",
            description: "",
            topics: []
        },
        {
            title: "Large and Fast: Exploiting Memory Hierarchy",
            description: "",
            topics: []
        },
        {
            title: "Storage and Other I/O Topics",
            description: "",
            topics: []
        },
        {
            title: "Multicores, Multiprocessors, and Clusters",
            description: "",
            topics: []
        }
    ],
    "Cognitive Science": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Precursors of Cognitive Science",
            description: "",
            topics: []
        },
        {
            title: "Psycological Perspective of Cognition",
            description: "",
            topics: []
        },
        {
            title: "Physical Symbol System and Language of Thought",
            description: "",
            topics: []
        },
        {
            title: "Cognitive System",
            description: "",
            topics: []
        },
        {
            title: "Brain Mapping",
            description: "",
            topics: []
        },
        {
            title: "Mind Reading",
            description: "",
            topics: []
        },
        {
            title: "Neural Networks and Distributed Information Processing",
            description: "",
            topics: []
        }
    ],
    "Advanced Java Programming": [
        {
            title: "Programming in Java",
            description: "",
            topics: []
        },
        {
            title: "User Interface Components with Swing",
            description: "",
            topics: []
        },
        {
            title: "Event Handling",
            description: "",
            topics: []
        },
        {
            title: "Database Connectivity",
            description: "",
            topics: []
        },
        {
            title: "Network Programming",
            description: "",
            topics: []
        },
        {
            title: "GUI with JavaFX",
            description: "",
            topics: []
        },
        {
            title: "Servlets and Java Server pages",
            description: "",
            topics: []
        },
        {
            title: "RMI and CORBA",
            description: "",
            topics: []
        }
    ],
    "Data Warehousing and Data Mining": [
        {
            title: "Introduction to Data Warehousing",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Data Mining",
            description: "",
            topics: []
        },
        {
            title: "Data Preprocessing",
            description: "",
            topics: []
        },
        {
            title: "Data Cube Technology",
            description: "",
            topics: []
        },
        {
            title: "Mining Frequent Patterns",
            description: "",
            topics: []
        },
        {
            title: "Classification and Prediction",
            description: "",
            topics: []
        },
        {
            title: "Cluster Analysis",
            description: "",
            topics: []
        },
        {
            title: "Graph Mining and Social Network Analysis",
            description: "",
            topics: []
        },
        {
            title: "Mining Spatial, Multimedia, Text and Web Data",
            description: "",
            topics: []
        }
    ],
    "Principles of Management": [
        {
            title: "The Nature of Organizations",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Management",
            description: "",
            topics: []
        },
        {
            title: "Evolution of Management Thought",
            description: "",
            topics: []
        },
        {
            title: "Environmental Context of Management",
            description: "",
            topics: []
        },
        {
            title: "Planning and Decision Making",
            description: "",
            topics: []
        },
        {
            title: "Organizing Function",
            description: "",
            topics: []
        },
        {
            title: "Leadership & Conflict",
            description: "",
            topics: []
        },
        {
            title: "Motivation",
            description: "",
            topics: []
        },
        {
            title: "Communication",
            description: "",
            topics: []
        },
        {
            title: "Control and Quality Management",
            description: "",
            topics: []
        },
        {
            title: "Global Context of Management",
            description: "",
            topics: []
        },
        {
            title: "Management Trends and Scenario in Nepal",
            description: "",
            topics: []
        }
    ],
    "Project Work": [],
    "Information Retrieval": [
        {
            title: "Introduction to IR and Web Search",
            description: "",
            topics: []
        },
        {
            title: "Text properties, operations and preprocessing",
            description: "",
            topics: []
        },
        {
            title: "Basic IR Models",
            description: "",
            topics: []
        },
        {
            title: "Evaluation of IR",
            description: "",
            topics: []
        },
        {
            title: "Query Operations and Languages",
            description: "",
            topics: []
        },
        {
            title: "Web Search",
            description: "",
            topics: []
        },
        {
            title: "Text Categorization",
            description: "",
            topics: []
        },
        {
            title: "Text Clustering",
            description: "",
            topics: []
        },
        {
            title: "Recommender System",
            description: "",
            topics: []
        },
        {
            title: "Question Answering",
            description: "",
            topics: []
        },
        {
            title: "Advanced IR Models",
            description: "",
            topics: []
        }
    ],
    "Database Administration": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Tablespace and Storage management",
            description: "",
            topics: []
        },
        {
            title: "Managing Database Objects",
            description: "",
            topics: []
        },
        {
            title: "Database Backup, Restore, and Recovery",
            description: "",
            topics: []
        },
        {
            title: "Database Security and Auditing",
            description: "",
            topics: []
        },
        {
            title: "Multitenant Database Architecture",
            description: "",
            topics: []
        },
        {
            title: "Database Tuning",
            description: "",
            topics: []
        }
    ],
    "Software Project Management": [
        {
            title: "Introduction to Software Project Management",
            description: "",
            topics: []
        },
        {
            title: "Project Analysis",
            description: "",
            topics: []
        },
        {
            title: "Activity Planning and Scheduling",
            description: "",
            topics: []
        },
        {
            title: "Risk Management",
            description: "",
            topics: []
        },
        {
            title: "Resource allocation",
            description: "",
            topics: []
        },
        {
            title: "Monitoring and control",
            description: "",
            topics: []
        },
        {
            title: "Managing Contracts and people",
            description: "",
            topics: []
        },
        {
            title: "Software quality assurance and testing",
            description: "",
            topics: []
        },
        {
            title: "Software Configuration Management",
            description: "",
            topics: []
        }
    ],
    "Network Security": [
        {
            title: "Computer Network Security Fundamentals",
            description: "",
            topics: []
        },
        {
            title: "User Authentication",
            description: "",
            topics: []
        },
        {
            title: "Transport Level Security",
            description: "",
            topics: []
        },
        {
            title: "Wireless Network Security",
            description: "",
            topics: []
        },
        {
            title: "Electronic Mail Security",
            description: "",
            topics: []
        },
        {
            title: "IP Security",
            description: "",
            topics: []
        },
        {
            title: "Network Endpoint Security",
            description: "",
            topics: []
        },
        {
            title: "Cloud and Internet of Things (IOT) Security",
            description: "",
            topics: []
        }
    ],
    "Digital System Design": [
        {
            title: "Unit 1",
            description: "",
            topics: []
        },
        {
            title: "Unit 2",
            description: "",
            topics: []
        },
        {
            title: "Unit 3",
            description: "",
            topics: []
        },
        {
            title: "Unit 4",
            description: "",
            topics: []
        },
        {
            title: "Unit 5",
            description: "",
            topics: []
        },
        {
            title: "Unit 6",
            description: "",
            topics: []
        },
        {
            title: "Unit 7",
            description: "",
            topics: []
        },
        {
            title: "Unit 8",
            description: "",
            topics: []
        }
    ],
    "Network and System Administration": [
        {
            title: "Networking Overview",
            description: "",
            topics: []
        },
        {
            title: "Server Administration Basics",
            description: "",
            topics: []
        },
        {
            title: "Network Configuration Basics",
            description: "",
            topics: []
        },
        {
            title: "Dynamic Host Configuration Protocol (DHCP)",
            description: "",
            topics: []
        },
        {
            title: "Name Server and Configuration",
            description: "",
            topics: []
        },
        {
            title: "Web and Proxy Server Configuration",
            description: "",
            topics: []
        },
        {
            title: "FTP, File and Print Server",
            description: "",
            topics: []
        },
        {
            title: "Mail Server basics",
            description: "",
            topics: []
        },
        {
            title: "Remote Administration and Management",
            description: "",
            topics: []
        }
    ],
    "International Marketing": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "International Marketing Environment",
            description: "",
            topics: []
        },
        {
            title: "International Marketing Research Global Marketing Information System",
            description: "",
            topics: []
        },
        {
            title: "International Marketing Management",
            description: "",
            topics: []
        },
        {
            title: "Nepal’s International Trade",
            description: "",
            topics: []
        }
    ],
    "Advanced Database": [
        {
            title: "Enhanced Entity Relationship Model and Relational Model",
            description: "",
            topics: []
        },
        {
            title: "Object and Object Relational Databases",
            description: "",
            topics: []
        },
        {
            title: "Query Processing and Optimization",
            description: "",
            topics: []
        },
        {
            title: "Distributed Databases, NOSQL Systems, and BigData",
            description: "",
            topics: []
        },
        {
            title: "Advanced Database Models, Systems, and Applications",
            description: "",
            topics: []
        }
    ],
    "Internship": [
        {
            title: "Nature of Internship",
            description: "",
            topics: []
        },
        {
            title: "Phases of Internship",
            description: "",
            topics: []
        },
        {
            title: "Provision of Supervision",
            description: "",
            topics: []
        },
        {
            title: "Provision of Mentorship",
            description: "",
            topics: []
        },
        {
            title: "Evaluation Scheme",
            description: "",
            topics: []
        },
        {
            title: "Report Contents",
            description: "",
            topics: []
        },
        {
            title: "Citation and Referencing",
            description: "",
            topics: []
        },
        {
            title: "Report Format Standards",
            description: "",
            topics: []
        },
        {
            title: "Final Report Binding and Submission",
            description: "",
            topics: []
        }
    ],
    "Advanced Networking with IPv6": [
        {
            title: "Networking Protocols",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Networking",
            description: "",
            topics: []
        },
        {
            title: "Next Generation Internet",
            description: "",
            topics: []
        },
        {
            title: "ICMPv6 and Neighbor Discovery",
            description: "",
            topics: []
        },
        {
            title: "Security and Quality of Service in IPv6",
            description: "",
            topics: []
        },
        {
            title: "IPv6 Routing",
            description: "",
            topics: []
        },
        {
            title: "IPv4/IPv6 Transition Mechanisms",
            description: "",
            topics: []
        },
        {
            title: "IPv6 Network and Server Deployment",
            description: "",
            topics: []
        }
    ],
    "Distributed Networking": [
        {
            title: "Protocols-functions",
            description: "",
            topics: []
        },
        {
            title: "Network Design",
            description: "",
            topics: []
        },
        {
            title: "Inter-process Communication",
            description: "",
            topics: []
        },
        {
            title: "Distributed Objects and Remote Invocation",
            description: "",
            topics: []
        },
        {
            title: "Distributed OS",
            description: "",
            topics: []
        },
        {
            title: "Advance Application",
            description: "",
            topics: []
        }
    ],
    "Game Technology": [],
    "Distributed and Object Oriented Database": [
        {
            title: "Introduction to Distributed Database,Distributed Database Architectures,Distributed Database Design",
            description: "",
            topics: []
        },
        {
            title: "Distributed Query Processing,Distributed Transaction Management, Distributed Concurrency Control,Reliability of Distributed DBMS and Recovery",
            description: "",
            topics: []
        },
        {
            title: "Object Oriented Database Concept, OODBMS Architecture Approach,The Object Oriented DBMS Architecture",
            description: "",
            topics: []
        }
    ],
    "Introduction to Cloud Computing": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Cloud Service Models",
            description: "",
            topics: []
            
        },
        {
            title: "Building Cloud Networks",
            description: "",
            topics: []
        },
        {
            title: "Security in Cloud Computing",
            description: "",
            topics: []
        }
    ],
    "Geographical Information System": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Digital mapping concept",
            description: "",
            topics: []
        },
        {
            title: "spatial data modeling and database design",
            description: "",
            topics: []
        },
        {
            title: "capturing the real world",
            description: "",
            topics: []
        },
        {
            title: "spatial analysis and visualization",
            description: "",
            topics: []
        },
        {
            title: "introduction to spatial data infrastructure",
            description: "",
            topics: []
        },
        {
            title: "Open GIS",
            description: "",
            topics: []
        }
    ],
    "Decision Support System and Expert System": [
        {
            title: "Decision Making and Computerized Support",
            description: "",
            topics: []
        },
        {
            title: "Decision Support Systems",
            description: "",
            topics: []
        },
        {
            title: "Knowledge Management",
            description: "",
            topics: []
        },
        {
            title: "Intelligent Decision Support Systems",
            description: "",
            topics: []
        }
    ],
    "Mobile Application Development": [],
    "Embedded Systems Programming": [],
    "International Business Management": []
};



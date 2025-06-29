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
    "Discrete Structures": [
        { title: "Basic Discrete Structures", description: "" },
        { title: "Integers and Matrices", description: "" },
        { title: "Logic and Proof Methods", description: "" },
        { title: "Induction and Recursion", description: "" },
        { title: "Counting and Discrete Probability", description: "" },
        { title: "Relations and Graphs", description: "" }
    ],
    "Object Oriented Programming": [
        { title: "Introduction to Object Oriented Programming", description: "Learn the fundamental principles of object-oriented programming" },
        { title: "Basics of C++ programming", description: "" },
        { title: "Classes & Objects", description: "Master the building blocks of OOP systems" },
        { title: "Operator Overloading", description: "" },
        { title: "Inheritance", description: "Understand how classes can inherit properties from other classes" },
        { title: "Virtual Function, Polymorphism, and miscellaneous", description: "" },
        { title: "Function Templates and Exception Handling", description: "" },
        { title: "File handling", description: "" }
    ],
    "Microprocessor": [
        { title: "Introduction", description: "" },
        { title: "Basic Architecture", description: "" },
        { title: "Instruction Cycle", description: "" },
        { title: "Basic I/O, Memory R/W and Interrupt Operations", description: "" },
        { title: "Assembly Language Programming", description: "" },
        { title: "Input/ Output Interfaces", description: "" },
        { title: "Advanced Microprocessors", description: "" }
    ],
    "Statistics I": [
        { title: "Introduction", description: "" },
        { title: "Descriptive Statistics", description: "" },
        { title: "Introduction to Probability", description: "" },
        { title: "Sampling", description: "" },
        { title: "Random Variables and Mathematical Expectation", description: "" },
        { title: "Probability Distributions", description: "" },
        { title: "Correlation and Linear Regression", description: "" }
    ],
    "Mathematics II": [
        { title: "Linear Equations in Linear Algebra", description: "" },
        { title: "Transformation", description: "" },
        { title: "Matrix Algebra", description: "" },
        { title: "Determinants", description: "" },
        { title: "Vector Spaces", description: "" },
        { title: "Vector Space Continued", description: "" },
        { title: "Eigenvalues and Eigen Vectors", description: "" },
        { title: "Orthogonality and Least Squares", description: "" },
        { title: "Groups and Subgroups", description: "" },
        { title: "Rings and Fields", description: "" }
    ],
    "Data Structures and Algorithms": [
        { title: "Introduction to Data Structures & Algorithms", description: "Learn to analyze the efficiency of algorithms" },
        { title: "Stack", description: "" },
        { title: "Queue", description: "" },
        { title: "Recursion", description: "" },
        { title: "Lists", description: "" },
        { title: "Sorting", description: "" },
        { title: "Searching and Hashing", description: "" },
        { title: "Trees and Graphs", description: "Understand hierarchical data structures and their applications" }
    ],
    "Numerical Method": [
        { title: "Solution of Nonlinear Equations", description: "" },
        { title: "Interpolation and Regression", description: "" },
        { title: "Numerical Differentiation and Integration", description: "" },
        { title: "Solving System of Linear Equations", description: "" },
        { title: "Solution of Ordinary Differential Equations", description: "" },
        { title: "Solution of Partial Differential Equations", description: "" }
    ],
    "Computer Architecture": [
        { title: "Data Representation", description: "" },
        { title: "Register Transfer and Microoperations", description: "" },
        { title: "Basic Computer Organization and Design", description: "" },
        { title: "Microprogrammed Control", description: "" },
        { title: "Central Processing Unit", description: "" },
        { title: "Pipelining", description: "" },
        { title: "Computer Arithmetic", description: "" },
        { title: "Input Output Organization", description: "" },
        { title: "Memory Organization", description: "" }
    ],
    "Computer Graphics": [
        { title: "Introduction of Computer Graphics", description: "" },
        { title: "Scan Conversion Algorithm", description: "" },
        { title: "Two-Dimensional Geometric Transformations", description: "" },
        { title: "Three-Dimensional Geometric Transformation", description: "" },
        { title: "3D Objects Representation", description: "" },
        { title: "Solid Modeling", description: "" },
        { title: "Visible Surface Detections", description: "" },
        { title: "Illumination Models and Surface Rendering Techniq", description: "" },
        { title: "Introduction to Virtual Reality", description: "" },
        { title: "Introduction to OpenGL", description: "" }
    ],
    "Statistics II": [
        { title: "Sampling Distribution and Estimation", description: "" },
        { title: "Testing of hypothesis", description: "" },
        { title: "Non parametric test", description: "" },
        { title: "Multiple correlation and regression", description: "" },
        { title: "Design of experiment", description: "" },
        { title: "Stochastic Process", description: "" }
    ],
    "Theory of Computation": [
        { title: "Basic Foundations", description: "" },
        { title: "Introduction to Finite Automata", description: "" },
        { title: "Regular Expressions", description: "" },
        { title: "Context Free Grammar", description: "" },
        { title: "Push Down Automata", description: "" },
        { title: "Turing Machines", description: "" },
        { title: "Undecidability and Intractability", description: "" }
    ],
    "Computer Networks": [
        { title: "Introduction to Computer Network", description: "Understand the basic concepts of computer networking" },
        { title: "Physical Layer and Network Media", description: "" },
        { title: "Data Link Layer", description: "" },
        { title: "Network Layer", description: "" },
        { title: "Transport Layer", description: "Learn about end-to-end communication services" },
        { title: "Application Layer", description: "Explore network applications and their protocols" },
        { title: "Multimedia &Future Networking", description: "" }
    ],
    "Operating Systems": [
        { title: "Operating System Overview", description: "Explore the fundamental concepts of operating systems" },
        { title: "Process Management", description: "Understand how operating systems manage program execution" },
        { title: "Process Deadlocks", description: "" },
        { title: "Memory Management", description: "Learn how operating systems manage computer memory" },
        { title: "File Management", description: "" },
        { title: "Device Management", description: "" },
        { title: "Linux Case Study", description: "" }
    ],
    "Database Management System": [
        { title: "Database and Database Users", description: "Learn the fundamental principles of database systems" },
        { title: "Database System – Concepts and Architecture", description: "" },
        { title: "Data Modeling Using the Entity-Relational Model", description: "" },
        { title: "The Relational Data Model and Relational Database", description: "Master the most widely used database model" },
        { title: "The Relational Algebra and Relational Calculus", description: "" },
        { title: "SQL", description: "Learn to interact with databases using SQL" },
        { title: "Relational Database Design", description: "" },
        { title: "Introduction to Transaction Processing Concepts an", description: "" },
        { title: "Concurrency Control Techniques", description: "" },
        { title: "Database Recovery Techniques", description: "" }
    ],
    "Artificial Intelligence": [
        { title: "Introduction", description: "Fundamentals of AI and machine learning" },
        { title: "Intelligent Agents", description: "" },
        { title: "Problem Solving by Searching", description: "" },
        { title: "Knowledge Representation", description: "" },
        { title: "Machine Learning", description: "" },
        { title: "Applications of AI", description: "" }
    ],
    "Microprocessor Based Design": [
        { title: "Introduction to Microcontroller", description: "" },
        { title: "Sensors and Actuators", description: "" },
        { title: "Bus and Communication Technology", description: "" },
        { title: "Introduction to 8051 Microcontroller and Programming", description: "" },
        { title: "Electromagnetic Interference and Compatibility", description: "" }
    ],
    "Web Technology": [
        { title: "Introduction", description: "" },
        { title: "Hyper Text Markup Language", description: "" },
        { title: "Cascading Style Sheets", description: "" },
        { title: "Client Side Scripting with JavaScript", description: "" },
        { title: "AJAX and XML", description: "" },
        { title: "Server Side Scripting using PHP", description: "" }
    ],
    "System Analysis and Design": [
        { title: "Foundations for Systems Development", description: "" },
        { title: "Planning", description: "" },
        { title: "Analysis", description: "" },
        { title: "Design", description: "" },
        { title: "Implementation and Maintenance", description: "" },
        { title: "Introduction to Object-Oriented Development", description: "" }
    ],
    "Society and Ethics in Information Technology": [
        { title: "Introduction", description: "" },
        { title: "Social and cultural change", description: "" },
        { title: "Understanding development", description: "" },
        { title: "Process of transformation", description: "" },
        { title: "Ethics and Ethical Analysis", description: "" },
        { title: "Intellectual Property Rights and Computer Technology", description: "" },
        { title: "Social Context of Computing", description: "" },
        { title: "Software Issues", description: "" },
        { title: "New Frontiers for Computer Ethics", description: "" }
    ],
    "Design and Analysis of Algorithms": [
        { title: "Foundation of Algorithm Analysis", description: "" },
        { title: "Iterative Algorithms", description: "" },
        { title: "Divide and Conquer Algorithms", description: "" },
        { title: "Greedy Algorithms", description: "" },
        { title: "Dynamic Programming", description: "" },
        { title: "Backtracking", description: "" },
        { title: "Number Theoretic Algorithms", description: "" },
        { title: "NP Completeness", description: "" }
    ],
    "Simulation and Modelling": [
        { title: "Introduction to Simulation", description: "" },
        { title: "Simulation of Continuous and Discrete System", description: "" },
        { title: "Queuing System", description: "" },
        { title: "Markov Chains", description: "" },
        { title: "Random Numbers", description: "" },
        { title: "Verification and Validation", description: "" },
        { title: "Analysis of Simulation Output", description: "" },
        { title: "Simulation of Computer Systems", description: "" }
    ],
    "Image Processing": [
        { title: "Introduction", description: "" },
        { title: "Image Enhancement and Filter in Spatial Domain", description: "" },
        { title: "Introduction to Morphological Image Processing", description: "" },
        { title: "Image Segmentation", description: "" },
        { title: "Representations, Description and Recognition", description: "" }
    ],
    "Cryptography": [
        { title: "Introduction and Classical Ciphers", description: "" },
        { title: "Symmetric Ciphers", description: "" },
        { title: "Asymmetric Ciphers", description: "" },
        { title: "Cryptographic Hash Functions and Digital Signature", description: "" },
        { title: "Authentication", description: "" },
        { title: "Malicious Logic", description: "" },
        { title: "Network Security and Public Key Infrastructure", description: "" }
    ],
    "Software Engineering": [
        { title: "Introduction", description: "" },
        { title: "Software Processes", description: "" },
        { title: "Agile Software Development", description: "" },
        { title: "Requirements Engineering", description: "" },
        { title: "System Modeling", description: "" },
        { title: "Architectural Design", description: "" },
        { title: "Design and Implementation", description: "" },
        { title: "Software Testing", description: "" },
        { title: "Software Evolution", description: "" },
        { title: "Software Management", description: "" }
    ],
    "Compiler Design and Construction": [
        { title: "Unit 1", description: "" },
        { title: "Unit 2", description: "" },
        { title: "Unit 3", description: "" },
        { title: "Unit 4", description: "" }
    ],
    "E-Governance": [
        { title: "Introduction to E-Government and E-Governance", description: "" },
        { title: "Models of E-Governance", description: "" },
        { title: "E-Government Infrastructure Development", description: "" },
        { title: "Security for e-Government", description: "" },
        { title: "Applications of Data Warehousing and Data Mining in Government", description: "" },
        { title: "Case Studies", description: "" }
    ],
    "NET Centric Computing": [
        { title: "Language Preliminaries", description: "" },
        { title: "Introduction to ASP.NET", description: "" },
        { title: "HTTP and ASP.NET Core", description: "" },
        { title: "Creating ASP.NET core MVC applications", description: "" },
        { title: "Working with Database", description: "" },
        { title: "State Management on ASP.NET Core Application", description: "" },
        { title: "Client-side Development in ASP.NET Core", description: "" },
        { title: "Securing in ASP.NET Core Application", description: "" },
        { title: "Hosting and Deploying ASP.NET Core Application", description: "" }
    ],
    "Technical Writing": [
        { title: "What Is Technical Writing", description: "" },
        { title: "Audience and Purpose", description: "" },
        { title: "Writing Process", description: "" },
        { title: "Brief Correspondence", description: "" },
        { title: "Document Design and Graphics", description: "" },
        { title: "Writing for the Web", description: "" },
        { title: "Information Reports", description: "" },
        { title: "Employment Communication", description: "" },
        { title: "Presentations", description: "" },
        { title: "Recommendation Reports", description: "" },
        { title: "Proposals", description: "" },
        { title: "Ethics in the Workplace", description: "" }
    ],
    "Neural Networks": [
        { title: "Introduction to Neural Network", description: "" },
        { title: "Rosenblatt’s Perceptron", description: "" },
        { title: "Model Building through Regression", description: "" },
        { title: "The Least-Mean-Square Algorithm", description: "" },
        { title: "Multilayer Perceptron", description: "" },
        { title: "Kernel Methods and Radial-Basis Function Networks", description: "" },
        { title: "Self-Organizing Maps", description: "" },
        { title: "Dynamic Driven Recurrent Networks", description: "" }
    ],
    "Computer Hardware Design": [
        { title: "Computer Abstractions and Technology", description: "" },
        { title: "Instructions: Language of the Computer", description: "" },
        { title: "Arithmetic for Computers", description: "" },
        { title: "The Processor", description: "" },
        { title: "Large and Fast: Exploiting Memory Hierarchy", description: "" },
        { title: "Storage and Other I/O Topics", description: "" },
        { title: "Multicores, Multiprocessors, and Clusters", description: "" }
    ],
    "Advanced Java Programming": [
        { title: "Programming in Java", description: "" },
        { title: "User Interface Components with Swing", description: "" },
        { title: "Event Handling", description: "" },
        { title: "Database Connectivity", description: "" },
        { title: "Network Programming", description: "" },
        { title: "GUI with JavaFX", description: "" },
        { title: "Servlets and Java Server pages", description: "" },
        { title: "RMI and CORBA", description: "" }
    ],
    "Data Warehousing and Data Mining": [
        { title: "Introduction to Data Warehousing", description: "" },
        { title: "Introduction to Data Mining", description: "" },
        { title: "Data Preprocessing", description: "" },
        { title: "Data Cube Technology", description: "" },
        { title: "Mining Frequent Patterns", description: "" },
        { title: "Classification and Prediction", description: "" },
        { title: "Cluster Analysis", description: "" },
        { title: "Graph Mining and Social Network Analysis", description: "" },
        { title: "Mining Spatial, Multimedia, Text and Web Data", description: "" }
    ],
    "Principles of Management": [
        { title: "The Nature of Organizations", description: "" },
        { title: "Introduction to Management", description: "" },
        { title: "Evolution of Management Thought", description: "" },
        { title: "Environmental Context of Management", description: "" },
        { title: "Planning and Decision Making", description: "" },
        { title: "Organizing Function", description: "" },
        { title: "Leadership & Conflict", description: "" },
        { title: "Motivation", description: "" },
        { title: "Communication", description: "" },
        { title: "Control and Quality Management", description: "" },
        { title: "Global Context of Management", description: "" },
        { title: "Management Trends and Scenario in Nepal", description: "" }
    ],
    "Information Retrieval": [
        { title: "Introduction to IR and Web Search", description: "" },
        { title: "Text properties, operations and preprocessing", description: "" },
        { title: "Basic IR Models", description: "" },
        { title: "Evaluation of IR", description: "" },
        { title: "Query Operations and Languages", description: "" },
        { title: "Web Search", description: "" },
        { title: "Text Categorization", description: "" },
        { title: "Text Clustering", description: "" },
        { title: "Recommender System", description: "" },
        { title: "Question Answering", description: "" },
        { title: "Advanced IR Models", description: "" }
    ],
    "Database Administration": [
        { title: "Introduction", description: "" },
        { title: "Tablespace and Storage management", description: "" },
        { title: "Managing Database Objects", description: "" },
        { title: "Database Backup, Restore, and Recovery", description: "" },
        { title: "Database Security and Auditing", description: "" },
        { title: "Multitenant Database Architecture", description: "" },
        { title: "Database Tuning", description: "" }
    ],
    "Software Project Management": [
        { title: "Introduction to Software Project Management", description: "" },
        { title: "Project Analysis", description: "" },
        { title: "Activity Planning and Scheduling", description: "" },
        { title: "Risk Management", description: "" },
        { title: "Resource allocation", description: "" },
        { title: "Monitoring and control", description: "" },
        { title: "Managing Contracts and people", description: "" },
        { title: "Software quality assurance and testing", description: "" },
        { title: "Software Configuration Management", description: "" }
    ],
    "Network Security": [
        { title: "Computer Network Security Fundamentals", description: "" },
        { title: "User Authentication", description: "" },
        { title: "Transport Level Security", description: "" },
        { title: "Wireless Network Security", description: "" },
        { title: "Electronic Mail Security", description: "" },
        { title: "IP Security", description: "" },
        { title: "Network Endpoint Security", description: "" },
        { title: "Cloud and Internet of Things (IOT) Security", description: "" }
    ],
    "Advanced Database": [
        { title: "Enhanced Entity Relationship Model and Relational Model", description: "" },
        { title: "Object and Object Relational Databases", description: "" },
        { title: "Query Processing and Optimization", description: "" },
        { title: "Distributed Databases, NOSQL Systems, and BigData", description: "" },
        { title: "Advanced Database Models, Systems, and Applications", description: "" }
    ],
    "Internship": [
        { title: "Nature of Internship", description: "" },
        { title: "Phases of Internship", description: "" },
        { title: "Provision of Supervision", description: "" },
        { title: "Provision of Mentorship", description: "" },
        { title: "Evaluation Scheme", description: "" },
        { title: "Report Contents", description: "" },
        { title: "Citation and Referencing", description: "" },
        { title: "Report Format Standards", description: "" },
        { title: "Final Report Binding and Submission", description: "" }
    ],
    "Advanced Networking with IPv6": [
        { title: "Networking Protocols", description: "" },
        { title: "Introduction to Networking", description: "" },
        { title: "Next Generation Internet", description: "" },
        { title: "ICMPv6 and Neighbor Discovery", description: "" },
        { title: "Security and Quality of Service in IPv6", description: "" },
        { title: "IPv6 Routing", description: "" },
        { title: "IPv4/IPv6 Transition Mechanisms", description: "" },
        { title: "IPv6 Network and Server Deployment", description: "" }
    ],
    "Introduction to Cloud Computing": [
        { title: "Introduction", description: "" },
        { title: "Cloud Service Models", description: "" },
        { title: "Building Cloud Networks", description: "" },
        { title: "Security in Cloud Computing", description: "" }
    ],
    // Additional subjects would continue here with their unit structures
    // Note: Some subjects have empty unit arrays as per original data
    "Knowledge Management": [],
    "Project Work": [],
    "Game Technology": [],
    "Mobile Application Development": [],
    "Embedded Systems Programming": [],
    "International Business Management": []
};
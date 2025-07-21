const lesson2Data = {
    'c-standards': {
        title: 'C Standards (ANSI C and C99)',
        content: `<h1>C Standards (ANSI C and C99)</h1><p>ANSI C (C89/C90) is the standardized version of the C language introduced by the American National Standards Institute in 1989. C99 is a later standard that introduced new features such as inline functions, variable-length arrays, and new data types like long long int.</p>`
    },
    'c-character-set': {
        title: 'C Character Set',
        content: `<h1>C Character Set</h1><p>The C character set includes letters (A–Z, a–z), digits (0–9), special characters (e.g., +, -, *, /), and whitespace characters (space, tab, newline). These characters form the basic building blocks of C programs.</p>`
    },
    'c-tokens': {
        title: 'C Tokens',
        content: `<h1>C Tokens</h1><p>Tokens are the smallest units in a C program and include keywords, identifiers, constants, strings, operators, and special symbols. The compiler uses these tokens to understand and compile the program.</p>`
    },
    'escape-sequences': {
        title: 'Escape Sequences',
        content: `<h1>Escape Sequences</h1><p>Escape sequences are special character combinations starting with a backslash (\\). Examples include \\n (newline), \\t (tab), \\\\ (backslash), and \\\" (double quote). They allow control over output formatting.</p>`
    },
    'delimiters': {
        title: 'Delimiters',
        content: `<h1>Delimiters</h1><p>Delimiters in C are characters that separate elements of the program. Common delimiters include semicolon (;) to terminate statements, braces ({}) for blocks, parentheses (()) for expressions and function calls, and commas (,) for separating variables.</p>`
    },
    'variables': {
        title: 'Variables',
        content: `<h1>Variables</h1><p>Variables are named storage locations used to hold data. They must be declared before use and can store values that may change during program execution. Example: <code>int age = 25;</code></p>`
    },
    'data-types': {
        title: 'Data Types',
        content: `<h1>Data Types</h1><p>Data types define the type of data a variable can hold. Common data types include int, float, char, and double. C also supports derived types (arrays, structures) and user-defined types.</p>`
    },
    'structure-of-c-program': {
        title: 'Structure of a C Program',
        content: `<h1>Structure of a C Program</h1><p>A basic C program includes preprocessor directives, the main() function, declarations, statements, and optional user-defined functions. Example structure:<br><pre>#include&lt;stdio.h&gt;\nint main() {\n    printf("Hello, World!");\n    return 0;\n}</pre></p>`
    },
    'executing-c-program': {
        title: 'Executing a C Program',
        content: `<h1>Executing a C Program</h1><p>To execute a C program: 1) Write the code, 2) Save it with a .c extension, 3) Compile it using a compiler (e.g., GCC), 4) Run the generated executable. Compilation checks syntax and translates the code to machine language.</p>`
    },
    'constants': {
        title: 'Constants / Literals',
        content: `<h1>Constants / Literals</h1><p>Constants are fixed values that do not change during program execution. They can be integer (10), float (3.14), character ('A'), or string ("Hello"). Use <code>#define</code> or <code>const</code> keyword for symbolic constants.</p>`
    },
    'expressions': {
        title: 'Expressions',
        content: `<h1>Expressions</h1><p>Expressions combine variables, constants, and operators to produce a value. Example: <code>a + b * 5</code>. C supports arithmetic, relational, logical, and bitwise expressions.</p>`
    },
    'statements': {
        title: 'Statements',
        content: `<h1>Statements</h1><p>Statements are instructions executed by the program. C statements include expression statements, compound statements, decision-making statements (if, switch), looping statements (for, while), and jump statements (break, continue, return).</p>`
    },
    'comments': {
        title: 'Comments',
        content: `<h1>Comments</h1><p>Comments are non-executable parts of code used to explain or annotate. C supports single-line comments using <code>//</code> and multi-line comments using <code>/* ... */</code>. Comments help improve code readability.</p>`
    }
};

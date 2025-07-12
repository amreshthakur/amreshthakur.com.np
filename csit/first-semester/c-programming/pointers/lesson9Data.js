const lesson9Data = {
    'pointers-intro': {
        title: 'Introduction to Pointers',
        content: `<h1>Introduction to Pointers</h1><p>Pointers are variables that store memory addresses of other variables. They are powerful tools in C programming that allow direct memory access, dynamic memory allocation, and efficient array and structure manipulation.</p>`
    },
    'pointers-address-dereference': {
        title: 'Address (&) and Dereference (*) Operators',
        content: `<h1>Address and Dereference Operators</h1><p>The address-of operator (&) is used to get the memory address of a variable. The dereference operator (*) is used to access the value stored at a memory address. Together, they form the basis of pointer operations in C.</p>`
    },
    'pointers-declaration-init': {
        title: 'Pointer Declaration and Initialization',
        content: `<h1>Pointer Declaration and Initialization</h1><p>Pointers are declared using the * symbol (e.g., int *p). They should be initialized with the address of a variable (e.g., p = &x) before use to avoid undefined behavior.</p>`
    },
    'pointers-chain': {
        title: 'Chain of Pointers',
        content: `<h1>Chain of Pointers</h1><p>A chain of pointers refers to a situation where one pointer stores the address of another pointer. This concept is used in complex data structures like linked lists, trees, and more.</p>`
    },
    'pointers-arithmetic': {
        title: 'Pointer Arithmetic',
        content: `<h1>Pointer Arithmetic</h1><p>Pointer arithmetic allows manipulation of addresses. You can add or subtract integers to move through arrays. Operations include increment (++), decrement (--), addition (+), and subtraction (-) on pointers.</p>`
    },
    'pointers-and-arrays': {
        title: 'Pointers and Arrays',
        content: `<h1>Pointers and Arrays</h1><p>Pointers and arrays are closely related. An array name acts like a constant pointer. You can use pointers to traverse and manipulate array elements using pointer arithmetic.</p>`
    },
    'pointers-char-strings': {
        title: 'Pointers and Character Strings',
        content: `<h1>Pointers and Character Strings</h1><p>Character arrays and pointers are used to handle strings in C. Pointer notation makes string operations efficient, and functions like gets(), puts(), strlen() often use pointers internally.</p>`
    },
    'array-of-pointers': {
        title: 'Array of Pointers',
        content: `<h1>Array of Pointers</h1><p>An array of pointers stores multiple addresses. Common use cases include storing an array of strings, dynamic 2D arrays, or pointers to functions. Syntax: char *arr[5];</p>`
    },
    'pointers-as-function-args': {
        title: 'Pointers as Function Arguments',
        content: `<h1>Pointers as Function Arguments</h1><p>Passing pointers to functions allows modifying the original variables (call by reference). This is useful for returning multiple values, modifying arrays, or efficient data processing.</p>`
    },
    'functions-returning-pointers': {
        title: 'Functions Returning Pointers',
        content: `<h1>Functions Returning Pointers</h1><p>Functions can return pointers to allow dynamic memory usage or manipulation of arrays and strings. Be cautious not to return pointers to local variables, as they are destroyed after function execution.</p>`
    },
    'pointers-and-structures': {
        title: 'Pointers and Structures',
        content: `<h1>Pointers and Structures</h1><p>Pointers can be used to access and manipulate structures efficiently using the arrow operator (->). This technique is used widely in linked lists and dynamic data structures.</p>`
    },
    'dynamic-memory-allocation': {
        title: 'Dynamic Memory Allocation',
        content: `<h1>Dynamic Memory Allocation</h1><p>Dynamic memory allocation allows allocating memory at runtime using functions like malloc(), calloc(), realloc(), and freeing memory using free(). This is essential for building flexible and memory-efficient programs.</p>`
    }
};

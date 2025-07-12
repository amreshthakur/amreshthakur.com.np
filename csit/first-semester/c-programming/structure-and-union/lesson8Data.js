const lesson8Data = {
    'introduction-to-structures-unions': {
        title: 'Introduction to Structures and Unions',
        content: `<h1>Introduction to Structures and Unions</h1>
                  <p>Structures and unions are user-defined data types in C that allow grouping of different data types under a single name. Structures allocate separate memory for each member, while unions share the same memory space for all members, allowing efficient memory usage in specific scenarios.</p>`
    },
    'array-of-structures': {
        title: 'Array of Structures',
        content: `<h1>Array of Structures</h1>
                  <p>An array of structures is used to store multiple records of the same structure type. For example, you can use it to store information about multiple students, employees, etc. Each element of the array holds a complete structure.</p>`
    },
    'passing-structures-to-functions': {
        title: 'Passing Structures to Functions',
        content: `<h1>Passing Structures to Functions</h1>
                  <p>Structures can be passed to functions by value or by reference (using pointers). Passing by reference is more efficient and allows the function to modify the original data.</p>`
    },
    'nested-structures': {
        title: 'Nested Structures (Structure within Structure)',
        content: `<h1>Nested Structures</h1>
                  <p>Nested structures are structures that contain other structures as members. This is useful for organizing complex data, such as a student structure containing an address structure.</p>`
    },
    'introduction-to-unions': {
        title: 'Introduction to Unions',
        content: `<h1>Introduction to Unions</h1>
                  <p>Unions are similar to structures, but all members share the same memory location. Only one member can hold a value at any time. Unions are useful for memory-efficient programming when only one value is needed at a time.</p>`
    },
    'pointers-to-structures': {
        title: 'Pointers to Structures',
        content: `<h1>Pointers to Structures</h1>
                  <p>Pointers to structures allow dynamic access and manipulation of structure members using the arrow operator (->). This is commonly used in dynamic data structures like linked lists.</p>`
    }
};

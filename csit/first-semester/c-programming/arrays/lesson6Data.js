const lesson6Data = {
    'arrays-introduction': {
        title: 'Introduction to Arrays',
        content: `
        
        
        <h1>Introduction to Arrays in C Programming</h1>
        <p>Arrays are collections of elements stored in contiguous memory locations. Each element can be accessed using its index. They allow efficient storage and access to data of the same type.</p>
        
        <h2>What is an Array in C? (In Simple Words)</h2>

        <p>In C programming, an <strong>array</strong> is a way to store <em>multiple values of the same type</em> (such as all integers or all characters) using <em>a single name</em>. Picture it like a row of boxes: each box holds one value and every box is identical in size and type.</p>

        <p>Instead of defining many individual variables&mdash;for example, <code>mark1</code>, <code>mark2</code>, <code>mark3</code>&mdash;you can declare one array:</p>
        <pre><code>int marks[3];</code></pre>

        <h3>Key Points</h3>
        <ul>
            <li>An array can hold <strong>many values</strong>, but every value must share the <strong>same data type</strong> (all <code>int</code>, all <code>float</code>, and so on).</li>
            <li>The <strong>size of the array</strong>&mdash;how many elements it can store&mdash;must be known <strong>beforehand</strong>. Once you declare it, that size cannot change.</li>
            <li>The array’s values are stored <strong>contiguously</strong> (next to each other) in memory, so accessing an element with its index number (starting from 0) is <strong>very fast</strong>.</li>
            <li>You can create arrays of <em>simple types</em> (<code>int</code>, <code>char</code>, <code>float</code>) as well as <em>complex types</em> (<code>struct</code>, pointers, etc.).</li>
        </ul>

        <p>In short, an array lets you <strong>organize and handle a group of related data items</strong> efficiently in your C programs.</p>
        
        
        <h2>Introduction to Arrays in C</h2>

        <p>
          In C programming, an <strong>array</strong> is a basic and powerful tool that allows you to store a group of values using a single variable name. All the values stored in an array must be of the <em>same data type</em>, such as <code>int</code>, <code>float</code>, or <code>char</code>.
        </p>

        <p>
          Think of an array as a row of lockers, where each locker (or element) has a number (called an index) and can store one item. Instead of creating separate variables for each item, an array lets you group them together, which makes your code simpler and more organized.
        </p>

        <p>
          For example, if you want to store the marks of 5 students, you can use an array like this:
        </p>

        <pre><code>int marks[5];</code></pre>

        <p>
          This means you're creating an array named <code>marks</code> that can store 5 integer values. You can access each value using its index, starting from 0 (i.e., <code>marks[0]</code>, <code>marks[1]</code>, ..., <code>marks[4]</code>).
        </p>

        <p>
          Arrays are especially useful when working with loops, as they allow you to process large amounts of data in a structured and efficient way.
        </p>














  
        `



    },
    'arrays-types': {
        title: 'Types of Arrays',
        content: `<h1>Types of Arrays</h1>
        <p>Arrays can be single-dimensional or multi-dimensional. Single-dimensional arrays store elements in a linear format, while multi-dimensional arrays (e.g., 2D arrays) store elements in tabular or matrix form.</p>`
    },
    'arrays-declaration-memory': {
        title: 'Array Declaration and Memory Representation',
        content: `<h1>Array Declaration and Memory Representation</h1>
        <p>Arrays are declared by specifying the type and size. Memory is allocated in contiguous blocks. Each element’s location is determined by its index relative to the base address.</p>`
    },
    'arrays-initialization': {
        title: 'Array Initialization',
        content: `<h1>Array Initialization</h1>
        <p>Arrays can be initialized at the time of declaration or later. Initialization can be partial or complete. Uninitialized elements take garbage values unless set explicitly.</p>`
    },
    'arrays-character-strings': {
        title: 'Character Arrays and Strings',
        content: `<h1>Character Arrays and Strings</h1>
        <p>Character arrays store sequences of characters. Strings are character arrays terminated by a null character (‘\\0’). They can be manipulated using various functions.</p>`
    },
    'arrays-reading-writing': {
        title: 'Reading and Writing Strings',
        content: `<h1>Reading and Writing Strings</h1>
        <p>Strings can be read using functions like <code>scanf()</code>, <code>gets()</code>, or <code>fgets()</code>, and printed using <code>printf()</code> or <code>puts()</code>. Care must be taken to avoid buffer overflow and include the null terminator.</p>`
    },
    'arrays-null-character': {
        title: 'Null Character (\\0)',
        content: `<h1>Null Character (‘\\0’)</h1>
        <p>The null character marks the end of a string in C. It occupies one byte and is essential for string manipulation functions to work correctly.</p>`
    },
    'arrays-string-functions': {
        title: 'String Library Functions',
        content: `<h1>String Library Functions</h1>
        <p>Standard C library provides functions like <code>strlen()</code>, <code>strcpy()</code>, <code>strcat()</code>, <code>strcmp()</code>, etc., to handle string operations. These functions require inclusion of <code>&lt;string.h&gt;</code>.</p>`
    }
};

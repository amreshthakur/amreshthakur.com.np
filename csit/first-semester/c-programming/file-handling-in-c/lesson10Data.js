const lesson10Data = {
    'file-concept': {
        title: 'Concept of Files',
        content: `<h1>Concept of Files</h1><p>In C programming, a file is a container in a storage device to store data. Files are used to permanently store data in a non-volatile memory (like hard disks) instead of using volatile memory (like RAM). This allows data to be preserved even after the program ends.</p>`
    },
    'file-opening-closing': {
        title: 'File Opening and Closing',
        content: `<h1>File Opening and Closing</h1><p>Files in C are opened using the <code>fopen()</code> function and closed using the <code>fclose()</code> function. You must specify the mode of opening: read (<code>"r"</code>), write (<code>"w"</code>), append (<code>"a"</code>), etc. Closing a file ensures all buffers are flushed and resources are released.</p>`
    },
    'file-io-operations': {
        title: 'Input/Output Operations on Files',
        content: `<h1>Input/Output Operations on Files</h1><p>Common file I/O functions in C include <code>fprintf()</code>, <code>fscanf()</code>, <code>fgets()</code>, <code>fputs()</code>, <code>fread()</code>, and <code>fwrite()</code>. These functions allow formatted or raw reading and writing of data to and from files.</p>`
    },
    'random-file-access': {
        title: 'Random File Access',
        content: `<h1>Random File Access</h1><p>Random access in files allows jumping to a specific location using <code>fseek()</code>, <code>ftell()</code>, and <code>rewind()</code>. This is useful when dealing with large files or reading/writing at specific positions.</p>`
    },
    'file-error-handling': {
        title: 'Error Handling in File Operations',
        content: `<h1>Error Handling in File Operations</h1><p>Errors during file operations can be detected using return values of functions like <code>fopen()</code> or checking for <code>NULL</code> pointers. Additionally, functions like <code>feof()</code>, <code>ferror()</code>, and <code>perror()</code> help detect and report file-related errors effectively.</p>`
    }
};

const lesson3Data = {
    'k-map': {
        title: 'K-map',
        content: `<h1>Karnaugh Map (K-map)</h1><p>Karnaugh Map is a graphical tool used to simplify Boolean expressions. It minimizes the number of logic gates required by grouping adjacent cells representing '1' in the truth table, leading to a simplified Sum of Products (SOP) or Product of Sums (POS) expression.</p>`
    },
    'two-three-variable-maps': {
        title: 'Two and Three Variable Maps',
        content: `<h1>Two and Three Variable K-maps</h1><p>Two-variable K-maps have 4 cells, while three-variable K-maps have 8. These maps simplify Boolean expressions by grouping adjacent 1s into pairs, quads, or octets based on variable combinations, making circuit design simpler and more efficient.</p>`
    },
    'four-variable-maps': {
        title: 'Four Variable Maps',
        content: `<h1>Four Variable K-maps</h1><p>Four-variable K-maps consist of 16 cells. They allow more complex Boolean functions to be simplified by forming groups of 1s in powers of two (1, 2, 4, 8). It is an essential technique for minimizing logic circuits with multiple inputs.</p>`
    },
    'product-of-sum': {
        title: 'Product of Sum Simplification',
        content: `<h1>Product of Sum (POS) Simplification</h1><p>POS simplification involves grouping the 0s in a K-map to form maxterms. These are then combined to create a simplified POS expression. It is used when the output is 0 for most of the input combinations.</p>`
    },
    'nand-nor-implementation': {
        title: 'NAND and NOR Implementation',
        content: `<h1>NAND and NOR Implementation</h1><p>Logic circuits can be implemented using only NAND or only NOR gates, as they are universal gates. Simplified Boolean expressions are converted into NAND/NOR equivalents, making design and manufacturing cost-effective and reliable.</p>`
    },
    'dont-care-conditions': {
        title: "Don't Care Conditions",
        content: `<h1>Don't Care Conditions</h1><p>Don't care conditions are input combinations that never occur or whose output does not affect the circuit. In K-maps, these are marked as 'X' and can be used to form larger groups during simplification, aiding in further reduction of logic expressions.</p>`
    },
    'prime-implicants': {
        title: 'Determinant and Selection of Prime Implicants',
        content: `<h1>Determinant and Selection of Prime Implicants</h1><p>Prime implicants are the essential groupings in K-maps that cover all 1s of a function. Essential prime implicants must be included in the simplified function. Determining and selecting them helps achieve the most efficient logic representation.</p>`
    }
};

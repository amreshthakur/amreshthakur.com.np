
// Lesson 1: Introduction to Computer
const lesson1Data = {
  // Unit 1: Introduction to Computer (3 Hours)



  
  
  'intro-overview': {
    title: 'Introduction',
    content: `



    
                <h1>Chapter 1: Introduction to Computers</h1>
    
    <h2>Introduction</h2>
    <p>
        The word "computer" originates from the Latin term "computare," meaning 'to calculate.' 
        While basic calculations are a familiar part of daily life, complex mathematical operations 
        can be time-consuming and prone to error. To achieve faster and perfectly accurate calculations, 
        humans developed a machine called the 'computer.'
    </p>
    
    <h2>What is a Computer?</h2>
    <p>
        A computer is an electronic device that operates under the control of instructions (programs) 
        stored in its own memory. It functions by:
    </p>
    <ul>
        <li>Accepting data (<b>input</b>) from users via input devices.</li>
        <li>Processing that data according to predefined rules.</li>
        <li>Producing results (<b>output</b>).</li>
        <li>Storing both data and results for future use.</li>
    </ul>
    
    <p>
        In essence, a computer is a programmable machine capable of:
    </p>
    <ul>
        <li><b>Taking Input:</b> Receiving raw data through input devices (e.g., keyboard, mouse).</li>
        <li><b>Storing Data:</b> Holding input data, programs, and results in memory (e.g., RAM) and on storage media (e.g., hard disk, CD).</li>
        <li><b>Processing Data:</b> Executing instructions and manipulating data via the Central Processing Unit (CPU).</li>
        <li><b>Producing Output:</b> Presenting the processed results via output devices (e.g., screen, printer).</li>
    </ul>
        `
  },
  'intro-digital-analog': {
    title: 'Digital and Analog Computers',
    content: `


    <h1>Digital and Analog Computers</h1>

    <h2>Digital Computer</h2>
    <p>
      A digital computer is one that works with binary digits (0s and 1s). It is based on digital signals, i.e., discrete signals.
    </p>
    <p>
      Digital computers do not measure physical values. They operate on data—including magnitudes, letters, and symbols—expressed in binary form (0 and 1).
    </p>
    <p>
      A digital machine is usually a general-purpose device, dedicated to multiple tasks. These computers are mostly used in the preparation of reports and results.
    </p>
    <p>
      Early digital computers were large machines, consuming large amounts of electric power and hence were expensive. Mechanical computers had an advantage over digital computers at the time.
    </p>
    <p>
      Most computers today are digital computers. Examples include IBM PC, Apple/Macintosh, etc.
    </p>

    <h2>Analog Computer</h2>
    <p>
      An analog computer operates on continuous data, usually of a physical nature such as length, voltage, or current.
    </p>
    <p>
      It is usually a special-purpose computer dedicated to a single task. Analog computers are based on continuous (analog) signals rather than discrete values.
    </p>
    <p>
      These computers do not use exact values but rather approximate values. As a result, their processes cannot be reproduced with exact equivalence like digital (Turing) machines.
    </p>
    <p>
      Analog computers were widely used in scientific and industrial applications when digital computers lacked sufficient performance.
    </p>
    <p>
      They are used in hospitals to measure kidney stone size and in mental health diagnostics (e.g., CT scans). Analog computers are also powerful in solving differential equations.
    </p>
    <p>
      They represent physical quantities in wave or continuous form. Examples include Plesley, slide rule, speedometer, thermometer, barometer, lactometer, seismograph, etc.
    </p>

    <h2>Difference Between Analog and Digital Computers</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Analog Computer</th>
          <th>Digital Computer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>These computers work with physical values such as temperature, pressure, etc.</td>
          <td>These computers work with binary digits (0s and 1s).</td>
        </tr>
        <tr>
          <td>These computers are based on continuous data.</td>
          <td>These computers are based on discrete data.</td>
        </tr>
        <tr>
          <td>It has very low accuracy.</td>
          <td>It has high accuracy.</td>
        </tr>
        <tr>
          <td>Based on similarity measurement principle.</td>
          <td>Based on counting principle.</td>
        </tr>
        <tr>
          <td>These are faster than digital computers.</td>
          <td>Slower than analog computers.</td>
        </tr>
        <tr>
          <td>It has no or limited storage capacity.</td>
          <td>It has high storage capacity.</td>
        </tr>
        <tr>
          <td>It does single-purpose jobs.</td>
          <td>It does multi-purpose jobs.</td>
        </tr>
        <tr>
          <td>No possibility of reprogramming.</td>
          <td>It can be reprogrammed.</td>
        </tr>
        <tr>
          <td>The cost is low and it is portable.</td>
          <td>The cost is high and it is not easily portable.</td>
        </tr>
        <tr>
          <td>Analog signal processing can be done in real time and consumes less bandwidth.</td>
          <td>Digital signal processing may not be in real time and consumes more bandwidth for the same information.</td>
        </tr>
      </tbody>
    </table>



    
        `
  },
  'intro-characteristics': {
    title: 'Characteristics of Computer',
    content: `
 <h1>Characteristics of a Computer</h1>
  <p>
    As we know, a computer is a powerful electronic device. It is used to process large amounts of data and information.
    A computer never gets tired and can perform repetitive tasks efficiently.
  </p>
  <h2>
    The main characteristics of a computer are given below:
  </h2>
  <ul>
    <li><strong>Speed:</strong> A computer can perform millions of instructions per second.</li>
    <li><strong>Accuracy:</strong> It performs operations with high precision and minimal errors.</li>
    <li><strong>Diligence:</strong> It does not get tired or bored. It can work continuously without loss of performance.</li>
    <li><strong>Automation:</strong> Once programmed, it can perform tasks automatically without human intervention.</li>
    <li><strong>Storage:</strong> It can store vast amounts of data for future use and quick retrieval.</li>
    <li><strong>Versatility:</strong> It can be used for a wide range of tasks, from calculations to multimedia processing.</li>
    <li><strong>Multitasking:</strong> It can handle multiple tasks simultaneously.</li>
    <li><strong>Communication:</strong> Computers can connect and communicate over networks globally.</li>
  </ul>

   <h3>1. Speed</h3>
  <p>
    The time taken to perform any task by a computer is called its speed. Computers can work very fast, completing in seconds what humans might take hours to do. The speed of a computer is measured in microseconds (10<sup>-6</sup>), nanoseconds (10<sup>-9</sup>), or even picoseconds (10<sup>-12</sup>).
  </p>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Unit of Time</th>
        <th>Part of a Second</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Milliseconds (ms)</td>
        <td>1/1,000</td>
      </tr>
      <tr>
        <td>Microseconds (µs)</td>
        <td>1/1,000,000</td>
      </tr>
      <tr>
        <td>Nanoseconds (ns)</td>
        <td>1/1,000,000,000</td>
      </tr>
      <tr>
        <td>Picoseconds (ps)</td>
        <td>1/1,000,000,000,000</td>
      </tr>
    </tbody>
  </table>

  <h3>2. Accuracy</h3>
  <p>
    Computers are extremely accurate machines. Every calculation is performed with a high degree of precision. However, if incorrect input is given, the output will also be incorrect — a concept known as GIGO (Garbage In, Garbage Out). Computers can also perform calculations to many decimal places, depending on the requirement.
  </p>

  <h3>3. Diligence</h3>
  <p>
    The capacity of the performing repetitive task free from tiredness, lack of concentration and fatigue
is called diligence capacity of computer. It can work for hours without creating any error. If millions
of calculations are to be performed, a computer will perform every calculation with the same
accuracy. Due to this capability it overpowers human being in routine type of work.
  </p>

  <h3>4. Versatility</h3>
  <p>
    A computer is versatile, meaning it can perform a wide variety of tasks. From mathematical calculations to graphic design, from word processing to playing games, a computer can handle many different jobs depending on the software or program it is running.
  </p>

  <h3>5. Storage</h3>
  <p>
    Computers have mass storage devices to store large volumes of data for future use. This stored data is easily retrievable. Common storage devices include magnetic disks, optical disks, and solid-state drives. Storage capacity is measured in bytes.
  </p>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Storage Term</th>
        <th>Approximate Number of Bytes</th>
        <th>Exact Number of Bytes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Kilobyte (KB)</td>
        <td>1 thousand</td>
        <td>2<sup>10</sup> or 1,024</td>
      </tr>
      <tr>
        <td>Megabyte (MB)</td>
        <td>1 million</td>
        <td>2<sup>20</sup> or 1,048,576</td>
      </tr>
      <tr>
        <td>Gigabyte (GB)</td>
        <td>1 billion</td>
        <td>2<sup>30</sup> or 1,073,741,824</td>
      </tr>
      <tr>
        <td>Terabyte (TB)</td>
        <td>1 trillion</td>
        <td>2<sup>40</sup> or 1,099,511,627,776</td>
      </tr>
      <tr>
        <td>Petabyte (PB)</td>
        <td>1 quadrillion</td>
        <td>2<sup>50</sup> or 1,125,899,906,842,624</td>
      </tr>
      <tr>
        <td>Exabyte (EB)</td>
        <td>1 quintillion</td>
        <td>2<sup>60</sup> or 1,152,921,504,606,846,976</td>
      </tr>
      <tr>
        <td>Zettabyte (ZB)</td>
        <td>1 sextillion</td>
        <td>2<sup>70</sup> or 1,180,591,620,717,411,303,424</td>
      </tr>
      <tr>
        <td>Yottabyte (YB)</td>
        <td>1 septillion</td>
        <td>2<sup>80</sup> or 1,208,925,819,614,629,174,706,176</td>
      </tr>
    </tbody>
  </table>

  <h3>6. Automatic</h3>
  <p>
    A computer is an automatic machine. Once instructions and data are fed into it, the computer automatically processes the information and delivers the output without further human intervention.
  </p>


            
        `
  },
  'intro-history': {
    title: 'History of Computer',
    content: `


  <h1>History of Computer</h1>
  <p>
    There is a long development history of the computer and computing devices.
    Generally, the history of a computer development can be categorized into the following three different Eras:
  </p>
  <ul>
    <li>Mechanical Calculating Era</li>
    <li>Electromechanical Era</li>
    <li>Electronic Computer Era</li>
  </ul>

  <h2>Mechanical Calculating Era</h2>
  <p>
    The mechanical calculating devices were based on the counting principles.
    They were based on the decimal number system. These devices were constructed
    with the mechanical part for computing that is the counting.
  </p>

  <h3>The Abacus</h3>
  <p>
    The abacus, a simple counting device invented in Babylonia in the fourth century BC,
    is considered by many to be the first computing device. Abacus is made of a wooden frame
    with strings and beads. It is divided into two parts: heaven and earth. Each bead in heaven
    is equivalent to 5 and each bead in earth is equivalent to 1. Calculation is done by sliding
    the beads in both sections.
  </p>
  <p>
    Early merchants used the abacus to keep trading transactions. But as the use of paper and pencil spread,
    particularly in Europe, the abacus lost its importance. It took nearly 12 centuries, however,
    for the next significant advance in computing devices to emerge.
  </p>
  <p><strong>Figure:</strong> Abacus Device</p>

  <h3>Napier's Bones</h3>
  <p>
    Napier's bones was invented by John Napier (1550–1617), a Scottish mathematician and scientist in 1614.
    In this device, the bone rods are vertically arranged in a rectangular shape.
  </p>
  <p>
    The Napier's bones, also called Napier's rods, are numbered rods which can be used to perform multiplication
    of any number by a number 2–9. By placing "bones" corresponding to the multiplier on the left side and the bones
    corresponding to the digits of the multiplicand next to it to the right, the product can be read off simply
    by adding pairs of numbers (with appropriate carries as needed) in the row determined by the multiplier.
  </p>
  <p>
    There are ten bones corresponding to the digits 0–9, and a special eleventh bone that is used to represent the multiplier.
    The multiplier bone is simply a list of the digits 1–9 arranged vertically downward. The remainder of the bones
    each has a digit written in the top square, with the multiplication table for that digit written downward,
    with the digits split by a diagonal line going from the lower left to the upper right.
  </p>
  <p>
    In practice, multiple sets of bones were needed for multiplication of numbers containing repeated digits.
  </p>

    <h3>Pascaline</h3>
  <p>
    In 1642, Blaise Pascal, the 18-year-old son of a French tax collector, invented what he called a
    numerical wheel calculator to help his father with his duties. This brass rectangular box,
    also called a Pascaline, used eight movable dials to add sums up to eight figures long.
  </p>
  <p>
    Pascal's device used a base of ten to accomplish this. For example, as one dial moved ten notches,
    or one complete revolution, it moved the next dial — which represented the ten's column — one place.
    When the ten's dial moved one revolution, the dial representing the hundred's place moved one notch, and so on.
    The drawback to the Pascaline, of course, was its limitation to addition.
  </p>
  <p><strong>Figure:</strong> Pascaline</p>

  <h3>Leibniz Machine</h3>
  <p>
    In 1694, a German mathematician and philosopher, Gottfried Wilhelm von Leibniz, improved the
    Pascaline by creating a machine that could also multiply. Like its predecessor, Leibniz's mechanical
    multiplier worked by a system of gears and dials.
  </p>
  <p>
    Partly by studying Pascal's original notes and drawings, Leibniz was able to refine his machine.
    The centerpiece of the machine was its stepped-drum gear design, which offered an elongated
    version of the simple flat gear.
  </p>
  <p>
    It wasn't until 1820, however, that mechanical calculators began to see widespread use.
  </p>

    <h3>Charles Babbage Machines</h3>
  <p>
    The real beginnings of computers as we know them today, however, lay with an English mathematics professor,
    Charles Babbage. He is known as the <strong>father of the computer</strong>. He invented mainly two devices:
    the <strong>Difference Engine</strong> and the <strong>Analytical Engine</strong>. These devices could perform
    methodical calculations more accurately and quickly.
  </p>

  <h4>Difference Engine</h4>
  <p>
    Babbage first proposed a machine to perform differential equations, called a <strong>Difference Engine</strong>.
    Powered by steam and large as a locomotive, the machine would have a stored program and could perform
    calculations and print the results automatically.
  </p>
  <p><strong>Figure:</strong> Difference Engine</p>

  <h4>Analytical Engine</h4>
  <p>
    In 1833, Charles Babbage, an English mathematician, developed the <strong>Analytical Engine</strong>,
    which was a kind of general-purpose computer designed to solve any arithmetical problems. 
    It was significant in a way because it included concepts that are fundamental to today’s computers,
    such as the use of punched cards, a control unit, memory, and a central processing unit (CPU).
  </p>

  <p>
    The Analytical Engine had most of the elements present in today's digital computer systems, 
    which is why Charles Babbage is called the <strong>"Father of modern computer science."</strong>
    It incorporated the following components for computation (counting, storing):
  </p>
  <ul>
    <li><strong>The Input:</strong> The punch card was used as an input device.</li>
    <li><strong>The Mill:</strong> Equivalent to today's CPU, it was used for processing.</li>
    <li><strong>The Output:</strong> The result was given in punch cards.</li>
    <li><strong>The Storage:</strong> The punch card was also used as storage — an equivalent to memory in today's computers.</li>
  </ul>
  <p><strong>Figure:</strong> Analytical Engine</p>

  <p>
    <strong>Lady Ada Augusta</strong>, a disciple of Charles Babbage, developed several programs for 
    performing mathematical calculations on the Analytical Engine after his demise. She is considered 
    the <strong>first programmer in history</strong> and has to her credit a programming language 
    named after her called <strong>ADA</strong>.
  </p>
  <p><strong>Figure:</strong> Lady Ada Augusta</p>

  <h3>Hollerith Machine</h3>
  <p>
    In 1889, an American inventor, <strong>Herman Hollerith</strong>, applied the Jacquard loom concept 
    to computing. His first task was to find a faster way to compute the U.S. census. The previous census 
    in 1880 had taken nearly seven years to count, and with an expanding population, the bureau feared 
    it would take ten years to count the latest census.
  </p>

    <h2>Summary of the Mechanical Calculating Era</h2>

  <h3>Abacus</h3>
  <p>
    A simple counting device invented in Babylonia in the fourth century BC, 
    is considered by many to be the first computing device.
  </p>

  <h3>Napier's Bone</h3>
  <p>
    Invented by John Napier, a Scottish mathematician and scientist in 1614, 
    the bone rods are vertically arranged in a rectangular shape.
  </p>

  <h3>Slide Rule</h>
  <p>
    A mathematical calculating device used for performing numerical 
    computations such as multiplication, division, powers, and roots.
  </p>

  <h3>Blaise Pascal</h3>
<p>
  Created a machine called the <strong>Pascaline</strong> that could add and subtract numbers. Dials were used to enter the numbers. 
  It also correctly handled carries, such as when the numbers 19 and 13 are added. The machine would produce the correct answer of 32 
  since it correctly carried the 1 from adding 9 and 3.
</p>

<h3>Charles Babbage</h3>
<p>
  Designed a machine called the <strong>Difference Engine</strong> whose goal was to automatically calculate entries in navigation 
  and other tables in order to produce these tables more quickly and with fewer errors. It was never fully completed due to its complexity 
  and Babbage losing interest when he came up with a better idea.
</p>
<p>
  He then designed a machine called the <strong>Analytical Engine</strong>. The design had all the basic components of a modern-day computer. 
  In addition, it was designed to be programmable using punched cards. This way, it could perform many tasks, not just a single task 
  like calculating entries for tables. Though never fully completed, Babbage is still called the <strong>"Father of the Computer"</strong>. 
  He had the right ideas, but the technology of the time was not advanced enough to fully realize them.
</p>

<h3>Ada Lovelace</h3>
<p>
  Charles Babbage's assistant, Ada Lovelace, wrote programs for the Analytical Engine using punched cards. 
  She is considered the <strong>world's first programmer</strong>.
</p>

<h3>Herman Hollerith</h3>
<p>
  Created a <strong>punched card tabulating machine</strong> for use in the <strong>1890 U.S. Census</strong>.
</p>

<h3>The Electro-Mechanical Era</h3>
<p>
  In the Electromechanical Era, computational devices were composed of mechanical and electrical parts and used electricity 
  for operation. These devices were partially programmable. The most notable computer of this era is:
</p>

<h3>Mark I</h3>
<p>
  In 1944, <strong>Howard Aiken</strong> completed the Mark I, also called the <strong>IBM Automatic Sequence Controlled Calculator (ASCC)</strong>. 
  It was an electromechanical computer which was 51 ft long, 8 ft high, and 3 ft wide. It consisted of 18,000 vacuum tubes.
</p>
<p>
  The Mark I was the first programmable digital computer made in the U.S., but it was not purely electronic. 
  Instead, it was constructed out of switches, relays, rotating shafts, and clutches.
</p>
<ul>
  <li>It was the first machine to successfully perform a long series of arithmetic and logical operations automatically.</li>
  <li>It is considered a <strong>First Generation Computer</strong>.</li>
  <li>Built as a partnership between <strong>Harvard University and IBM</strong> in 1944.</li>
  <li>The machine weighed 5 tons, incorporated 500 miles of wire, was 8 feet tall and 51 feet long.</li>
  <li>It had a 50-foot rotating shaft running its length, turned by a 5-horsepower electric motor.</li>
</ul>







        `
  },
  'intro-generations': {
    title: 'Generations of Computer',
    content: `


            <h1>Generation of Computers</h1>
<p>
  The history of computers is often referred to in terms of different generations of computing devices. 
  In computer terminology, a "generation" is described as a stage of technological development or innovation. 
  Each generation of computers is characterized by a major technological advancement that has fundamentally changed 
  the way computers operate—resulting in devices that are smaller, cheaper, faster, more powerful, efficient, and reliable.
</p>
<p>
  Based on the type of processor and other core technologies, the development of computers can be divided into 
  <strong>five distinct generations</strong>. Each generation brought a significant transformation in hardware, software, 
  and computing capabilities.
</p>

<h2>First Generation Computers (1945–1954)</h2>
<p>
  The first generation of computers used <strong>vacuum tubes</strong> or <strong>thermionic valves</strong> for circuitry 
  and magnetic drums for memory. Input was given using punched cards and paper tape, and output was displayed via printouts.
</p>

<h3>Hardware Technology</h3>
<ul>
  <li>Based on vacuum tube technology.</li>
  <li>Thousands of vacuum tubes were used, which generated a lot of heat.</li>
  <li>Required large air-cooling systems due to overheating issues.</li>
  <li>Punched cards used for input; printouts used for output.</li>
  <li>Used acoustic delay lines as main memory and magnetic drums for secondary storage.</li>
</ul>

<h3>Software Technology</h3>
<ul>
  <li>Programming was done in <strong>machine language</strong> (binary: 0s and 1s).</li>
  <li>Programs were difficult to write, debug, and maintain.</li>
  <li>No high-level programming languages or operating systems were available.</li>
  <li>Only one problem could be solved at a time (no multitasking).</li>
</ul>

<h3>Computing Characteristics</h3>
<ul>
  <li>Processing speed was in <strong>kilohertz</strong> (KHz).</li>
  <li>Computation time was in <strong>milliseconds</strong>.</li>
  <li>Extremely large in size and consumed a lot of power.</li>
  <li>Very limited memory and processing capacity.</li>
</ul>

<h3>Examples of First Generation Computers</h3>
<ul>
  <li>ENIAC (Electronic Numerical Integrator and Computer)</li>
  <li>EDVAC (Electronic Discrete Variable Automatic Computer)</li>
  <li>UNIVAC I (Universal Automatic Computer)</li>
  <li>IBM-701</li>
</ul>

<h3>Physical Appearance</h3>
<ul>
  <li>First generation computers were enormous in size and required large rooms for installation.</li>
</ul>

<h3>Application</h3>
<ul>
  <li>Used mainly for scientific applications, as they were the fastest computing devices of their time.</li>
  <li>Lacked versatility and were not available for commercial use.</li>
</ul>

<h3>Examples</h3>
<ul>
  <li>UNIVAC (Universal Automatic Computer)</li>
  <li>ENIAC (Electronic Numerical Integrator and Calculator)</li>
  <li>EDVAC (Electronic Discrete Variable Automatic Computer)</li>
</ul>

<p><strong>Figure:</strong> First Generation Computer</p>
<p><strong>Figure:</strong> Vacuum Tube</p>

<h2>Second Generation Computers (1955–1964)</h2>
<p>
  The second generation of computers used <strong>transistors</strong> instead of vacuum tubes, 
  making them smaller, faster, cheaper, more energy-efficient, and more reliable. Transistors 
  are made from semiconductor materials like germanium and silicon and have three leads. 
  They perform electronic functions such as amplification and switching.
</p>
<p>
  These computers used <strong>magnetic core memory</strong> as primary memory and 
  <strong>magnetic disks</strong> for secondary storage. Although input and output were still 
  handled via punched cards and printouts, this generation marked a shift from machine 
  language to <strong>assembly language</strong>.
</p>

<h3>Hardware Technology</h3>
<ul>
  <li>Based on transistor technology instead of vacuum tubes.</li>
  <li>Smaller, faster, more energy-efficient, and more reliable than first generation computers.</li>
  <li>Used magnetic core memory for primary storage.</li>
  <li>Used magnetic tapes and magnetic disks for secondary storage.</li>
  <li>Input was still via punched cards; output was through printouts.</li>
  <li>Used the concept of stored program—instructions stored in memory.</li>
</ul>

<h3>Software Technology</h3>
<ul>
  <li>Programs were written in <strong>assembly language</strong>.</li>
  <li>Used mnemonics like <code>ADD</code> for addition and <code>SUB</code> for subtraction.</li>
</ul>

<h3>Batch Operating System</h3>
<ul>
  <li>Batch operating system was used in the second generation computers.</li>
</ul>

<h3>Computing Characteristics (Second Generation)</h3>
<ul>
  <li>Computational time improved from milliseconds to microseconds.</li>
</ul>

<h3>Physical Appearance (Second Generation)</h3>
<ul>
  <li>Transistors were much smaller than vacuum tubes, so computers were smaller in size.</li>
  <li>These computers had better portability and generated less heat than first-generation computers but still required air conditioning.</li>
</ul>

<h3>Application (Second Generation)</h3>
<ul>
  <li>Although the cost of commercial production was very high, it was less expensive compared to first generation.</li>
  <li>Examples include PDP-8, IBM 1401, and CDC 1604.</li>
</ul>

<h2>Third Generation Computers (1965–1979)</h2>
<p>In the third generation, integrated circuits (ICs) replaced transistors as the main component. An IC is a tiny silicon wafer containing numerous transistors, registers, capacitors, and other electronic circuits. This replacement made computers smaller, more reliable, and more efficient. Users interacted with these computers using keyboards and monitors instead of punched cards and printouts.</p>

<h3>Main Characteristics of Third Generation Computers</h3>

<h3>Hardware Technology</h3>
<ul>
  <li>Based on integrated circuit (IC) technology with multiple transistors on a single silicon chip.</li>
  <li>Keyboards and monitors were used for input and output instead of punched cards and printouts.</li>
  <li>Semiconductor memory was used for internal storage, and magnetic disks were used for auxiliary storage.</li>
</ul>

<h3>Software Technology</h3>
<ul>
  <li>Operating systems allowed interaction between the keyboard, monitor, and computer.</li>
  <li>Multiprogramming operating systems like UNIX and MULTICS were introduced.</li>
  <li>High-level programming languages were extensively used, replacing machine and assembly languages.</li>
</ul>

<h3>Computing Characteristics</h3>
<ul>
  <li>Computational speed increased significantly, reducing processing time from microseconds to nanoseconds (around 12 MHz).</li>
</ul>

<h3>Physical Appearance</h3>
<ul>
  <li>Much smaller in size compared to second generation computers.</li>
  <li>More portable and reliable.</li>
  <li>Produced much less heat, eliminating the need for dedicated cooling systems.</li>
</ul>

<h3>Application</h3>
<ul>
  <li>Computers became more accessible to the general public.</li>
  <li>They were commercially produced, smaller, and cheaper than earlier generations.</li>
</ul>



        `
  },
  'intro-classification': {
    title: 'Classification of Computer',
    content: `
            <p>Content will be displayed here. in HTML format</p>
        `
  },
  'intro-system': {
    title: 'The Computer System',
    content: `
            <p>Content will be displayed here. in HTML format</p>
        `
  },
  'intro-application': {
    title: 'Application of Computers',
    content: `
            <p>Content will be displayed here. in HTML format</p>
        `
  }
};

/* src/data/projectsData.js */

/**
 * =========================================================================
 * PLUG-AND-PLAY PROJECT DATA SCHEMA
 * =========================================================================
 * To add a new project in the future, copy and paste this template:
 *
 * {
 *   id: "unique-slug",
 *   title: "Project Title",
 *   date: "Month Year",
 *   category: "Full-Stack Funnel" | "System Architecture" | "Behavioral Telemetry",
 *   highlightBadge: "e.g. High-Conversion Interface",
 *   shortDesc: "Concise summary focusing on problem solved and conversion value.",
 *   techStack: ["Next.js", "GA4", "Node.js"],
 *   githubLink: "https://github.com/...",
 *   liveLink: "https://..." or "#",
 *   problem: "Business problem or technical bottleneck addressed.",
 *   solution: "Architectural implementation and results delivered.",
 *   journey: "Key technical challenge conquered.",
 *   reflections: "<li>Core takeaway or architectural learning.</li>",
 *   featured: true | false
 * }
 * =========================================================================
 */

export const flagshipProjects = [
  {
    id: 'f4',
    title: 'Consultancy Intake & Legal Engine (Portfolio V3)',
    date: 'Mar 2026',
    category: 'Full-Stack Funnel & Automation',
    highlightBadge: 'Lead Qualification & Automated Contracts',
    shortDesc:
      'A full-stack client qualification engine that converts visitors into staged projects with dynamic SOW/MSA compilation, pricing calculations, and POPIA privacy controls.',
    techStack: ['Next.js', 'React', 'CSS Modules', 'jsPDF', 'NodeMailer'],
    githubLink: 'https://github.com/mndiweni04/portfolio-v2',
    liveLink: '#',
    problem:
      'Standard portfolio sites rely on generic mailto links that deliver cold, unformatted inquiries without project scope, budget alignment, or legal agreements.',
    solution:
      'Engineered a deterministic multi-tier intake pipeline featuring conditional fast-track scheduling, server-side RFC email validation, and on-the-fly Master Service Agreement and SOW generation.',
    journey:
      'Designed a unified document layout engine that coordinates dynamic millimeter grid coordinates in jsPDF to produce pixel-perfect legal documentation across any viewport.',
    reflections:
      '<ul><li>Lead intake should remove friction for the client while enforcing deterministic scoping parameters for the engineer.</li><li>Automated legal artifact generation shortens the sales cycle from weeks to minutes.</li></ul>',
    featured: true,
  },
  {
    id: 'f1',
    title: 'Multi-Channel Client Portal & Retention System',
    date: 'Apr 2026',
    category: 'Companion Cross-Platform Platform',
    highlightBadge: 'Offline-First Client Access',
    shortDesc:
      'A cross-platform companion platform engineered with Flutter and Dart, providing reliable client data synchronization, local caching, and notification triggers across web and mobile viewports.',
    techStack: ['Flutter', 'Dart', 'Firebase', 'RESTful API'],
    githubLink: 'https://github.com/mndiweni04/habit_tracker',
    liveLink: '#',
    problem:
      'Web-only applications often lose user engagement during low-connectivity conditions, causing client churn and incomplete operational tasks.',
    solution:
      'Engineered a single-codebase companion platform with local persistence pipelines, Provider state management, and real-time cloud data reconciliation to ensure zero task disruption.',
    journey:
      'Maintained interface parity across Android, iOS, and Web viewports while strictly segregating business logic from platform-specific UI widgets.',
    reflections:
      '<ul><li>Mobile works best as a companion retention mechanism that complements a high-converting web funnel.</li><li>Local offline caching delivers an instant native feel even under poor network coverage.</li></ul>',
    featured: true,
  },
  {
    id: 'f2',
    title: 'Deterministic Workflow Engine (SWF Framework)',
    date: 'Mar 2026',
    category: 'System Reliability & Logic Architecture',
    highlightBadge: 'Zero-Regression Verification',
    shortDesc:
      'A 12-step architectural review framework designed to eliminate code regressions, enforce strict contract typing, and verify full-graph dependency propagation before release.',
    techStack: ['Python', 'System Architecture', 'Automated Verification'],
    githubLink: 'https://github.com/mndiweni04/mlTrader',
    liveLink: '#',
    problem:
      'High-throughput logic updates often fail due to hidden side effects, unhandled edge cases, and incomplete propagation across downstream dependencies.',
    solution:
      'Developed a phased engineering protocol enforcing context acquisition, forward propagation graphing, and approval gates before applying code modifications.',
    journey:
      'Shifted development from intuitive point editing to graph traversal analysis, preventing breaking changes across shared interfaces.',
    reflections:
      '<ul><li>Deterministic systems require mandatory verification loops before any logic is committed.</li><li>Architecture should always prioritize system integrity and correctness over developer speed.</li></ul>',
    featured: true,
  },
  {
    id: 'f3',
    title: 'Low-Latency Edge Telemetry Platform (IRIS)',
    date: 'Sep 2025',
    category: 'Telemetry & IoT Engineering',
    highlightBadge: 'Real-Time Sensor Streaming',
    shortDesc:
      'A low-latency safety telemetry system combining edge sensor instrumentation with real-time WebSocket event streaming and lightweight classification models.',
    techStack: ['C++', 'Python', 'ESP32', 'WebSocket Telemetry'],
    githubLink: 'https://github.com/mndiweni04/IRIS_Detection_System',
    liveLink: '#',
    problem:
      'Transmitting raw video or high-volume sensor telemetry to remote cloud servers introduces bandwidth bottlenecks and unacceptable response latency.',
    solution:
      'Engineered on-device signal processing using an ESP32 microcontroller and lightweight statistical models, streaming event notifications over low-overhead WebSockets.',
    journey:
      'Managed hardware buffer constraints to prevent heap exhaustion while maintaining continuous 60Hz telemetry transmission.',
    reflections:
      '<ul><li>Lightweight models run efficiently at the edge where cloud roundtrips are impractical.</li><li>Event-driven architecture is mandatory for real-time telemetry pipelines.</li></ul>',
    featured: true,
  },
];

export const experimentProjects = [
  {
    id: 'e1',
    title: 'Enterprise Staff & Resource Management Engine',
    date: 'Aug 2025',
    category: 'Relational Data Operations',
    shortDesc:
      'A robust desktop operations system applying strict OOP principles and PostgreSQL relational integrity to manage workforce data.',
    techStack: ['Java', 'Swing', 'PostgreSQL', 'Relational Schema'],
    githubLink: 'https://github.com/mndiweni04/PRG361-EmployeeApp',
  },
  {
    id: 'e2',
    title: 'Event-Driven Financial Calculation Interface',
    date: 'May 2025',
    category: 'Event-Driven UI Logic',
    shortDesc:
      'A high-precision arithmetic interface designed with decoupled event handlers and clean state preservation.',
    techStack: ['Java', 'AWT/Swing', 'Event Handling'],
    githubLink: 'https://github.com/mndiweni04/My-Calculator',
  },
  {
    id: 'e3',
    title: 'Matrix Matrix Scheduler & Calendar App',
    date: 'May 2025',
    category: 'Algorithm & UI Grid Modeling',
    shortDesc:
      'A calendar calculation tool mapping multi-dimensional time matrices into dynamic visual grids for scheduling automation.',
    techStack: ['C#', 'Windows Forms', '.NET Core'],
    githubLink: 'https://github.com/mndiweni04/Array-Manipulation/tree/main/Calendar%20App',
  },
];
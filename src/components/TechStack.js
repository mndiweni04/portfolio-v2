'use client';
import '../app/styles/techStack.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faReact, faNodeJs, faHtml5, faCss3Alt, faJava, faJs, faGitAlt, faNpm 
} from "@fortawesome/free-brands-svg-icons";
import { 
    faDatabase, faCode, faLaptopCode, faServer, faTerminal, faMobileAlt 
} from "@fortawesome/free-solid-svg-icons";

// Defining the stack data structure
const coreStack = [
    { name: "React", icon: faReact },
    { name: "Node.js", icon: faNodeJs },
    { name: "C#", icon: faCode }, // Using generic code icon for C#
    { name: "SQL", icon: faDatabase }
];

const categories = [
    {
        title: "Frontend Development",
        icon: faLaptopCode,
        description: "Building responsive, interactive user interfaces with modern frameworks.",
        techs: [
            { name: "React", icon: faReact },
            { name: "JavaScript", icon: faJs },
            { name: "HTML5", icon: faHtml5 },
            { name: "CSS3", icon: faCss3Alt }
        ]
    },
    {
        title: "Backend Development",
        icon: faServer,
        description: "Creating robust server-side logic and scalable APIs.",
        techs: [
            { name: "Node.js", icon: faNodeJs },
            { name: "C#", icon: faCode },
            { name: "Java", icon: faJava }
        ]
    },
    {
        title: "Database Management",
        icon: faDatabase,
        description: "Designing efficient schemas and managing data persistence.",
        techs: [
            { name: "PostgreSQL", icon: faDatabase },
            { name: "SQL", icon: faDatabase }
        ]
    },
    {
        title: "Tools & Workflow",
        icon: faTerminal,
        description: "Streamlining development with industry-standard version control and environments.",
        techs: [
            { name: "Git", icon: faGitAlt },
            { name: "NPM", icon: faNpm },
            { name: "IntelliJ", icon: faCode },
            { name: "NetBeans", icon: faCode },
            { name: "VS Code", icon: faCode }
        ]
    },
    {
        title: "Development Practices",
        icon: faMobileAlt,
        description: "Adhering to clean code principles and modern architecture standards.",
        techs: [
            { name: "OOP", icon: faCode },
            { name: "CRUD Operations", icon: faDatabase },
            { name: "REST APIs", icon: faServer },
            { name: "Responsive Design", icon: faMobileAlt }
        ]
    }
];

function TechStack() {
  return (
    <section className="tech-container" id="tech-stack">
        {/* Page Header */}
        <div className="tech-header animate-fade">
            <h1>Tech Stack</h1>
            <p>The technologies I use to build modern full-stack applications.</p>
        </div>

        {/* Hero Section: Core Stack */}
        <div className="core-stack-section animate-fade delay-1">
            <span className="section-label">Core Technologies</span>
            <div className="core-grid">
                {coreStack.map((tech, index) => (
                    <div key={index} className="tech-card core-card">
                        <div className="tech-icon">
                            <FontAwesomeIcon icon={tech.icon} />
                        </div>
                        <span className="tech-name">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Detailed Categories */}
        <div className="categories-wrapper animate-fade delay-2">
            <span className="section-label">Full Technical Ecosystem</span>
            <div className="category-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-section tech-card">
                        <div style={{ width: '100%', textAlign: 'left' }}>
                            <h3>
                                <FontAwesomeIcon icon={category.icon} style={{ fontSize: '1.2rem', color: 'var(--profile-theme)' }} />
                                {category.title}
                            </h3>
                            <p className="category-desc">{category.description}</p>
                            
                            <div className="tech-list">
                                {category.techs.map((tech, idx) => (
                                    <div key={idx} className="tech-badge">
                                        <FontAwesomeIcon icon={tech.icon} style={{ color: 'var(--text-secondary)' }} />
                                        <span>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

export default TechStack;
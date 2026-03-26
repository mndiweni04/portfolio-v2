'use client';
import styles from '../app/styles/techStack.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faReact, faNodeJs, faHtml5, faCss3Alt, faJava, faJs, faGitAlt, faNpm 
} from "@fortawesome/free-brands-svg-icons";
import { 
    faDatabase, faCode, faLaptopCode, faServer, faTerminal, faMobileAlt 
} from "@fortawesome/free-solid-svg-icons";

const coreStack = [
    { name: "React", icon: faReact },
    { name: "Node.js", icon: faNodeJs },
    { name: "React Native", icon: faMobileAlt },
    { name: "C#", icon: faCode }, 
    { name: "SQL", icon: faDatabase }
];

const categories = [
    {
        title: "Frontend & Mobile",
        icon: faLaptopCode,
        description: "Building responsive web interfaces and cross-platform native applications.",
        techs: [
            { name: "React", icon: faReact },
            { name: "React Native", icon: faMobileAlt },
            { name: "JavaScript", icon: faJs },
            { name: "HTML5 & CSS3", icon: faHtml5 }
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
    <section className="section-container" id="tech-stack">
        <div className="section-header animate-fade">
            <h1 className="section-title">Tech Stack</h1>
            <p className="section-subtitle">The technologies I use to build modern full-stack applications.</p>
        </div>

        <div className={`animate-fade ${styles['core-stack-section']} ${styles['delay-1'] || ''}`}>
            <span className={styles['section-label']}>Core Technologies</span>
            <div className={styles['core-grid']}>
                {coreStack.map((tech, index) => (
                    <div key={index} className={`${styles['tech-card']} ${styles['core-card']}`}>
                        <div className={styles['tech-icon']}>
                            <FontAwesomeIcon icon={tech.icon} />
                        </div>
                        <span className={styles['tech-name']}>{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className={`animate-fade ${styles['categories-wrapper']} ${styles['delay-2'] || ''}`}>
            <span className={styles['section-label']}>Full Technical Ecosystem</span>
            <div className={styles['category-grid']}>
                {categories.map((category, index) => (
                    <div key={index} className={`${styles['category-section']} ${styles['tech-card']}`}>
                        <div style={{ width: '100%', textAlign: 'left' }}>
                            <h3>
                                <FontAwesomeIcon icon={category.icon} style={{ fontSize: '1.2rem', color: 'var(--profile-theme)' }} />
                                {category.title}
                            </h3>
                            <p className={styles['category-desc']}>{category.description}</p>
                            
                            <div className={styles['tech-list']}>
                                {category.techs.map((tech, idx) => (
                                    <div key={idx} className={styles['tech-badge']}>
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
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
    { name: "Flutter", icon: faMobileAlt },
    { name: "C#", icon: faCode }, 
    { name: "SQL", icon: faDatabase }
];

const categories = [
    {
        title: "Mobile (Cross-Platform)",
        icon: faMobileAlt,
        description: "Building native-performance applications for iOS and Android.",
        techs: [
            { name: "React Native", icon: faReact },
            { name: "Dart", icon: faCode }
        ]
    },
    {
        title: "Web (Cross-Platform)",
        icon: faLaptopCode,
        description: "Developing highly responsive interfaces for browsers and desktop viewports.",
        techs: [
            { name: "React / Next.js", icon: faReact },
            { name: "Flutter for Web", icon: faMobileAlt },
            { name: "JavaScript / ES6+", icon: faJs },
            { name: "HTML5 & CSS3", icon: faHtml5 }
        ]
    },
    {
        title: "Backend & Logic",
        icon: faServer,
        description: "Creating robust server-side logic and scalable APIs.",
        techs: [
            { name: "Node.js", icon: faNodeJs },
            { name: "C# / .NET", icon: faCode },
            { name: "Java", icon: faJava },
            { name: "Express.js", icon: faServer }
        ]
    },
    {
        title: "Database Management",
        icon: faDatabase,
        description: "Designing efficient schemas and managing data persistence.",
        techs: [
            { name: "SQL Server", icon: faDatabase },
            { name: "PostgreSQL", icon: faDatabase },
            { name: "NoSQL / Firebase", icon: faDatabase }
        ]
    },
    {
        title: "Engineering Workflow",
        icon: faTerminal,
        description: "Adhering to strict coding standards and automated verification loops.",
        techs: [
            { name: "Git / Version Control", icon: faGitAlt },
            { name: "Clean Architecture", icon: faTerminal },
            { name: "Agile / Scrum", icon: faLaptopCode },
            { name: "API Integration", icon: faServer }
        ]
    }
];

function TechStack() {
  return (
    <section className="section-container" id="tech-stack">
        <div className="section-header animate-fade">
            <h1 className="section-title">Technical Ecosystem</h1>
            <p className="section-subtitle">The technologies I use to build modern, deterministic full-stack systems across Web and Mobile.</p>
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
            <span className={styles['section-label']}>Full Technical Stack</span>
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
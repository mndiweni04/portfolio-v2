import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/services.module.css';

export const metadata = { title: 'Technical Services | Mandla Ndiweni' };

const servicesData = [
    {
        id: "cross-platform-mobile",
        name: "Mobile Prototype",
        price: "Custom Quote",
        description: "Native-performance cross-platform applications for iOS and Android using React Native or Flutter.",
        features: [
            "React Native / Flutter Architecture",
            "API & Local Storage Integration",
            "Responsive Mobile UI/UX Design",
            "Notification Systems"
        ],
        isPrimary: false
    },
    {
        id: "fullstack-web",
        name: "Full-Stack Web System",
        price: "Custom Quote",
        description: "Deterministic backend logic and responsive frontend ecosystems using React or Flutter for Web.",
        features: [
            "React or Flutter Web Frontend",
            "C# or Node.js Backend Logic",
            "Relational Database (SQL/PostgreSQL)",
            "Authentication & Role-Based Access"
        ],
        isPrimary: true
    },
    {
        id: "system-audit",
        name: "System Integration",
        price: "Hourly Rate",
        description: "Codebase audits and refactoring legacy systems for cross-platform scalability.",
        features: [
            "Structural Evaluation & Refactoring",
            "IoT / Hardware Data Pipelines",
            "Performance Optimization",
            "Technical Documentation"
        ],
        isPrimary: false
    }
];

export default function ServicesPage() {
    return (
        <section className="section-container">
            <div className="section-header animate-fade">
                <h1 className="section-title">Technical Implementations</h1>
                <p className="section-subtitle">Delivering product-grade development and scalable architecture tailored to your business requirements across all platforms.</p>
            </div>

            <div className={`${styles['pricing-grid']} animate-fade ${styles['delay-1'] || ''}`}>
                {servicesData.map((service) => (
                    <div key={service.id} className={styles['pricing-card']}>
                        <h2 className={styles['tier-name']}>{service.name}</h2>
                        <p className={styles['tier-desc']}>{service.description}</p>
                        <div className={styles['tier-price']}>{service.price}</div>
                        
                        <ul className={styles['tier-features']}>
                            {service.features.map((feature, idx) => (
                                <li key={idx}>
                                    <FontAwesomeIcon icon={faCheckCircle} className={styles['feature-icon']} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link 
                            href={`/contact?service=${service.id}`} 
                            className={`${styles['service-btn']} ${service.isPrimary ? styles['primary'] : ''}`}
                        >
                            Request Architecture
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/services.module.css';

export const metadata = { title: 'Technical Services | Mandla Ndiweni' };

const servicesData = [
    {
        id: "frontend-mvp",
        name: "Frontend Prototype",
        price: "Custom Quote",
        description: "High-performance, responsive single-page applications optimized for user conversion.",
        features: [
            "React.js or Next.js Architecture",
            "Mobile-First Responsive Design",
            "Third-party API Integration",
            "Basic SEO & Metadata Setup"
        ],
        isPrimary: false
    },
    {
        id: "fullstack-system",
        name: "Full-Stack System",
        price: "Custom Quote",
        description: "End-to-end development with robust backend logic, database modeling, and secure APIs.",
        features: [
            "Node.js or C# Backend Logic",
            "Relational Database (SQL/PostgreSQL)",
            "Authentication & Security implementation",
            "Admin Dashboard & Data Visualizations"
        ],
        isPrimary: true
    },
    {
        id: "tech-consult",
        name: "System Integration",
        price: "Hourly Rate",
        description: "Debugging, hardware (IoT) integrations, and refactoring existing legacy codebases.",
        features: [
            "Codebase Audit & Refactoring",
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
                <p className="section-subtitle">Delivering product-grade development, deterministic logic, and scalable architecture tailored to your operational requirements.</p>
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
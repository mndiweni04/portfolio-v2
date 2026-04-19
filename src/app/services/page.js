import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldAlt, faFileContract } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/services.module.css';
import ServiceSelection from '../../components/ServiceSelection';

export const metadata = { title: 'Available Architectures | Mandla Ndiweni' };

const servicesData = [
    {
        id: "basic",
        name: "Basic Webpage",
        price: "R 2,500",
        description: "A single-page high-conversion landing page for businesses needing an immediate online presence.",
        features: [
            "Single responsive page",
            "Contact form integration",
            "Mobile-first design",
            "Basic SEO metadata"
        ],
        isPrimary: false
    },
    {
        id: "starter",
        name: "Starter (MVP)",
        price: "R 12,500",
        description: "Basic 3-5 page responsive site, contact forms, and SEO setup optimized for early user acquisition.",
        features: [
            "Up to 5 responsive pages",
            "CMS for basic content edits",
            "Standard analytics setup",
            "Domain & Email configuration"
        ],
        isPrimary: true
    },
    {
        id: "growth",
        name: "Growth (Custom)",
        price: "R 35,000",
        description: "Full feature roadmap implementation, API integrations, and performance optimization for growing teams.",
        features: [
            "Full custom feature set",
            "Third-party API integrations",
            "Performance & Speed optimization",
            "Advanced SEO & Monitoring"
        ],
        isPrimary: false
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "R 75,000",
        description: "Custom infrastructure, security reviews, and mission-critical scalability for large-scale platforms.",
        features: [
            "Custom cloud architecture",
            "Penetration testing & Security audit",
            "High-availability setup",
            "Multi-platform synchronization"
        ],
        isPrimary: false
    }
];

const addonsData = [
    {
      id: "shareCode",
      name: "Full Source Ownership",
      price: "+ R 5,000",
      description: "Complete handover of the git repository and intellectual property rights."
    },
    {
      id: "hostingBasic",
      name: "Managed Hosting",
      price: "+ R 250 /mo",
      description: "Reliable monthly hosting, backups, and security patches (Subscription)."
    },
    {
      id: "seoOptimization",
      name: "Advanced SEO",
      price: "+ R 3,500",
      description: "Comprehensive keyword strategy and technical SEO tuning."
    }
];

export default function ServicesPage() {
    return (
        <section className="section-container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div className={styles['back-link-container']}>
                <Link href="/" className={styles['back-link']}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Return to Portfolio
                </Link>
            </div>
            
            <div className="section-header animate-fade">
                <h1 className="section-title">Select Your Architecture</h1>
                <p className="section-subtitle">Choose a tier that aligns with your operational scale. All packages are built with high-performance, deterministic logic tailored for the South African market.</p>
            </div>

            <ServiceSelection services={servicesData} addons={addonsData} />

            <div className="section-header animate-fade" style={{ marginTop: '6rem' }}>
                <h1 className="section-title">Operational Policies</h1>
                <p className="section-subtitle">Transparent terms governing our engineering partnerships and data privacy.</p>
            </div>

            <div className={`${styles['legal-summary-section']} animate-fade`}>
                <div className={styles['legal-card']}>
                    <div className={styles['legal-icon-wrapper']}>
                        <FontAwesomeIcon icon={faFileContract} className={styles['legal-icon']} />
                    </div>
                    <div className={styles['legal-content']}>
                        <h3 className={styles['legal-title']}>The Commitment Model</h3>
                        <p className={styles['legal-text']}>
                            Development begins with a non-refundable <span className={styles['highlight']}>10% Commitment Fee</span>. 
                            The remaining 90% is strictly commitment-free until you approve the final Staging environment after a maximum of 3 formal revisions.
                        </p>
                    </div>
                </div>
                <div className={styles['legal-card']}>
                    <div className={styles['legal-icon-wrapper']}>
                        <FontAwesomeIcon icon={faShieldAlt} className={styles['legal-icon']} />
                    </div>
                    <div className={styles['legal-content']}>
                        <h3 className={styles['legal-title']}>POPIA Privacy Compliant</h3>
                        <p className={styles['legal-text']}>
                            Your technical scopes and communications are protected. We utilize <span className={styles['highlight']}>encrypted transmission protocols</span> and localized South African infrastructure for data processing.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    );
}
/* src/app/services/page.js */
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
        isPrimary: false,         
        timelineStandard: "3-5 Business Days",         
        timelineFastTrack: "1-2 Business Days"     
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
        isPrimary: true,         
        timelineStandard: "10-14 Business Days",         
        timelineFastTrack: "5-7 Business Days"     
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
        isPrimary: false,         
        timelineStandard: "21-30 Business Days",         
        timelineFastTrack: "10-14 Business Days"     
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
        isPrimary: false,         
        timelineStandard: "45+ Business Days",         
        timelineFastTrack: "21-30 Business Days"     
    } 
];

const addonsData = [     
    {         
        id: "additionalPages", category: "Scope Expansion", name: "Additional Pages", type: "scalar", price: "+ R 1,000 /page", description: "Expand your site's scope. Basic: Max 2. Starter: Max 5.", restrictedTo: ['basic', 'starter', 'growth'], maxLimit: { basic: 2, starter: 5, growth: 99, enterprise: 99 }     
    },     
    {         
        id: "shareCode", category: "Scope Expansion", name: "Full Source Ownership", type: "boolean", price: "+ R 5,000", description: "Complete handover of the git repository and intellectual property rights.", restrictedTo: ['basic', 'starter', 'growth', 'enterprise']     
    },          
    {         
        id: "emailServer", category: "Infrastructure", name: "Domain & Email Configuration", type: "boolean", price: "+ R 1,500", description: "Professional communication integration. (Native to Starter+).", restrictedTo: ['basic']     
    },     
    {         
        id: "analytics", category: "Infrastructure", name: "Standard Analytics Setup", type: "boolean", price: "+ R 1,200", description: "Traffic monitoring and basic conversion tracking. (Native to Starter+).", restrictedTo: ['basic']     
    },     
    {         
        id: "cmsSetup", category: "Infrastructure", name: "Lightweight CMS", type: "boolean", price: "+ R 3,500", description: "Administrative interface for dynamic content edits. (Native to Starter+).", restrictedTo: ['basic']     
    },          
    {         
        id: "chatbotDialogflow", category: "Conversational AI", name: "Website Chatbot (Quick Setup)", type: "boolean", price: "+ R 4,500", description: "Dialogflow/Tidio. Best for immediate lead capture and FAQ handling.", restrictedTo: ['basic', 'starter', 'growth', 'enterprise']     
    },     
    {         
        id: "chatbotBotpress", category: "Conversational AI", name: "Hybrid Chatbot (Botpress)", type: "boolean", price: "+ R 8,500", description: "Balanced visual logic with custom nodes for specialized user journeys.", restrictedTo: ['starter', 'growth', 'enterprise']     
    },     
    {         
        id: "chatbotPowerVirtual", category: "Conversational AI", name: "Internal Ops Bot", type: "boolean", price: "+ R 12,500", description: "Power Virtual Agents. Automation for employee-facing internal tools.", restrictedTo: ['growth', 'enterprise']     
    },     
    {         
        id: "chatbotRasa", category: "Conversational AI", name: "Private AI Agent (Rasa)", type: "boolean", price: "+ R 18,500", description: "Self-hosted AI for 100% data control and privacy compliance.", restrictedTo: ['growth', 'enterprise']     
    },     
    {         
        id: "chatbotWatson", category: "Conversational AI", name: "Enterprise Customer Support", type: "boolean", price: "+ R 32,000", description: "Amazon Lex/IBM Watson. High-volume, deep NLP for mission-critical platforms.", restrictedTo: ['enterprise']     
    } 
];

export default function ServicesPage() {     
    return (         
        <section className="section-container">             
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
            <div className="section-header animate-fade" style={{ marginTop: 'clamp(3rem, 8vw, 6rem)' }}>                 
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
                            Development begins with a non-refundable <span className={styles['highlight']}>10% Commitment Fee</span> (or 25% for Priority Fast-Track).                              
                            The remaining balance is strictly commitment-free until you approve the final Staging environment.                         
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
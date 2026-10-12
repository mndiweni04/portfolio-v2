/* src/components/TechStack.js */
'use client';

import Link from 'next/link';
import styles from '../app/styles/techStack.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact,
  faNodeJs,
  faHtml5,
  faCss3Alt,
  faJs,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faCode,
  faLaptopCode,
  faServer,
  faTerminal,
  faMobileAlt,
  faChartLine,
  faArrowRight,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

const coreFunnelStack = [
  {
    name: 'Next.js / React',
    icon: faReact,
    role: 'Conversion UI & Core Web Vitals',
    suggestion: 'Foundation for high-speed, sub-second landing pages and web applications.',
    targetUrl: '/services',
    ctaText: 'Explore Web Architecture',
  },
  {
    name: 'GA4 & GTM Telemetry',
    icon: faChartLine,
    role: 'Lead Attribution & Friction Tracking',
    suggestion: 'Configured for custom hover-intent triggers, dwell time, and conversion funnels.',
    targetUrl: '/contact?package=telemetry-setup&timeline=5-7%20Business%20Days',
    ctaText: 'View Telemetry Setup',
  },
  {
    name: 'Node.js & APIs',
    icon: faServer,
    role: 'Lead Pipeline & Document Routing',
    suggestion: 'Powers automated qualification routing, PDF contract generation, and CRM syncing.',
    targetUrl: '/services',
    ctaText: 'View Backend Logic',
  },
  {
    name: 'SQL & Data Storage',
    icon: faDatabase,
    role: 'Persistent Lead & Account Records',
    suggestion: 'Maintains deterministic, relational persistence for intake and transaction records.',
    targetUrl: '/services',
    ctaText: 'Explore Infrastructure',
  },
];

const funnelCategories = [
  {
    title: 'Front-End Conversion Layer',
    icon: faLaptopCode,
    badge: 'Traffic-to-Lead Interface',
    description:
      'Engineered for sub-second rendering, mobile responsiveness, and zero layout shift so qualified traffic never bounces.',
    techs: [
      {
        name: 'React / Next.js',
        icon: faReact,
        context: 'Sub-second SSR & App Router',
        servicePillar: 'System Engineering',
        targetUrl: '/services',
      },
      {
        name: 'JavaScript / ES6+',
        icon: faJs,
        context: 'Dynamic DOM state & interactions',
        servicePillar: 'Front-End Systems',
        targetUrl: '/services',
      },
      {
        name: 'HTML5 & Responsive CSS',
        icon: faHtml5,
        context: 'Mobile-first layout precision',
        servicePillar: 'Landing Pages',
        targetUrl: '/services',
      },
      {
        name: 'CSS Modules / Glass UI',
        icon: faCss3Alt,
        context: 'High-trust, aesthetic conversion UI',
        servicePillar: 'Design Systems',
        targetUrl: '/services',
      },
    ],
  },
  {
    title: 'Behavioral Telemetry & Intelligence',
    icon: faChartLine,
    badge: 'Conversion Verification',
    description:
      'The core of our strategic pivot. Mathematical tracking that verifies whether your webpage is actually capturing clients or leaking value.',
    techs: [
      {
        name: 'Google Tag Manager',
        icon: faFilter,
        context: 'Custom JavaScript event triggers',
        servicePillar: 'Telemetry Implementation',
        targetUrl: '/contact?package=telemetry-setup&timeline=5-7%20Business%20Days',
      },
      {
        name: 'Google Analytics 4',
        icon: faChartLine,
        context: 'Funnel exploration & dwell tracking',
        servicePillar: 'Lead Intelligence',
        targetUrl: '/contact?package=telemetry-setup&timeline=5-7%20Business%20Days',
      },
      {
        name: 'Meta CAPI & Tracking Pixels',
        icon: faCode,
        context: 'Server-side attribution delivery',
        servicePillar: 'Full-Funnel Instrumentation',
        targetUrl: '/services',
      },
      {
        name: 'Conversion Rate Auditing',
        icon: faTerminal,
        context: 'User friction & drop-off diagnosis',
        servicePillar: 'Analytics Retainer',
        targetUrl: '/services',
      },
    ],
  },
  {
    title: 'Backend Logic & Intake Pipelines',
    icon: faServer,
    badge: 'Fulfillment & Routing',
    description:
      'Automating the bridge between form submission, lead scoring, dynamic PDF legal contract compilation, and client handoff.',
    techs: [
      {
        name: 'Node.js & Express',
        icon: faNodeJs,
        context: 'API dispatch & intake webhooks',
        servicePillar: 'System Engineering',
        targetUrl: '/services',
      },
      {
        name: 'C# / .NET',
        icon: faCode,
        context: 'Deterministic enterprise workflows',
        servicePillar: 'Custom Infrastructure',
        targetUrl: '/services',
      },
      {
        name: 'RESTful Integrations',
        icon: faServer,
        context: 'CRM, SMTP & payment endpoints',
        servicePillar: 'Full Feature Roadmap',
        targetUrl: '/services',
      },
      {
        name: 'Automated Document Engines',
        icon: faTerminal,
        context: 'Instant SOW/MSA PDF compilation',
        servicePillar: 'Intake Automation',
        targetUrl: '/services',
      },
    ],
  },
  {
    title: 'Data Integrity & Persistence',
    icon: faDatabase,
    badge: 'Storage & Scalability',
    description:
      'Clean schema modeling and secure data persistence to maintain uncorrupted lead pipelines and client interaction history.',
    techs: [
      {
        name: 'SQL Server',
        icon: faDatabase,
        context: 'Relational data modeling',
        servicePillar: 'Custom Backends',
        targetUrl: '/services',
      },
      {
        name: 'PostgreSQL',
        icon: faDatabase,
        context: 'High-concurrency data storage',
        servicePillar: 'Scalable Systems',
        targetUrl: '/services',
      },
      {
        name: 'Firebase / NoSQL',
        icon: faDatabase,
        context: 'Real-time state & auth tracking',
        servicePillar: 'MVP Architectures',
        targetUrl: '/services',
      },
    ],
  },
  {
    title: 'Multi-Channel Companion Platforms',
    icon: faMobileAlt,
    badge: 'Cross-Screen Retention',
    description:
      'Extending your web funnel into companion mobile environments to maximize client retention and continuous account access.',
    techs: [
      {
        name: 'Flutter & Dart',
        icon: faMobileAlt,
        context: 'Cross-platform client applications',
        servicePillar: 'Multi-Platform Sync',
        targetUrl: '/services',
      },
      {
        name: 'React Native',
        icon: faReact,
        context: 'Native mobile interfaces',
        servicePillar: 'Companion Apps',
        targetUrl: '/services',
      },
      {
        name: 'Cross-Screen Parity',
        icon: faLaptopCode,
        context: 'Unified business logic & UI',
        servicePillar: 'Enterprise Delivery',
        targetUrl: '/services',
      },
    ],
  },
  {
    title: 'Engineering Reliability & Verification',
    icon: faTerminal,
    badge: 'Zero-Regression Standards',
    description:
      'Rigorous engineering loops, automated validation guards, and strict architectural discipline to guarantee flawless delivery.',
    techs: [
      {
        name: 'Git & Version Control',
        icon: faGitAlt,
        context: 'Deterministic release management',
        servicePillar: 'Source Ownership',
        targetUrl: '/services',
      },
      {
        name: 'Clean Architecture',
        icon: faTerminal,
        context: 'SOLID & loosely-coupled codebases',
        servicePillar: 'Maintainable Systems',
        targetUrl: '/services',
      },
      {
        name: 'Rigorous Verification Loops',
        icon: faCode,
        context: 'Automated testing & lint integrity',
        servicePillar: 'Mission-Critical Quality',
        targetUrl: '/services',
      },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="section-container" id="tech-stack">
      <div className="section-header animate-fade">
        <h1 className="section-title">Conversion Tech Stack & Telemetry Engine</h1>
        <p className="section-subtitle">
          Modern web development is commoditized. These are the front-end frameworks,
          behavioral instrumentation tools, and full-stack pipelines engineered to turn
          traffic into qualified clients and prove page performance.
        </p>
      </div>

      {/* Core Conversion Engine Section */}
      <div className={`animate-fade ${styles['core-stack-section']} ${styles['delay-1'] || ''}`}>
        <h2 className={styles['section-label']}>Core Funnel Technologies</h2>
        <div className={styles['core-grid']}>
          {coreFunnelStack.map((tech, index) => (
            <div key={index} className={`${styles['tech-card']} ${styles['core-card']}`}>
              <div className={styles['core-card-main']}>
                <div className={styles['tech-icon']}>
                  <FontAwesomeIcon icon={tech.icon} />
                </div>
                <h3 className={styles['tech-name']}>{tech.name}</h3>
                <span className={styles['tech-role']}>{tech.role}</span>
              </div>

              {/* Suggestive Hover Reveal Drawer */}
              <div className={styles['suggestive-drawer']}>
                <p className={styles['suggestive-text']}>{tech.suggestion}</p>
                <Link href={tech.targetUrl} className={styles['suggestive-link']}>
                  <span>{tech.ctaText}</span>
                  <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel Taxonomy Categories */}
      <div className={`animate-fade ${styles['categories-wrapper']} ${styles['delay-2'] || ''}`}>
        <h2 className={styles['section-label']}>Operational Funnel Architecture</h2>
        <div className={styles['category-grid']}>
          {funnelCategories.map((category, index) => (
            <div key={index} className={`${styles['category-section']} ${styles['tech-card']}`}>
              <div className={styles['category-content']}>
                <div className={styles['category-header']}>
                  <span className={styles['category-badge']}>{category.badge}</span>
                  <h3>
                    <FontAwesomeIcon
                      icon={category.icon}
                      style={{
                        fontSize: '1.2rem',
                        color: 'var(--profile-theme)',
                        marginRight: '0.5rem',
                      }}
                    />
                    {category.title}
                  </h3>
                  <p className={styles['category-desc']}>{category.description}</p>
                </div>

                <div className={styles['tech-list']}>
                  {category.techs.map((tech, idx) => (
                    <div key={idx} className={styles['tech-badge-container']}>
                      <div className={styles['tech-badge']}>
                        <FontAwesomeIcon
                          icon={tech.icon}
                          style={{ color: 'var(--text-secondary)' }}
                        />
                        <div className={styles['badge-meta']}>
                          <span className={styles['badge-name']}>{tech.name}</span>
                          <span className={styles['badge-context']}>{tech.context}</span>
                        </div>
                      </div>

                      {/* Accessible & Reliable Suggestive Badge Overlay */}
                      <Link
                        href={tech.targetUrl}
                        className={styles['badge-suggestive-hover']}
                        title={`Deployed in: ${tech.servicePillar}`}
                      >
                        <span>Deployed in: {tech.servicePillar}</span>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{ fontSize: '0.75rem' }}
                          aria-hidden="true"
                        />
                      </Link>
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
/* src/app/services/page.js */
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faShieldAlt,
  faFileContract,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/services.module.css';
import ServiceSelection from '../../components/ServiceSelection';
import {
  SERVICE_PILLARS,
  SERVICES_CATALOG,
  ADDONS_CATALOG,
} from '../../data/servicesCatalog';

export const metadata = {
  title: 'Services & Architecture Ecosystem | Mandla Ndiweni',
  description:
    'Comprehensive digital engineering, lead-funnel telemetry, and growth marketing retainers tailored for performance verification.',
};

export default function ServicesPage() {
  return (
    <section className="section-container">
      <div className={styles['back-link-container']}>
        <Link href="/" className={styles['back-link']}>
          <FontAwesomeIcon icon={faArrowLeft} /> Return to Portfolio
        </Link>
      </div>

      <div className="section-header animate-fade">
        <h1 className="section-title">Architectures & Growth Services</h1>
        <p className="section-subtitle">
          Webpage development has become commoditized. We deliver clarity,
          rigorous behavioral instrumentation, and acquisition management to prove
          whether your digital assets actually capture clients or leak value.
        </p>
      </div>

      <ServiceSelection
        pillars={SERVICE_PILLARS}
        services={SERVICES_CATALOG}
        addons={ADDONS_CATALOG}
      />

      <div
        className="section-header animate-fade"
        style={{ marginTop: 'clamp(4rem, 9vw, 7rem)' }}
      >
        <h2 className="section-title">Operational & Contracting Protocols</h2>
        <p className="section-subtitle">
          Transparent commercial standards distinguishing build milestones,
          performance retainers, and media pass-through costs.
        </p>
      </div>

      <div className={`${styles['legal-summary-section']} animate-fade`}>
        <div className={styles['legal-card']}>
          <div className={styles['legal-icon-wrapper']}>
            <FontAwesomeIcon
              icon={faFileContract}
              className={styles['legal-icon']}
            />
          </div>
          <div className={styles['legal-content']}>
            <h3 className={styles['legal-title']}>The Commitment Model</h3>
            <p className={styles['legal-text']}>
              Milestone builds commence with a non-refundable{' '}
              <span className={styles['highlight']}>10% Commitment Fee</span> (25%
              for Fast-Track). The remaining 90% balance is strictly deferred
              until you approve the live Staging sandbox.
            </p>
          </div>
        </div>

        <div className={styles['legal-card']}>
          <div className={styles['legal-icon-wrapper']}>
            <FontAwesomeIcon
              icon={faChartPie}
              className={styles['legal-icon']}
            />
          </div>
          <div className={styles['legal-content']}>
            <h3 className={styles['legal-title']}>Media Cost Pass-Through</h3>
            <p className={styles['legal-text']}>
              For paid acquisition (PPC), agency fees cover campaign
              engineering and optimization only. Raw ad spend is paid{' '}
              <span className={styles['highlight']}>directly to the ad platforms</span> (Google/Meta) with 100% transparency.
            </p>
          </div>
        </div>

        <div className={styles['legal-card']}>
          <div className={styles['legal-icon-wrapper']}>
            <FontAwesomeIcon
              icon={faShieldAlt}
              className={styles['legal-icon']}
            />
          </div>
          <div className={styles['legal-content']}>
            <h3 className={styles['legal-title']}>POPIA & Data Telemetry</h3>
            <p className={styles['legal-text']}>
              All tracking instrumentation complies strictly with South Africa&apos;s
              POPI Act. Client telemetry, user behavioral data, and scope inputs
              are isolated within encrypted af-south-1 compliant cloud nodes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
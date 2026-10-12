/* src/components/cover-page.js */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import CvImage from '../../public/images/CvImg2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faMobileAlt,
  faCode,
  faLaptopCode,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../app/styles/cover-page.module.css';

function CoverPg() {
  return (
    <div className={styles.profile}>
      <h1 className={styles.name}>Mandla Ndiweni</h1>

      <div className={styles.bio}>
        <div className={styles.CVimg}>
          <Image
            src={CvImage}
            alt="Mandla Ndiweni Profile Image"
            className={styles['grid-image']}
            priority
          />
        </div>
        <div className={styles.bcard}>
          <h2 className={styles.prof}>
            Conversion-Focused Front-End Developer & Full-Stack Funnel Architect
          </h2>
          <p className={styles['bcard-para']}>
            I engineer high-speed, deterministic web interfaces and full-stack funnels
            built to turn visitor traffic into paying clients. Nowadays, anyone can deploy
            a webpage; my focus is providing the sub-second speed, behavioral telemetry
            (GA4/GTM), and intake automation to mathematically prove and justify your
            page&apos;s conversion performance.
          </p>
        </div>
      </div>

      {/* Symmetrical Centered Pyramid of Core Stacks */}
      <div className={styles['icon-pyramid']}>
        <div className={styles['icon-row']}>
          <FontAwesomeIcon
            icon={faReact}
            className={styles['tech-icon']}
            title="React & Next.js (Conversion Front-End)"
          />
          <FontAwesomeIcon
            icon={faChartLine}
            className={styles['tech-icon']}
            title="GA4 & GTM (Telemetry & Attribution)"
          />
        </div>
        <div className={styles['icon-row']}>
          <FontAwesomeIcon
            icon={faDatabase}
            className={styles['tech-icon']}
            title="SQL & Data Persistence"
          />
          <FontAwesomeIcon
            icon={faCode}
            className={styles['tech-icon']}
            title="Node.js & Backend Pipelines"
          />
          <FontAwesomeIcon
            icon={faMobileAlt}
            className={styles['tech-icon']}
            title="Flutter (Cross-Platform Companion Apps)"
          />
        </div>
      </div>

      <div className={styles['intro-para']}>
        <p className={styles.paragraph}>
          Bridging the gap between front-end UI performance, user behavioral tracking,
          and automated client acquisition for the South African market and beyond.
        </p>

        {/* Dual Conversion Funnel CTAs */}
        <div className={styles['cta-group']}>
          <Link href="/services" className={styles['action-btn-primary']}>
            Explore Funnel Architectures
          </Link>
          <Link href="/projects" className={styles['action-btn-secondary']}>
            View Case Studies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CoverPg;
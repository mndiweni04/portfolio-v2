/* src/components/aboutme.js */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../app/styles/aboutme.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faGlobe,
  faRunning,
  faBookReader,
  faChartLine,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

const Images = [
  '/images/prtImg1.jpg',
  '/images/prtImg2.jpg',
  '/images/prtImg3.jpg',
  '/images/prtImg4.jpg',
  '/images/prtImg5.jpg',
];

function AboutMe() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-container">
      <div className="section-header animate-fade">
        <h1 className="section-title">Commercial Execution & Systems Delivery</h1>
        <p className="section-subtitle">
          I build full-stack funnels that bridge the gap between technical front-end speed,
          behavioral analytics, and measurable client acquisition.
        </p>
      </div>

      {/* Applied Technical Competencies & Specializations */}
      <div className={`${styles['glass-section']} animate-fade ${styles['delay-1'] || ''}`}>
        <div className={styles['section-label-row']}>
          <div className={styles['section-icon']}>
            <FontAwesomeIcon icon={faCode} />
          </div>
          <span className={styles['section-label']}>Verified Foundations & Technical Stack</span>
        </div>

        <div className={styles['competency-grid']}>
          <div className={styles['competency-block']}>
            <h3 className={styles['edu-title']}>Belgium Campus ITversity</h3>
            <span className={styles['time-badge']}>Graduated: Oct 2025</span>
            <p className={styles['edu-desc']}>Diploma in Information Technology (Software & Web Dev)</p>
            <ul className={styles['edu-list']}>
              <li className={styles['edu-list-item']}>
                <strong>Core Focus:</strong> Enterprise software architecture, relational database management, and web engineering.
              </li>
            </ul>
          </div>

          <div className={styles['competency-block']}>
            <h3 className={styles['edu-title']}>IBM & SkillUp (Coursera)</h3>
            <span className={styles['time-badge']}>Verified Specialization: Apr 2026</span>
            <p className={styles['edu-desc']}>Developing Multi-Platform Applications with Flutter</p>
            <ul className={styles['edu-list']}>
              <li className={styles['edu-list-item']}>
                <strong>Core Focus:</strong> Single-codebase client portals, asynchronous state management, and real-time API sync.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Commercial Execution & Stakeholder Translation */}
      <div className={`${styles['glass-section']} animate-fade ${styles['delay-2'] || ''}`}>
        <div className={styles['section-label-row']}>
          <div className={styles['section-icon']}>
            <FontAwesomeIcon icon={faBriefcase} />
          </div>
          <span className={styles['section-label']}>Client Delivery & Conversion Translation</span>
        </div>

        <div className={styles['experience-content']}>
          <div className={styles['exp-text']}>
            <p className={styles['exp-text-para']}>
              Operating as a freelance engineer interfacing directly with businesses, my objective
              is not just deploying static pixels, but ensuring digital assets capture and convert demand.
              By combining sub-second front-end performance (React / Next.js) with behavioral event
              tracking (GA4 / GTM), I deliver systems that give founders total clarity into their funnel ROI.
            </p>
            <p className={styles['exp-text-para']} style={{ marginTop: '1.25rem' }}>
              My background in sales gives me a distinctive commercial edge: I translate complex
              technical architectures into clear business outcomes for non-technical stakeholders,
              ensuring that software engineering directly fuels client acquisition.
            </p>
          </div>

          <div className={styles['exp-skills']}>
            <h4 className={styles['exp-skills-title']}>Core Service Competencies</h4>
            <ul className={styles['exp-skills-list']}>
              <li className={styles['exp-skill-item']}>High-Converting Front-End Engineering (React, Next.js)</li>
              <li className={styles['exp-skill-item']}>Funnel Telemetry & Lead Drop-off Tracking (GA4, GTM)</li>
              <li className={styles['exp-skill-item']}>Intake Automation & Dynamic SOW Contract Generation</li>
              <li className={styles['exp-skill-item']}>Cross-Platform Companion Apps & Retention (Flutter, Dart)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Center-Out Distributed Split Cards */}
      <div className={`${styles['split-section']} animate-fade ${styles['delay-3'] || ''}`}>
        <div className={`${styles['glass-card-bottom']} ${styles['interest-card']}`}>
          <h3 className={styles['interest-title']}>Engineering Disciplines</h3>
          <ul className={styles['interest-list']}>
            <li className={styles['interest-item']}>
              <FontAwesomeIcon icon={faChartLine} /> <span>Conversion Rate Optimization & Funnel Telemetry</span>
            </li>
            <li className={styles['interest-item']}>
              <FontAwesomeIcon icon={faGlobe} /> <span>High-Availability Cloud Architecture & POPIA Compliance</span>
            </li>
            <li className={styles['interest-item']}>
              <FontAwesomeIcon icon={faBookReader} /> <span>Continuous Verification Loops & Zero-Regression Coding</span>
            </li>
            <li className={styles['interest-item']}>
              <FontAwesomeIcon icon={faRunning} /> <span>Athletics & High-Performance Physical Training</span>
            </li>
          </ul>
        </div>

        <div className={`${styles['glass-card-bottom']} ${styles['carousel-card']}`}>
          <div className={styles['img-contain']}>
            <Image
              src={Images[index]}
              alt={`Mandla Ndiweni Portfolio Slide ${index + 1}`}
              className={styles['abt-img-large']}
              width={500}
              height={667}
              priority={index === 0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
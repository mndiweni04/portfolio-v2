'use client';
import Image from 'next/image';
import Link from 'next/link';
import CvImage from '../../public/images/CvImg2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faMobileAlt, faCode, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import styles from '../app/styles/cover-page.module.css';

function CoverPg(){
    return(
        <div className={styles.profile}>

            <h1 className={styles.name}>Mandla Ndiweni</h1>

            <div className={styles.bio}>
                <div className={styles.CVimg}>
                    <Image src={CvImage} alt='Mandla Ndiweni Profile Image' className={styles['grid-image']} priority />
                </div>

                <div className={styles.bcard}>
                    <h2 className={styles.prof}>Junior Full Stack Developer</h2>
                    <p className={styles['bcard-para']}>
                        I am a developer currently pursuing an IT Diploma at Belgium Campus ITversity to formalize my engineering foundation. 
                        I bring over a year of practical experience as a freelance web developer, alongside recent hands-on experience in 
                        mobile development building proprietary IP. My background in sales has uniquely equipped me to translate technical 
                        complexity into clear, actionable insights for non-technical stakeholders.
                    </p>
                </div>
            </div>
            
            <div className={styles['icon-pyramid']}>
                <div className={styles['icon-row']}>
                    <FontAwesomeIcon icon={faReact} className={styles['tech-icon']} title="React.js / Web" />
                    <FontAwesomeIcon icon={faMobileAlt} className={styles['tech-icon']} title="React Native / Mobile" />
                </div>

                <div className={styles['icon-row']}>
                    <FontAwesomeIcon icon={faDatabase} className={styles['tech-icon']} title="SQL / Database" />
                    <FontAwesomeIcon icon={faLaptopCode} className={styles['tech-icon']} title="Software Development" />
                    <FontAwesomeIcon icon={faCode} className={styles['tech-icon']} title="C# / Backend Logic" />
                </div>
            </div>

            <div className={styles['intro-para']}>
                <p className={styles.paragraph}>
                   While completing my formal studies, I am actively available for freelance contracts and engineering roles. 
                   With a proven ability to bridge the gap between technical jargon and simple language, I provide transparent, 
                   high-quality development services tailored to your needs.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/services" className={styles['action-btn']}>
                        Explore My Services
                    </Link>
                    <Link href="/projects" className={styles['action-btn']} style={{ background: 'transparent', border: '2px solid var(--profile-theme)', color: 'var(--text-color)' }}>
                        View My Work
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CoverPg;
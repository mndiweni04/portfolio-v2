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
                    <h2 className={styles.prof}>Adaptive Software Developer</h2>
                    <p className={styles['bcard-para']}>
                        I specialize in cross-platform development using React and Flutter for both web and mobile 
                        environments. Recently certified in Flutter by IBM/SkillUp, I focus on building unified 
                        software ecosystems that deliver high-performance user experiences across all devices.
                    </p>
                </div>
            </div>
            
            <div className={styles['icon-pyramid']}>
                <div className={styles['icon-row']}>
                    <FontAwesomeIcon icon={faMobileAlt} className={styles['tech-icon']} title="Flutter (Web & Mobile)" />
                    <FontAwesomeIcon icon={faReact} className={styles['tech-icon']} title="React (Web & Mobile)" />
                </div>

                <div className={styles['icon-row']}>
                    <FontAwesomeIcon icon={faDatabase} className={styles['tech-icon']} title="SQL / Database" />
                    <FontAwesomeIcon icon={faLaptopCode} className={styles['tech-icon']} title="Software Development" />
                    <FontAwesomeIcon icon={faCode} className={styles['tech-icon']} title="C# / Backend Logic" />
                </div>
            </div>

            <div className={styles['intro-para']}>
                <p className={styles.paragraph}>
                   I provide transparent, high-quality development services tailored to bridge the gap between 
                   complex technical requirements and cross-platform business success.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/services" className={styles['action-btn']}>
                        Request Architecture
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
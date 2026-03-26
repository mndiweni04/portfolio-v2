'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../app/styles/aboutme.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faUserGraduate, faBriefcase, faGlobe, faRunning, faBookReader 
} from "@fortawesome/free-solid-svg-icons";

const Images = [
    '/images/prtImg1.jpg',
    '/images/prtImg2.jpg',
    '/images/prtImg3.jpg',
    '/images/prtImg4.jpg',
    '/images/prtImg5.jpg'
];

function AboutMe() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % Images.length); 
        }, 3500); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <section className="section-container">
            
            <div className="section-header animate-fade">
                <h1 className="section-title">Professional Overview</h1>
                <p className="section-subtitle">
                    I am a Full Stack Developer dedicated to building resilient and scalable software architectures. 
                    With a core engineering stack spanning React.js, Node.js, C#, and SQL, I deliver end-to-end 
                    solutions—from optimized database schemas to highly responsive frontend interfaces. My objective 
                    is to build deterministic systems that provide immediate operational value to clients and businesses.
                </p>
            </div>

            <div className={`${styles['glass-section']} animate-fade ${styles['delay-1'] || ''}`}>
                <div className={styles['section-label-row']}>
                    <div className={styles['section-icon']}>
                        <FontAwesomeIcon icon={faUserGraduate} />
                    </div>
                    <span className={styles['section-label']}>Academic Background</span>
                </div>
                
                <div className={styles['education-grid']}>
                    <div className={`${styles['edu-block']} ${styles['highlight'] || ''}`}>
                        <h3 className={styles['edu-title']}>Belgium Campus ITversity</h3>
                        <span className={styles['time-badge']}>Expected Graduation: Oct 2025</span>
                        <p className={styles['edu-desc']}>Diploma in Information Technology (Software & Web Dev)</p>
                        <ul className={styles['edu-list']}>
                            <li className={styles['edu-list-item']}><strong>Focus:</strong> Formalizing engineering fundamentals, algorithms, and networking.</li>
                            <li className={styles['edu-list-item']}><strong>Key Projects:</strong> Employee Management System (Java/SQL), Full Stack Portfolios.</li>
                        </ul>
                    </div>

                    <div className={styles['edu-block']}>
                        <h3 className={styles['edu-title']}>Edenvale High School</h3>
                        <span className={styles['time-badge']}>Jan 2018 - Dec 2022</span>
                        <p className={styles['edu-desc']}>Information Technology (Delphi)</p>
                    </div>
                </div>
            </div>

            <div className={`${styles['glass-section']} animate-fade ${styles['delay-2'] || ''}`}>
                <div className={styles['section-label-row']}>
                     <div className={styles['section-icon']}>
                        <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <span className={styles['section-label']}>Experience & Competencies</span>
                </div>

                <div className={styles['experience-content']}>
                    <div className={styles['exp-text']}>
                        <p className={styles['exp-text-para']}>
                            I have spent over a year working as a freelance web developer, interfacing directly with clients 
                            to deliver responsive, data-driven platforms. Recently, I have expanded into mobile development, 
                            dedicating the last several months to engineering proprietary IP using React Native.
                        </p>
                        <p className={styles['exp-text-para']} style={{ marginTop: '1rem' }}>
                            My experience engaging directly with diverse customers allows me to translate technical complexity into clear, actionable 
                            insights for non-technical stakeholders, ensuring project alignment at every level.
                        </p>
                    </div>
                    <div className={styles['exp-skills']}>
                        <h4 className={styles['exp-skills-title']}>Applied Experience</h4>
                        <ul className={styles['exp-skills-list']}>
                            <li className={styles['exp-skill-item']}>Freelance Web Development (1+ Years)</li>
                            <li className={styles['exp-skill-item']}>Mobile App Dev / Proprietary IP (Current Focus)</li>
                            <li className={styles['exp-skill-item']}>Stakeholder Communication & Technical Translation</li>
                            <li className={styles['exp-skill-item']}>Sales & Brand Communication (Samsung, Pep)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`${styles['split-section']} animate-fade ${styles['delay-3'] || ''}`}>
                <div className={`${styles['glass-card-bottom']} ${styles['interest-card']}`}>
                    <h3 className={styles['interest-title']}>Interests & Pursuits</h3>
                    <ul className={styles['interest-list']}>
                        <li className={styles['interest-item']}>
                            <FontAwesomeIcon icon={faGlobe} /> <span>System Architecture Studies</span>
                        </li>
                        <li className={styles['interest-item']}>
                            <FontAwesomeIcon icon={faBookReader} /> <span>Continuous Technical Learning</span>
                        </li>
                        <li className={styles['interest-item']}>
                            <FontAwesomeIcon icon={faRunning} /> <span>Athletics & Physical Training</span>
                        </li>
                    </ul>
                </div>

                <div className={`${styles['glass-card-bottom']} ${styles['carousel-card']}`}>
                    <div className={styles['img-contain']}>
                        <Image 
                            src={Images[index]} 
                            alt={`Portfolio slide ${index + 1}`} 
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
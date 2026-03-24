'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '../app/styles/aboutme.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faUserGraduate, faBriefcase, faGlobe, faRunning, faBookReader, faServer 
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
        <section className="about-container">
            
            <div className="about-header animate-fade">
                <h1>Professional Overview</h1>
                <p className="professional-summary">
                    I am a Full Stack Developer dedicated to building resilient and scalable software architectures. 
                    With a core engineering stack spanning React.js, Node.js, C#, and SQL, I deliver end-to-end 
                    solutions—from optimized database schemas to highly responsive frontend interfaces. My objective 
                    is to build deterministic systems that provide immediate operational value to clients and businesses.
                </p>
            </div>

            <div className="glass-section animate-fade delay-1">
                <div className="section-label-row">
                    <div className="section-icon">
                        <FontAwesomeIcon icon={faUserGraduate} />
                    </div>
                    <span className="section-label">Academic Background</span>
                </div>
                
                <div className="education-grid">
                    <div className="edu-block highlight">
                        <h3>Belgium Campus ITversity</h3>
                        <span className="time-badge">Expected Graduation: Oct 2025</span>
                        <p className="edu-desc">Diploma in Information Technology (Software & Web Dev)</p>
                        <ul className="edu-list">
                            <li><strong>Focus:</strong> Formalizing engineering fundamentals, algorithms, and networking.</li>
                            <li><strong>Key Projects:</strong> Employee Management System (Java/SQL), Full Stack Portfolios.</li>
                        </ul>
                    </div>

                    <div className="edu-block">
                        <h3>Edenvale High School</h3>
                        <span className="time-badge">Jan 2018 - Dec 2022</span>
                        <p className="edu-desc">Information Technology (Delphi)</p>
                    </div>
                </div>
            </div>

            <div className="glass-section animate-fade delay-2">
                <div className="section-label-row">
                     <div className="section-icon">
                        <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <span className="section-label">Experience & Competencies</span>
                </div>

                <div className="experience-content">
                    <div className="exp-text">
                        <p>
                            I have spent over a year working as a freelance web developer, interfacing directly with clients 
                            to deliver responsive, data-driven platforms. Recently, I have expanded into mobile development, 
                            dedicating the last several months to engineering proprietary IP using React Native.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            My experience engaging 
                            directly with diverse customers allows me to translate technical complexity into clear, actionable 
                            insights for non-technical stakeholders, ensuring project alignment at every level.
                        </p>
                    </div>
                    <div className="exp-skills">
                        <h4>Applied Experience</h4>
                        <ul>
                            <li>Freelance Web Development (1+ Years)</li>
                            <li>Mobile App Dev / Proprietary IP (Current Focus)</li>
                            <li>Stakeholder Communication & Technical Translation</li>
                            <li>Sales & Brand Communication (Samsung, Pep)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="split-section animate-fade delay-3">
                <div className="glass-card-bottom interest-card">
                    <h3>Interests & Pursuits</h3>
                    <ul className="interest-list">
                        <li>
                            <FontAwesomeIcon icon={faGlobe} /> <span>System Architecture Studies</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBookReader} /> <span>Continuous Technical Learning</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faRunning} /> <span>Athletics & Physical Training</span>
                        </li>
                    </ul>
                </div>

                <div className="glass-card-bottom carousel-card">
                    <div className="ImgContain">
                        <Image 
                            src={Images[index]} 
                            alt={`Portfolio slide ${index + 1}`} 
                            className="abt-img-large"
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
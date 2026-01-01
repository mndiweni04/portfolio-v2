'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '../app/styles/aboutme.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faUserGraduate, faBriefcase, faGlobe, faRunning, faBookReader 
} from "@fortawesome/free-solid-svg-icons";

// Reusing existing images array
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
            
            {/* SECTION 1: Professional Summary */}
            <div className="about-header animate-fade">
                <h1>About Me</h1>
                <p className="professional-summary">
                    I am a Full Stack Developer and recent Software & Web Development graduate committed to building 
                    robust, scalable applications. With a core stack spanning React.js, Node.js, C#, and SQL, I bridge 
                    the gap between complex backend logic and responsive frontend design. My approach is defined by 
                    a professional mindset—constantly learning, solving real-world problems, and striving for 
                    efficiency in every line of code I write.
                </p>
            </div>

            {/* SECTION 2: Education */}
            <div className="glass-section animate-fade delay-1">
                <div className="section-label-row">
                    {/* Icon alignment handled by CSS */}
                    <div className="section-icon">
                        <FontAwesomeIcon icon={faUserGraduate} />
                    </div>
                    <span className="section-label">Education</span>
                </div>
                
                <div className="education-grid">
                    {/* High School */}
                    <div className="edu-block">
                        <h3>Edenvale High School</h3>
                        <span className="time-badge">Jan 2018 - Dec 2022</span>
                        <p className="edu-desc">Information Technology (Delphi)</p>
                        <p className="edu-sub">Leadership: Prefect, Head of Athletics (2022)</p>
                    </div>

                    {/* University */}
                    <div className="edu-block highlight">
                        <h3>Belgium Campus ITversity</h3>
                        <span className="time-badge">Feb 2023 - Oct 2025</span>
                        <p className="edu-desc">Diploma in Information Technology (Software & Web Dev)</p>
                        <ul className="edu-list">
                            <li><strong>Core Modules:</strong> Software Dev, Web Dev, Database Management, Networking.</li>
                            <li><strong>Key Projects:</strong> Employee Management System (Java/SQL), Portfolio (React), Calendar App (C#).</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SECTION 3: Industry & Work Experience */}
            <div className="glass-section animate-fade delay-2">
                <div className="section-label-row">
                     <div className="section-icon">
                        <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <span className="section-label">Industry Experience</span>
                </div>

                <div className="experience-content">
                    <div className="exp-text">
                        <p>
                            My background in sales and brand ambassadorship (Samsung, Pep) has equipped me with a unique 
                            perspective on software development. I understand that code must ultimately serve business needs 
                            and end-users. My experience engaging directly with diverse customers allows me to translate 
                            technical complexity into clear, actionable insights for non-technical stakeholders.
                        </p>
                    </div>
                    <div className="exp-skills">
                        <h4>Transferable Skills</h4>
                        <ul>
                            <li>Effective Communication & Negotiation</li>
                            <li>Technical Explanation for Non-Tech Users</li>
                            <li>Team Collaboration & Adaptability</li>
                            <li>Client Interaction & Problem Solving</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SECTION 4: Interests + Visual Identity */}
            <div className="split-section animate-fade delay-3">
                
                {/* Left: Interests */}
                <div className="glass-card-bottom interest-card">
                    <h3>Interests</h3>
                    <ul className="interest-list">
                        <li>
                            <FontAwesomeIcon icon={faGlobe} /> <span>Travelling</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBookReader} /> <span>Self-Learning</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faRunning} /> <span>Athletics</span>
                        </li>
                    </ul>
                </div>

                {/* Right: Carousel */}
                <div className="glass-card-bottom carousel-card">
                    <div className="ImgContain">
                        <Image 
                            src={Images[index]} 
                            alt={`Portfolio slide ${index + 1}`} 
                            className="abt-img-large"
                            width={500}
                            height={667} /* Aspect ratio 3:4 approx */
                            priority={index === 0}
                        />
                    </div>
                </div>

            </div>

        </section>
    );
}

export default AboutMe;
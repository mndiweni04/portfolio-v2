'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faInfoCircle, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../app/styles/projects.module.css';

const flagshipProjects = [
    {
        id: 'f1',
        title: "Portfolio V1",
        date: "Mar 2025",
        shortDesc: "A concise and engaging personal portfolio developed as an initial React prototype. This SPA provided the digital footprint for my early academic and freelance work.",
        techStack: ["React", "CSS Modules", "Netlify"],
        githubLink: "https://github.com/mndiweni04/My-Portfolio",
        liveLink: "https://nimble-muffin-e80dc.netlify.app/",
        problem: "The initial requirement was to engineer a digital portfolio to showcase foundational capabilities. The challenge was delivering an interactive, mobile-friendly SPA with a functional contact service while maintaining a professional look.",
        solution: "I built a Single-Page Application (SPA) using React.js for fast rendering and smooth navigation. Key elements included hover feedback, image carousels, and a Contact page using Email.js.",
        journey: "Managing state, handling multiple iterations in carousels, and coordinating animations strengthened my understanding of SPA architecture and interactive UI design.",
        reflections: "<ul><li>SPAs are fast but can feel restrictive if content is too long.</li><li>Client-side React apps may face discoverability issues with certain automated systems.</li></ul>"
    },
    {
        id: 'f2', 
        title: "Portfolio V3 (Professional Transition)",
        date: "Mar 2026",
        shortDesc: "A large-scale expansion (Portfolio-V3) of my digital infrastructure. This version transitions from a student-centric portfolio to a professional consultancy platform featuring productized services and advanced project intake specifications.",
        techStack: ["Next.js", "React", "Netlify", "CSS Modules"],
        githubLink: "https://github.com/mndiweni04/portfolio-v2", 
        liveLink: "#",
        problem: "The previous iteration (V2) served as a solid academic portfolio but lacked the structural logic to operate as a technical consultancy. It did not distinguish between general networking and client service requests, and its narrative focused on 'internships' rather than 'solutions delivery'.",
        solution: "I engineered a major system expansion on a dedicated branch (v3-professional-transition). Key enhancements include:<ul><li><b>Productized Services</b> — Introduced a multi-tier service model (Frontend, Full-Stack, Consultation) to clarify technical value.</li><li><b>Dynamic Intake Architecture</b> — Upgraded the Contact module with conditional logic for project specifications.</li><li><b>Professional Narrative</b> — Realigned the copy to reflect 1+ years of freelance web experience and proprietary mobile development (React Native).</li><li><b>UI/UX Standardization</b> — Corrected architectural spacing and fixed cross-browser styling regressions.</li></ul>",
        journey: "This transition involved refactoring the brand identity and the information architecture simultaneously. The main challenge was balancing an honest academic status with a professional service offering while ensuring a non-forced 'opt-in' user experience.",
        reflections: "<ul><li>Portfolio-V3 proves that a personal site can scale into a lead-generation tool without losing its personal identity.</li><li>Architecture should always prioritize the user's choice to either 'network' or 'inquire'.</li></ul>"
    },
    {
        id: 'f3',
        title: "Anti-Sleep IoT Glasses",
        date: "September 2025",
        shortDesc: "A real-time driver drowsiness detection system using IR sensors and a lightweight ML model. I engineered the ML logic and managed WebSocket telemetry pipelines.",
        techStack: ["C++", "Python", "ESP32", "IoT"],
        githubLink: "#",
        liveLink: "#",
        problem: "The engineering objective was to develop an AI-enhanced Anti-Sleep Glasses system capable of detecting driver fatigue in real time using edge computing constraints.",
        solution: "We engineered a complete hardware-software system using an ESP32-C3 and a Hidden Markov Model (HMM) for low-latency drowsiness detection based on sensor telemetry.",
        journey: "The main engineering challenge was coordinating the hardware-software handshake and managing continuous real-time data flow without buffer overflows on the microcontroller.",
        reflections: "<ul><li>Simplicity over complexity: Lightweight models like HMMs are superior for edge hardware.</li><li>Clear problem understanding enables efficient architectural planning.</li></ul>"
    },
];

const experimentProjects = [
    {
        id: 'e1',
        title: "Interactive CV Website",
        date: "April 2025",
        shortDesc: "An early responsive CV featuring a split-layout design and CSS animations for skill visualization.",
        techStack: ["HTML5", "CSS3", "FontAwesome"],
        githubLink: "https://github.com/mndiweni04/MNdiweniCV",
        liveLink: "https://mndiweni04.github.io/MNdiweniCV/"
    },
    {
        id: 'e2',
        title: "Java Calculator",
        date: "May 2025",
        shortDesc: "A GUI-based calculator focused on clean event handling and state management.",
        techStack: ["Java", "AWT/Swing"],
        githubLink: "https://github.com/mndiweni04/My-Calculator"
    },
    {
        id: 'e3',
        title: "Calendar App (WinForms)",
        date: "May 2025",
        shortDesc: "A Windows application rendering monthly grids based on user input using 2D matrix logic.",
        techStack: ["C#", "Windows Forms", ".NET Framework"],
        githubLink: "https://github.com/mndiweni04/Array-Manipulation/tree/main/Calendar%20App"
    },
    {
        id: 'e4',
        title: "3D Array TimeTable App",
        date: "May 2025",
        shortDesc: "A resource scheduling tool using 3D arrays to organize departmental timetables.",
        techStack: ["C#", "Windows Forms", "Data Structures"],
        githubLink: "https://github.com/mndiweni04/Array-Manipulation/tree/main/3D%20Array%20TimeTable%20App"
    },
    {
        id: 'e5',
        title: "CLI 2D Calendar",
        date: "May 2025",
        shortDesc: "A utility calculating positional placement for text-based calendar rendering.",
        techStack: ["C#", ".NET Console", "StringBuilder"],
        githubLink: "https://github.com/mndiweni04/Array-Manipulation/tree/main/2D%20Calendar"
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedProject]);

    return (
        <section className="section-container" id="projects">
            
            <div className="section-header animate-fade">
                <h1 className="section-title">Selected Works</h1>
                <p className="section-subtitle">Engineering robust systems & exploring new technologies.</p>
            </div>

            <div className={`animate-fade ${styles['tier-section']} ${styles['delay-1'] || ''}`}>
                <h2 className={styles['tier-title']}>Flagship Work</h2>
                
                <div className={styles['carousel-wrapper']}>
                    <button className={`${styles['custom-nav-btn']} ${styles['prev-flag']}`}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className={`${styles['custom-nav-btn']} ${styles['next-flag']}`}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: `.${styles['prev-flag']}`,
                            nextEl: `.${styles['next-flag']}`,
                        }}
                        spaceBetween={40}
                        slidesPerView={1}
                        className={styles['swiper-container']}
                    >
                        {flagshipProjects.map((project) => (
                            <SwiperSlide key={project.id}>
                                <div className={`${styles['glass-card']} ${styles['flagship-card']}`}>
                                    <div className={styles['card-header']}>
                                        <div className={styles['header-top']}>
                                            <h3>{project.title}</h3>
                                            <span className={styles['project-date']}>{project.date}</span>
                                        </div>
                                        <div className={styles['tech-row']}>
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className={styles['tech-pill']}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles['card-body']}>
                                        <p className={styles['card-desc']}>{project.shortDesc}</p>
                                    </div>

                                    <div className={styles['card-footer']}>
                                        <div className={styles['links-group']}>
                                            <a href={project.githubLink} target="_blank" rel="noreferrer" className={styles['btn-glass']}>
                                                <FontAwesomeIcon icon={faGithub} /> Code
                                            </a>
                                            {project.liveLink !== "#" && (
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" className={styles['btn-glass']}>
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Demo
                                                </a>
                                            )}
                                        </div>
                                        <button onClick={() => setSelectedProject(project)} className={styles['btn-action']}>
                                            View Case Study <FontAwesomeIcon icon={faInfoCircle} />
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div className={`animate-fade ${styles['tier-section']} ${styles['delay-2'] || ''}`}>
                <h2 className={styles['tier-title']}>Experiments & Academic Implementations</h2>
                
                <div className={styles['carousel-wrapper']}>
                    <button className={`${styles['custom-nav-btn']} ${styles['prev-exp']}`}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className={`${styles['custom-nav-btn']} ${styles['next-exp']}`}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: `.${styles['prev-exp']}`,
                            nextEl: `.${styles['next-exp']}`,
                        }}
                        spaceBetween={30}
                        slidesPerView={1}
                        className={styles['swiper-container']}
                    >
                        {experimentProjects.map((project) => (
                        <SwiperSlide key={project.id}>
                                <div className={`${styles['glass-card']} ${styles['experiment-card']}`}>
                                    <div className={styles['exp-left']}>
                                        <h3>{project.title}</h3>
                                        <span className={styles['exp-date']}>{project.date}</span>
                                    </div>
                                    
                                    <div className={styles['exp-center']}>
                                        <p>{project.shortDesc}</p>
                                        <div className={`${styles['tech-row']} ${styles['mini']}`}>
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className={styles['tech-pill-sm']}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles['exp-right']}>
                                        <a href={project.githubLink} target="_blank" rel="noreferrer" className={styles['btn-icon-only']} title="View Code">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </a>
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className={styles['btn-icon-only']} title="Live Demo">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {selectedProject && (
                <div className={styles['overlay-backdrop']} onClick={() => setSelectedProject(null)}>
                    <div className={`${styles['overlay-panel']} ${styles['a4-glass']}`} onClick={(e) => e.stopPropagation()}>
                        
                        <button className={styles['close-floating']} onClick={() => setSelectedProject(null)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        <div className={styles['overlay-content']}>
                            <div className={styles['ov-header']}>
                                <h2>{selectedProject.title}</h2>
                                <span className={styles['ov-date']}>{selectedProject.date}</span>
                            </div>

                            <div className={styles['ov-tech']}>
                                {selectedProject.techStack.map((tech, i) => (
                                    <span key={i} className={styles['tech-pill-dark']}>{tech}</span>
                                ))}
                            </div>

                            <hr className={styles['glass-divider']} />

                            <section className={styles['ov-section']}>
                                <h4>System Objective</h4>
                                <p>{selectedProject.problem}</p>
                            </section>

                            <section className={styles['ov-section']}>
                                <h4>Architectural Solution</h4>
                                <div dangerouslySetInnerHTML={{ __html: selectedProject.solution }} />
                            </section>

                            <section className={styles['ov-section']}>
                                <h4>Implementation Journey</h4>
                                <p>{selectedProject.journey}</p>
                            </section>

                            <section className={`${styles['ov-section']} ${styles['highlight-box']}`}>
                                <h4>Technical Reflections</h4>
                                <div 
                                    style={{ fontStyle: 'italic' }}
                                    dangerouslySetInnerHTML={{ __html: selectedProject.reflections }} 
                                />
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
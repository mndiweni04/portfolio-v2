/* src/components/projects.js */
'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faInfoCircle, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';
import '../app/styles/projects.css';

// --- DATA: Flagship Work (Text-Only, Detailed) ---
const flagshipProjects = [
    {
        id: 'f1',
        title: "Employee Management System",
        date: "Oct 2024",
        shortDesc: "A secure, desktop-based workforce management solution featuring Role-Based Access Control and encrypted data persistence.",
        techStack: ["Java", "Swing", "PostgreSQL", "Bcrypt"],
        githubLink: "https://github.com/mndiweni04/PRG361-EmployeeApp",
        liveLink: "#",
        // Case Study Details
        problem: "Manual spreadsheet tracking resulted in data duplication, lack of audit trails, and security vulnerabilities regarding sensitive employee information.",
        solution: "Engineered a centralized desktop CRUD application implementing strict OOP principles. Integrated PostgreSQL for relational data integrity and Java Swing for a native, responsive UI.",
        journey: "The primary challenge was decoupling the UI from the database logic. I implemented a repository pattern to ensure the frontend code remained agnostic of the SQL queries.",
        reflections: "This project solidified my understanding of database normalization (3NF) and the importance of sanitizing inputs to prevent SQL injection."
    },
    {
        id: 'f2',
        title: "Portfolio V2",
        date: "Jan 2025",
        shortDesc: "A high-performance digital identity built on the Next.js App Router, featuring a custom-built liquid glass design system.",
        techStack: ["Next.js 14", "React", "CSS Modules", "Netlify"],
        githubLink: "https://github.com/mndiweni04/My-Portfolio",
        liveLink: "https://mandla-ndiweni-portfolio.netlify.app/",
        // Case Study Details
        problem: "Standard portfolio templates lacked the unique 'glassmorphism' aesthetic I wanted and suffered from poor SEO performance.",
        solution: "Developed a custom design system using CSS variables for consistent glass effects. Migrated to Next.js to leverage server-side rendering and improved core web vitals.",
        journey: "I spent significant time refining the CSS backdrop-filters to ensure compatibility across Safari and Chrome. The animation logic required complex state management for the overlay systems.",
        reflections: "Mastering the Next.js App Router and client/server boundary was a key takeaway, along with advanced CSS layout techniques."
    },
    {
        id: 'f3',
        title: "Smart Scheduler",
        date: "Aug 2024",
        shortDesc: "An algorithmic scheduling tool that detects conflict overlaps in complex timetables and suggests optimal slot allocation.",
        techStack: ["C#", ".NET", "WinForms", "MSSQL"],
        githubLink: "https://github.com/mndiweni04/Array-Manipulation",
        liveLink: "#",
        // Case Study Details
        problem: "Students and faculty struggled to manually identify overlapping classes, leading to double-booking and administrative chaos.",
        solution: "Built a visual grid system in C# that parses time arrays to automatically flag conflicts. The UI updates in real-time as slots are dragged and dropped.",
        journey: "Logic intensity was high. I had to write efficient algorithms to compare start/end times across multiple multidimensional arrays without causing UI lag.",
        reflections: "This project sharpened my logic building skills and taught me how to handle complex event-driven programming in a stateful desktop environment."
    }
];

// --- DATA: Experiments (Lighter) ---
const experimentProjects = [
    {
        id: 'e1',
        title: "Java Calculator",
        date: "June 2023",
        shortDesc: "A GUI-based calculator handling standard arithmetic with a focus on clean event handling.",
        techStack: ["Java", "AWT/Swing"],
        githubLink: "https://github.com/mndiweni04/My-Calculator"
    },
    {
        id: 'e2',
        title: "Weather Hook",
        date: "Sep 2023",
        shortDesc: "A React experiment to practice fetching asynchronous data from public APIs.",
        techStack: ["React", "Rest API"],
        githubLink: "#"
    },
    {
        id: 'e3',
        title: "CLI Task Manager",
        date: "May 2023",
        shortDesc: "A Node.js terminal utility to practice file system operations and JSON parsing.",
        techStack: ["Node.js", "FS Module"],
        githubLink: "#"
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedProject]);

    return (
        <section className="projects-page-container" id="projects">
            
            <div className="projects-header animate-fade">
                <h1>Selected Works</h1>
                <p>Engineering robust systems & exploring new technologies.</p>
            </div>

            {/* --- TIER 1: FLAGSHIP WORK --- */}
            <div className="tier-section animate-fade delay-1">
                <h2 className="tier-title">Flagship Work</h2>
                
                <div className="carousel-wrapper">
                    {/* Custom Nav Buttons - Flagship */}
                    <button className="custom-nav-btn prev-flag">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="custom-nav-btn next-flag">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.prev-flag',
                            nextEl: '.next-flag',
                        }}
                        spaceBetween={40}
                        slidesPerView={1}
                        className="swiper-container"
                    >
                        {flagshipProjects.map((project) => (
                            <SwiperSlide key={project.id}>
                                <div className="glass-card flagship-card">
                                    <div className="card-header">
                                        <div className="header-top">
                                            <h3>{project.title}</h3>
                                            <span className="project-date">{project.date}</span>
                                        </div>
                                        <div className="tech-row">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="tech-pill">{tech}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <p className="card-desc">{project.shortDesc}</p>
                                    </div>

                                    <div className="card-footer">
                                        <div className="links-group">
                                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-glass">
                                                <FontAwesomeIcon icon={faGithub} /> Code
                                            </a>
                                            {project.liveLink !== "#" && (
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-glass">
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Demo
                                                </a>
                                            )}
                                        </div>
                                        <button onClick={() => setSelectedProject(project)} className="btn-action">
                                            View Case Study <FontAwesomeIcon icon={faInfoCircle} />
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* --- TIER 2: EXPERIMENTS & PRACTICE --- */}
            <div className="tier-section animate-fade delay-2">
                <h2 className="tier-title">Experiments & Practice</h2>
                
                <div className="carousel-wrapper">
                    {/* Custom Nav Buttons - Experiments */}
                    <button className="custom-nav-btn prev-exp">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="custom-nav-btn next-exp">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.prev-exp',
                            nextEl: '.next-exp',
                        }}
                        spaceBetween={30}
                        slidesPerView={1}
                        className="swiper-container"
                    >
                        {experimentProjects.map((project) => (
                            <SwiperSlide key={project.id}>
                                <div className="glass-card experiment-card">
                                    <div className="exp-left">
                                        <h3>{project.title}</h3>
                                        <span className="exp-date">{project.date}</span>
                                    </div>
                                    
                                    <div className="exp-center">
                                        <p>{project.shortDesc}</p>
                                        <div className="tech-row mini">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="tech-pill-sm">{tech}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="exp-right">
                                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-icon-only" title="View Code">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* --- OVERLAY: A4 CASE STUDY --- */}
            {selectedProject && (
                <div className="overlay-backdrop" onClick={() => setSelectedProject(null)}>
                    <div className="overlay-panel a4-glass" onClick={(e) => e.stopPropagation()}>
                        
                        <button className="close-floating" onClick={() => setSelectedProject(null)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        <div className="overlay-content">
                            <div className="ov-header">
                                <h2>{selectedProject.title}</h2>
                                <span className="ov-date">{selectedProject.date}</span>
                            </div>

                            <div className="ov-tech">
                                {selectedProject.techStack.map((tech, i) => (
                                    <span key={i} className="tech-pill-dark">{tech}</span>
                                ))}
                            </div>

                            <hr className="glass-divider" />

                            <section className="ov-section">
                                <h4>The Problem</h4>
                                <p>{selectedProject.problem}</p>
                            </section>

                            <section className="ov-section">
                                <h4>The Solution</h4>
                                <p>{selectedProject.solution}</p>
                            </section>

                            <section className="ov-section">
                                <h4>The Journey</h4>
                                <p>{selectedProject.journey}</p>
                            </section>

                            <section className="ov-section highlight-box">
                                <h4>Reflections & Lessons</h4>
                                <p><em>{selectedProject.reflections}</em></p>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
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

const flagshipProjects = [
    {
        id: 'f1',
        title: "Portfolio V1",
        date: "Mar 2025",
        shortDesc: "A concise and engaging personal portfolio created for a college project. This portfolio is designed to give the "+
                   "viewer a quick overview of who I am by showcasing my skills, interests, and background. It is a single-page application"+
                   " built with React.js and features interactive animations, including subtle zoom effects and colour changes on hover.",
        techStack: ["React", "CSS Modules", "Netlify"],
        githubLink: "https://github.com/mndiweni04/My-Portfolio",
        liveLink: "https://nimble-muffin-e80dc.netlify.app/",
        problem: "For my college project, I was tasked with creating a digital portfolio to showcase my skills, interests, and background."+
                 " The portfolio had to be interactive, mobile-friendly, render quickly, include a working contact service, and consist "+
                 "of Home, About, Projects, Tech Stack, and Contact pages. The challenge was delivering all these features while maintaining"+
                 " a clean, professional look.",
        solution: "I built a Single-Page Application (SPA) using React.js for fast rendering and smooth navigation via a fixed navbar. "+
                  "Key interactive elements included: "+
                  "<ul><li>Hover effects on buttons for subtle feedback</li>"+
                  "<li>Automatic image carousel on the About Me page</li>"+
                  "<li>Clickable project carousel with GitHub and live demo links</li>"+
                  "<li>Dev Tools animations to visually represent skills</li>"+
                  "<li>A functional Contact page using Email.js</li></ul> "+
                  "This approach ensured interactivity, usability, and a professional presentation of my abilities, while demonstrating"+
                  " React fundamentals like component composition, state management, and array handling.",
        journey: "Most of the work involved refining layouts and exploring CSS techniques, combined with building reusable React "+
                 "components. Managing state, handling multiple iterations in carousels, and coordinating animations strengthened "+
                 "my understanding of SPA architecture and interactive UI design.",
        reflections: "<ul><li>SPAs are fast but can feel restrictive if content is too long.</li><li>Visual indicators like "+
                      "percentages don’t fully convey skill.</li><li>Portfolio tone and naming must be professional to make a "+
                      "strong impression.</li><li>Client-side React apps may not be indexed by recruiter bots, so discoverability"+
                      " can be an issue.</li></ul> I improved my React skills, CSS design, and ability to create interactive, "+
                      "user-friendly interfaces."
    },
    {
        id: 'f2', 
        title: "Portfolio V2",
        date: "Jan 2026",
        shortDesc: "A professionally structured, multi-page portfolio built with Next.js to replace a casual SPA. Designed for recruiters and ATS systems, it features a glass-inspired UI, clear project case studies, a refined tech stack presentation, and full accessibility through server-rendered pages and a modern theme toggle.",
        techStack: ["Next.js", "React", "Netlify", "CSS Modules"],
        githubLink: "https://github.com/mndiweni04/portfolio-v2",
        liveLink: "#",
        problem: "My original portfolio (Version 1) was built as a React single-page application. While it was visually engaging, it was too informal, limited in content, and not easily rendered by bots and ATS platforms that do not execute JavaScript. This meant that important information about my skills, projects, and experience could be missed by recruiter systems. The site also lacked structure, a theme toggle, and a professional tone, making it feel more like a student exercise than a serious entry-level developer portfolio.",
        solution: "I rebuilt the portfolio using Next.js, leveraging its pre-rendering and multi-page architecture to ensure the site could be reliably rendered by bots, ATS platforms, and search engines. I introduced a glass-inspired UI using transparent containers, background blur, and subtle shimmer effects to create a modern but professional visual identity.<br><br>"+
                  "A floating light/dark theme toggle was added to improve readability and accessibility, allowing users to choose a viewing mode that best suits their environment and visual comfort.<br><br>"+
                  "The site was redesigned into clearly structured pages:<ul>"+
                  "<li><b>Home</b> — Introduces my career goal (securing an internship), core tech stack, and tertiary education in a clear, focused layout.</li>"+
                  "<li><b>About Me</b> — Provides a concise professional profile, alongside blocks for education, industry experience, and personal interests.</li>"+
                  "<li><b>Projects</b> — Split into Flagship Work and Experiments & Practice, separating major case-study projects from smaller learning projects for clarity and better storytelling.</li>"+
                  "<li><b>Tech Stack</b> — Replaces misleading skill percentages with structured technology groups: Core Technologies and Full Technical Ecosystem, giving a more honest and professional overview.</li>"+
                  "<li><b>Contact Me</b> — Retains EmailJS functionality while adopting the same glass UI for consistency.</li></ul>"+
                  "The portfolio was deployed on Netlify, making it publicly accessible, fast, and production-ready.",
        journey: "This upgrade ran from December 23, 2025 to January 3, 2026. I converted my React SPA into a Next.js multi-page application, which took only a few hours to learn due to its familiarity with React. I spent two days designing the layouts in Figma, then implemented roughly one page per day. The main challenges were understanding Next.js directory structure and maintaining a consistent theme toggle across pages, but the overall transition was smooth and efficient.",
        reflections: "<ul><li>With more upfront planning, the project could have been completed even faster.</li>"+
                     "<li>More importantly, I learned that multi-page, pre-rendered applications are far more suitable for professional portfolios than SPAs, especially when targeting recruiters and ATS platforms.</li>"+
                     "<li>Next.js proved to be a significant upgrade over React for content-driven, discoverable websites, offering better structure, scalability, and visibility.</li></ul>"
    },
    {
        id: 'f3',
        title: "Anti-Sleep IoT Glasses",
        date: "September 2025",
        shortDesc: "A real-time driver drowsiness detection system using IR sensors, gyroscopes, and a simple ML model. I built the ML, managed WebSocket connections, and integrated hardware with the dashboard, showcasing practical IoT development and problem-solving.",
        techStack: ["C++", "Python", "ESP32", "IoT"],
        githubLink: "#",
        liveLink: "#",
        problem: "Drowsy driving is a major cause of road accidents, resulting in fatalities and property damage. Our project aimed to develop an AI-enhanced Anti-Sleep Glasses system capable of detecting driver fatigue in real time. The glasses needed to monitor eye blinks and head movements using infrared sensors and inertial data, and trigger alerts through a connected dashboard. The challenge was to design a system that was accurate, reliable, and functional, while integrating hardware, software, and real-time data processing within a short development timeline.",
        solution: "We built a complete hardware-software system: "+
                  "<ul><li><b>Hardware:</b> ESP32-C3 development board, IR LEDs and photodiodes, accelerometer and gyroscope (MPU6050), buzzer/vibration motor, battery packs, wiring supplies, and 3D-printed casing.</li>"+
                  "<li><b>Software:</b> C++ for the hardware, Python for the dashboard and service, and WebSockets for real-time data communication.</li>"+
                  "<li><b>Team responsibilities:</b> I focused on the ML model, using a Hidden Markov Model (HMM) to detect drowsiness with simple calculations based on baseline comparison of inertial and sensor data. I also handled the connection between the dashboard and the service, ensuring real-time data flow.</li></ul>"+
                  "This solution delivered a functional prototype capable of monitoring the driver’s state and providing immediate alerts, demonstrating our ability to integrate hardware and software in a cohesive system.",
        journey: "The project spanned two months. Weeks 1–3 focused on role assignment and familiarization with C++ for microcontrollers and PlatformIO. "+
                 "During hardware integration, I realized our initial LSTM/CNN model plan was overly complex for the ESP32. I pivoted to a lightweight Hidden Markov Model (HMM) and redefined the BLE setup for reliability. "+
                 "After these adjustments, the glasses successfully transmitted real-time data to the dashboard. The main challenge was coordinating the hardware-software handshake and managing real-time data flow.",
        reflections: "<ul><li><b>Clear problem understanding</b> enables effective planning and efficient implementation.</li>"+
                     "<li><b>Simplicity over complexity:</b> Overcomplicated solutions waste time and lower team morale; lightweight, practical approaches are often more effective.</li>"+
                     "<li><b>Team dynamics matter:</b> Clear role assignments and addressing gaps in capability are critical to project success.</li>"+
                     "<li><b>Technical growth:</b> Strengthened skills in ML modeling, real-time WebSocket communication, hardware-software integration, and sensor data processing.</li>"+
                     "<li><b>Professional insight:</b> Delivering a fully functional prototype within constraints emphasizes the importance of balancing ambition with practicality in technical projects.</li></ul>"
    },
];

const experimentProjects = [
    {
        id: 'e1',
        title: "Interactive CV Website",
        date: "April 2025",
        shortDesc: "My very first Personal Portfolio, a responsive, single-page personal portfolio featuring a split-layout design, CSS animations for skill visualization, and mobile compatibility.",
        techStack: ["HTML5", "CSS3", "FontAwesome"],
        githubLink: "https://github.com/mndiweni04/MNdiweniCV",
        liveLink: "https://mndiweni04.github.io/MNdiweniCV/"
    },
    {
        id: 'e2',
        title: "Java Calculator",
        date: "May 2025",
        shortDesc: "A GUI-based calculator handling standard arithmetic with a focus on clean event handling.",
        techStack: ["Java", "AWT/Swing"],
        githubLink: "https://github.com/mndiweni04/My-Calculator"
    },
    {
        id: 'e3',
        title: "Calendar App (WinForms)",
        date: "May 2025",
        shortDesc: "A Windows Forms application that dynamically generates and renders a monthly calendar grid based on user input using 2D array logic.",
        techStack: ["C#", "Windows Forms", ".NET Framework"],
        githubLink: "https://github.com/mndiweni04/Array-Manipulation/tree/main/Calendar%20App"
    },
    {
        id: 'e4',
        title: "3D Array TimeTable App",
        date: "May 2025",
        shortDesc: "A schedule management tool utilizing a 3D array structure to organize school timetables across multiple grades, days, and periods with search functionality.",
        techStack: ["C#", "Windows Forms", "Data Structures"],
        githubLink: "https://github.com/mndiweni04/Array-Manipulation/tree/main/3D%20Array%20TimeTable%20App"
    },
    {
        id: 'e5',
        title: "CLI 2D Calendar",
        date: "May 2025",
        shortDesc: "A command-line interface utility that calculates day placement and renders a formatted text-based calendar for any given month and year.",
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
        <section className="projects-page-container" id="projects">
            
            <div className="projects-header animate-fade">
                <h1>Selected Works</h1>
                <p>Engineering robust systems & exploring new technologies.</p>
            </div>

            <div className="tier-section animate-fade delay-1">
                <h2 className="tier-title">Flagship Work</h2>
                
                <div className="carousel-wrapper">
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

            <div className="tier-section animate-fade delay-2">
                <h2 className="tier-title">Experiments & Practice</h2>
                
                <div className="carousel-wrapper">
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
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-icon-only" title="Live Demo">
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
                                <div dangerouslySetInnerHTML={{ __html: selectedProject.solution }} />
                            </section>

                            <section className="ov-section">
                                <h4>The Journey</h4>
                                <p>{selectedProject.journey}</p>
                            </section>

                            <section className="ov-section highlight-box">
                                <h4>Reflections & Lessons</h4>
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

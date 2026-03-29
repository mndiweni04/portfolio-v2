'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faInfoCircle, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { flagshipProjects, experimentProjects } from '../data/projectsData';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../app/styles/projects.module.css';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('overlay-active');
        } else {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('overlay-active');
        }
        return () => { 
            document.body.style.overflow = 'auto'; 
            document.body.classList.remove('overlay-active');
        };
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
                    <button className={`${styles['custom-nav-btn']} ${styles['prev-flag']}`} aria-label="Previous project">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className={`${styles['custom-nav-btn']} ${styles['next-flag']}`} aria-label="Next project">
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
                    <button className={`${styles['custom-nav-btn']} ${styles['prev-exp']}`} aria-label="Previous experiment">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className={`${styles['custom-nav-btn']} ${styles['next-exp']}`} aria-label="Next experiment">
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
                        
                        <button className={styles['close-floating']} onClick={() => setSelectedProject(null)} aria-label="Close modal">
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
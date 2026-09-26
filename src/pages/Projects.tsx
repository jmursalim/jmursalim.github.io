import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import speedotest1 from '../assets/speedotest1.mp4';
import speedotest2 from '../assets/speedotest2.mp4';
import alignedgraphcleaned from '../assets/alignedgraphcleaned.png';
import img6592 from '../assets/IMG_6592.jpg';
import img6593 from '../assets/IMG_6593.jpg';
import fsmCombo from '../assets/fsmCombo.jpg';
import img0442 from '../assets/IMG_0442.jpg';
import trongame from '../assets/trongame.mp4';

export interface MediaItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string;
    caption?: string;
}

export interface ProjectSection {
    subheading?: string;
    text?: string | string[];
    media?: MediaItem | MediaItem[];
    mediaPosition?: 'before' | 'after';
    caption?: string;
}

export interface Project {
    id: number;
    title: string;
    date: string;
    shortDesc: string;
    fullDesc?: string;
    sections?: ProjectSection[];
    tags: string[];
    media?: MediaItem[];
    links?: { label: string; url: string }[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "MOVIE RECOMMENDATION ENGINE",
        date: "SUMMER 2025",
        shortDesc: "PERSONAL PROJECT",
        fullDesc: "Developed a movie recommendation engine using Python. Utilized the TMDB API to retrieve movie information then optimized the large dataset for real-time response. Applied machine learning algorithms to simulate hybrid-filtered recommendations while using a content-based filtering approach. Hosted the application on a server and allowed users to access it through a Discord bot.",
        tags: ["Software", "Python", "Data Analysis", "Machine Learning"],
        links: [
            { label: "View on GitHub", url: "https://github.com/jmursalim/la_casa_lobot" }
        ]
    },
    {
        id: 2,
        title: "BARE METAL TRON GAME",
        date: "FALL 2025",
        shortDesc: "UBC CPEN 211",
        fullDesc: "Created a Tron game using bare metal C and Assembly. Implemented a VGA display and DE-10 Lite FPGA board to control the game.",
        tags: ["Hardware", "C", "Assembly", "RISC-V", "DE-10 Lite", "FPGA"],
        media: [
            {
                type: 'video',
                src: trongame,
                poster: ''
            }
        ]
    },
    {
        id: 3,
        title: "KEYPAD AND COMBO LOCK",
        date: "FALL 2025",
        shortDesc: "UBC CPEN 211",
        fullDesc: "Created a synthesizable keypad and combo lock using SystemVerilog. Allowed for a 6 digit password to be set and changed. Implemented sequential logic design and state machines to handle the different states of the lock. Utilized DE-10 Lite FPGA to implement the design.",
        tags: ["Hardware", "SystemVerilog", "Sequential Logic Design", "DE-10 Lite", "FPGA"],
        media: [
            {
                type: 'image',
                src: img6592,
                alt: 'Keypad and Combo Lock'
            },
            {
                type: 'image',
                src: img6593,
                alt: 'Keypad and Combo Lock'
            },
            {
                type: 'image',
                src: fsmCombo,
                alt: 'FSM Diagram'
            },
            {
                type: 'image',
                src: img0442,
                alt: 'FSM Diagram'
            }
        ]
    },
    {
        id: 4,
        title: "NOTIFLOW",
        date: "FALL 2025",
        shortDesc: "UBC CPEN 221",
        fullDesc: "Developed a Chrome Extension with a team of computer engineering students to provide a more efficient way for UBC students to manage their school calendars. Used Canvas LMS API to retrieve course information and displayed it in a user-friendly interface. Developed a Python backend to handle API requests, data processing, and generating calendars for exporting. Implemented a user-friendly interface with a clean and modern design.",
        tags: ["Software", "Python", "Flask", "HTML", "CSS", "JS", "Node.js", "React", "Work in Progress"],
        links: [
            { label: "View on GitHub", url: "https://github.com/lucastidy/NotiFlow" }
        ]
    },
    {
        id: 5,
        title: "SPEEDOMETER PROJECT",
        date: "FALL 2025",
        shortDesc: "UBC BAJA SAE",
        fullDesc: "Developed a speedometer to provide crucial real-time speed data to the driver for the Baja Off-Roading Vehicle. Built firmware in C/C++ to contribute speedometer data to the real-time telemetry system using the distributed CAN network. Achieved 95% accuracy of speed in an experimental setting. Conducted reference frequency analysis using Audio and Waveform software.",
        tags: ["Firmware", "C", "Python", "STM32 ToolChain", "STM32 DevBoards", "Arduino", "CAN Bus", "Work in Progress"],
        links: [
            { label: "View on GitHub", url: "https://github.com/UBC-Baja-SAE/firmware" }
        ],
        media: [
            {
                type: 'video',
                src: speedotest1,
                poster: ''
            },
            {
                type: 'video',
                src: speedotest2,
                poster: ''
            },
            {
                type: 'image',
                src: alignedgraphcleaned,
                alt: 'test vs reference graph'
            }
        ]
    },
    {
        id: 6,
        title: "ENGINE DATA ACQUISITION",
        date: "ONGOING",
        shortDesc: "UBC BAJA SAE",
        fullDesc: "Led the end-to-end powertrain instrumentation, FreeRTOS deterministic sensor sampling, and PCB hardware debugging for the UBC Baja off-road vehicle.",
        sections: [
            {
                subheading: "POWERTRAIN INSTRUMENTATION",
                text: "For the Engine Data Acquisition system, I led the end-to-end instrumentation of the powertrain. This involved designing and implementing the wiring harness, electronics, and firmware architecture to integrate eight (potentially more to come) sensors into the rear of the car."
            },
            {
                subheading: "FIRMWARE ARCHITECTURE",
                text: [
                    "On the firmware side, I architected the system in C using FreeRTOS on an STM32 microcontroller. I used priority-assigned tasks and DMA-driven ADC reads to guarantee deterministic sensor sampling.",
                    "To validate the system, I carried out extensive hardware and software debugging with dedicated diagnostic tools (and some shoddy homemade tools). This work confirmed sensor behavior and data integrity, and I identified and eliminated a critical data-quality fault with the tachometer."
                ]
            },
            {
                subheading: "HARDWARE DEBUGGING & TACHOMETER RESOLUTION",
                text: [
                    "The custom PCB for the engine DAQ had a critical design flaw and could not be used. So, we retrofitted a PCB for our electronic-suspension project instead. However, when testing the tachometer output, the values were very inconsistent, occasionally staying at the range we expected but often outputting values as high as 50,000 rpm.",
                    "We reinvestigated the PCB schematic and found that there was a pull-up on the input pin. This was not at all intended, because the tachometer circuit to process the engine sparks had a pull-down. With both a pull-up and pull-down, the engine sparks were being converted to an unpredictable tri-state voltage between the logic HIGH and LOW of the MCU, resulting in the unexpected values.",
                    "To fix this, we had to route the tachometer to a pin without a pull-up—which there was only one of (lucky us!), but it was the USB-C port (unlucky us!). So we had to de-solder the USB-C port off the PCB, and instead route the tachometer to that pin."
                ]
            }
        ],
        tags: ["Firmware", "FreeRTOS", "C", "STM32 ToolChain", "STM32", "CAN", "Work in Progress"],
        links: [
            { label: "View on GitHub", url: "https://github.com/jmursalim" }
        ]
    }
];

// Component for rendering rich project descriptions, interlacing text, subheadings, and media
function ProjectContent({ project, isMobile = false }: { project: Project; isMobile?: boolean }) {
    return (
        <div className="space-y-8 w-full">
            {/* Top Header Extras: Tags & Links */}
            <div className="flex flex-col gap-4 pb-2 border-b border-foreground/15">
                {/* Skills Tags */}
                <div className="flex gap-2.5 flex-wrap">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className={isMobile
                                ? "px-3 py-1 border border-foreground/50 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                : "px-4 py-2 border border-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors cursor-default"
                            }
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* External Links */}
                {project.links && project.links.length > 0 && (
                    <div className="flex gap-4 flex-wrap items-center">
                        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Links:</span>
                        {project.links.map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${isMobile ? 'text-sm font-medium' : 'text-base font-light'} text-foreground underline decoration-1 underline-offset-4 hover:decoration-2 transition-all`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Intro fullDesc if present */}
            {project.fullDesc && (
                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                    <p className={`${isMobile ? 'text-base font-light' : 'text-lg md:text-xl font-extralight'} leading-relaxed text-foreground font-inter`}>
                        {project.fullDesc}
                    </p>
                </div>
            )}

            {/* Rich sections if present */}
            {project.sections && project.sections.length > 0 && (
                <div className="space-y-10">
                    {project.sections.map((section, sIndex) => {
                        const paragraphs = section.text
                            ? Array.isArray(section.text)
                                ? section.text
                                : [section.text]
                            : [];
                        const mediaItems = section.media
                            ? Array.isArray(section.media)
                                ? section.media
                                : [section.media]
                            : [];

                        const renderMedia = () => {
                            if (mediaItems.length === 0) return null;
                            return (
                                <div className="my-6 space-y-2">
                                    <div className={`grid gap-4 ${mediaItems.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                                        {mediaItems.map((item, idx) => (
                                            <div key={idx} className="flex flex-col gap-1.5">
                                                {item.type === 'image' ? (
                                                    <img
                                                        src={item.src}
                                                        alt={item.alt || item.caption || section.subheading || project.title}
                                                        className="w-full h-auto border border-foreground/10 rounded-sm hover:opacity-90 transition-all duration-500"
                                                    />
                                                ) : (
                                                    <video
                                                        src={item.src}
                                                        controls
                                                        poster={item.poster}
                                                        className="w-full h-auto border border-foreground/10 rounded-sm"
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                                {item.caption && (
                                                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                                        {item.caption}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {section.caption && (
                                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                            {section.caption}
                                        </p>
                                    )}
                                </div>
                            );
                        };

                        return (
                            <div key={sIndex} className="space-y-4">
                                {section.subheading && (
                                    <h4 className="text-xl md:text-2xl font-light tracking-tight text-foreground uppercase pt-4 pb-2 border-b border-foreground/15">
                                        {section.subheading}
                                    </h4>
                                )}

                                {section.mediaPosition === 'before' && renderMedia()}

                                {paragraphs.length > 0 && (
                                    <div className="space-y-4">
                                        {paragraphs.map((p, pIdx) => (
                                            <p
                                                key={pIdx}
                                                className={`${isMobile ? 'text-base font-light' : 'text-lg md:text-xl font-extralight'} leading-relaxed text-foreground font-inter`}
                                            >
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {section.mediaPosition !== 'before' && renderMedia()}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Legacy or Project-level Media Section */}
            {project.media && project.media.length > 0 && (
                <div className="flex flex-col gap-8 pt-4 pb-20">
                    {project.media.map((item, index) => (
                        <div key={index} className="w-full flex flex-col gap-2">
                            {item.type === 'image' ? (
                                <img
                                    src={item.src}
                                    alt={item.alt || item.caption || project.title}
                                    className="w-full h-auto border border-foreground/10 rounded-sm hover:opacity-90 transition-all duration-500"
                                />
                            ) : (
                                <video
                                    src={item.src}
                                    controls
                                    poster={item.poster}
                                    className="w-full h-auto border border-foreground/10 rounded-sm"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {item.caption && (
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                    {item.caption}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Always render projects ordered with greatest ID at the top
const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

export default function Projects() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleProjectClick = (id: number) => {
        if (selectedId === id) {
            setSelectedId(null);
        } else {
            setSelectedId(id);
        }
    };

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <div className="flex h-full gap-12 relative">
            {/* Unified subtle feathered vignette behind the project text column */}
            <div
                className="absolute inset-y-0 -left-8 w-full md:w-5/12 -z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 90% 85% at 35% 45%, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.18) 50%, hsl(var(--background) / 0.05) 75%, transparent 100%)',
                }}
            />

            {/* Project Scroll List (Left Side) - Always visible, fixed width */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                {sortedProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className={`group cursor-pointer p-0 transition-opacity duration-300 ${selectedId && selectedId !== project.id ? 'opacity-30 hover:opacity-100' : 'opacity-100'
                            }`}
                    >
                        <h3 className={`font-light mb-1 transition-colors text-foreground`} style={{ fontSize: 'clamp(1.25rem, 2vw, 1.875rem)' }}>
                            {project.title}
                        </h3>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-light text-foreground uppercase tracking-widest mb-1">
                                {project.tags[0]} / {project.shortDesc} / {project.date}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Project Details Panel (Right Side) - Full Page Overlay */}
            <AnimatePresence mode="wait">
                {selectedId ? (
                    <motion.div
                        key={selectedId}
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-0 right-0 bottom-0 w-1/2 bg-background z-50 overflow-y-auto no-scrollbar hidden md:flex flex-col pt-6 px-10 md:pt-8 md:px-12 pb-20 shadow-2xl border-l border-foreground/10"
                    >
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setSelectedId(null)}
                                className="p-2 hover:bg-muted/10 rounded-full transition-colors group"
                                aria-label="Close project details"
                            >
                                <X size={28} className="text-foreground transition-transform group-hover:rotate-90" />
                            </button>
                        </div>

                        <div className="space-y-6 max-w-3xl w-full mx-auto">
                            <div>
                                <h2 className="font-thin tracking-tighter mb-4 leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                                    {selectedProject?.title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm font-light font-mono text-foreground uppercase tracking-widest border-y border-foreground py-3">
                                    <span>{selectedProject?.date}</span>
                                    <span>/</span>
                                    <span>{selectedProject?.tags[0]}</span>
                                    <span>/</span>
                                    <span>{selectedProject?.shortDesc}</span>
                                </div>
                            </div>

                            {selectedProject && <ProjectContent project={selectedProject} isMobile={false} />}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Mobile Project Details (Overlay) - As before */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        className="md:hidden fixed inset-0 z-50 bg-background flex flex-col p-6 overflow-y-auto no-scrollbar"
                    >
                        <div className="flex justify-between items-center mb-4 shrink-0">
                            <h2 className="text-2xl font-bold">{selectedProject?.title}</h2>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="p-2 hover:bg-muted/10 rounded-full"
                                aria-label="Close project details"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 pb-20">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground flex-wrap">
                                <span>{selectedProject?.date}</span>
                                <span>/</span>
                                <span>{selectedProject?.tags[0]}</span>
                            </div>

                            {selectedProject && <ProjectContent project={selectedProject} isMobile={true} />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

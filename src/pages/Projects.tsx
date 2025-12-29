import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MediaItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string;
}

interface Project {
    id: number;
    title: string;
    date: string;
    shortDesc: string;
    fullDesc: string;
    tags: string[];
    media?: MediaItem[];
    links?: { label: string; url: string }[];
}

const projects: Project[] = [
    {
        id: 1,
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
                src: '/src/assets/speedotest1.mp4',
                poster: ''
            },
            {
                type: 'video',
                src: '/src/assets/speedotest2.mp4',
                poster: ''
            },
            {
                type: 'image',
                src: '/src/assets/alignedgraphcleaned.png',
                alt: 'test vs reference graph'
            }
        ]
    },
    {
        id: 2,
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
        id: 3,
        title: "KEYPAD AND COMBO LOCK",
        date: "FALL 2025",
        shortDesc: "UBC CPEN 211",
        fullDesc: "Created a synthesizable keypad and combo lock using SystemVerilog. Allowed for a 6 digit password to be set and changed. Implemented sequential logic design and state machines to handle the different states of the lock. Utilized DE-10 Lite FPGA to implement the design.",
        tags: ["Hardware", "SystemVerilog", "Sequential Logic Design", "DE-10 Lite", "FPGA"],
        media: [
            {
                type: 'image',
                src: '/src/assets/IMG_6592.jpg',
                alt: 'Keypad and Combo Lock'
            },
            {
                type: 'image',
                src: '/src/assets/IMG_6593.jpg',
                alt: 'Keypad and Combo Lock'
            },
            {
                type: 'image',
                src: '/src/assets/fsmCombo.jpg',
                alt: 'FSM Diagram'
            },
            {
                type: 'image',
                src: '/src/assets/IMG_0442.jpg',
                alt: 'FSM Diagram'
            }
        ]
    },
    {
        id: 4,
        title: "BARE METAL TRON GAME",
        date: "FALL 2025",
        shortDesc: "UBC CPEN 211",
        fullDesc: "Created a Tron game using bare metal C and Assembly. Implemented a VGA display and DE-10 Lite FPGA board to control the game.",
        tags: ["Hardware", "C", "Assembly", "RISC-V", "DE-10 Lite", "FPGA"],
        media: [
            {
                type: 'video',
                src: '/src/assets/trongame.mp4', // Example video
                poster: ''
            }
        ]
    },
    {
        id: 5,
        title: "MOVIE RECOMMENDATION ENGINE",
        date: "SUMMER 2025",
        shortDesc: "PERSONAL PROJECT",
        fullDesc: "Developed a movie recommendation engine using Python. Utilized the TMDB API to retrieve movie information then optimized the large dataset for real-time response. Applied machine learning algorithms to simulate hybrid-filtered recommendations while using a content-based filtering approach. Hosted the application on a server and allowed users to access it through a Discord bot.",
        tags: ["Software", "Python", "Data Analysis", "Machine Learning"],
        links: [
            { label: "View on GitHub", url: "https://github.com/jmursalim/la_casa_lobot" }
        ]
    }
];

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
            {/* Project Scroll List (Left Side) - Always visible, fixed width */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-20">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className={`group cursor-pointer p-0 transition-opacity duration-300 ${selectedId && selectedId !== project.id ? 'opacity-30 hover:opacity-100' : 'opacity-100'
                            }`}
                    >
                        <h3 className={`text-3xl font-light mb-1 transition-colors text-foreground`}>
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
                        className="fixed top-0 right-0 bottom-0 w-1/2 bg-background z-50 overflow-y-auto no-scrollbar hidden md:flex flex-col p-12 shadow-2xl border-l border-foreground/10"
                    >
                        <div className="flex justify-end mb-12">
                            <button
                                onClick={() => setSelectedId(null)}
                                className="p-2 hover:bg-muted/10 rounded-full transition-colors group"
                            >
                                <X size={32} className="text-foreground transition-transform group-hover:rotate-90" />
                            </button>
                        </div>

                        <div className="space-y-12 max-w-3xl w-full mx-auto mt-10">
                            <div>
                                <h2 className="text-6xl md:text-7xl font-thin tracking-tighter mb-6 leading-none">
                                    {selectedProject?.title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm font-light font-mono text-foreground uppercase tracking-widest border-y border-foreground py-4">
                                    <span>{selectedProject?.date}</span>
                                    <span>/</span>
                                    <span>{selectedProject?.tags[0]}</span>
                                    <span>/</span>
                                    <span>{selectedProject?.shortDesc}</span>
                                </div>
                            </div>

                            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                                <p className="text-xl md:text-2xl font-extralight leading-relaxed text-foreground">
                                    {selectedProject?.fullDesc}
                                </p>
                            </div>

                            {/* Optional Links Section */}
                            {selectedProject?.links && selectedProject.links.length > 0 && (
                                <div className="flex flex-col gap-4 border-t border-foreground pt-6">
                                    <h3 className="text-sm font-mono uppercase tracking-widest text-foreground">External Links</h3>
                                    <div className="flex gap-4 flex-wrap">
                                        {selectedProject.links.map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-light text-foreground underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills Tags */}
                            <div className="flex gap-3 flex-wrap pt-4">
                                {selectedProject?.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 border border-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Media Section - Render Images/Videos */}
                            <div className="flex flex-col gap-8 pt-4 pb-20">
                                {selectedProject?.media && (
                                    selectedProject.media.map((item, index) => (
                                        <div key={index} className="w-full flex flex-col gap-2">
                                            {item.type === 'image' ? (
                                                <img
                                                    src={item.src}
                                                    alt={item.alt || selectedProject.title}
                                                    className="w-full h-auto border border-foreground/10 rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
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
                                        </div>
                                    ))
                                )}
                            </div>
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
                        className="md:hidden fixed inset-0 z-50 bg-background flex flex-col p-6 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">{selectedProject?.title}</h2>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="p-2 hover:bg-muted rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-muted-foreground mb-6">{selectedProject?.fullDesc}</p>
                        {/* ... */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLastFm, type LastFmData } from '../hooks/useLastFm';
import LastFmSection from '../components/LastFmSection';

// You can import local images and videos here from `../assets/`
// Example:
// import myPhoto from '../assets/myPhoto.jpg';
// import myVideo from '../assets/myVideo.mp4';
import rivian1 from '../assets/rivian1.jpeg';
import rivian2 from '../assets/rivian2.jpeg';
import rivian3 from '../assets/rivian3.jpeg';
import baja1 from '../assets/baja1.JPEG';
import baja2 from '../assets/baja2.JPEG';
import baja3 from '../assets/baja3.jpeg';
import baja4 from '../assets/baja4.MOV';
import mecha1 from '../assets/mecha1.JPG';
import mecha2 from '../assets/mecha2.jpeg';
import mecha5 from '../assets/mecha5.jpeg';
import mecha7 from '../assets/mecha7.MOV';
import frisbee1 from '../assets/frisbee1.JPG';
import frisbee2 from '../assets/frisbee2.JPG';
import outside2 from '../assets/outside2.MOV';
import outside3 from '../assets/outside3.MP4';
import beabadoobe from '../assets/beabadoobe.jpeg';
import panchiko from '../assets/panchiko.jpeg';
import macdemarco1 from '../assets/macdemarco1.jpeg';
import ninajConcert from '../assets/ninaj-concert.JPG';
import ninaj2 from '../assets/ninaj-2.jpeg';
import wisp1 from '../assets/wisp1.jpeg';
import guitar1 from '../assets/guitar1.JPG';
import guitar2 from '../assets/guitar2.JPEG';
import food1 from '../assets/food1.jpeg';
import food2 from '../assets/food2.jpeg';
import food3 from '../assets/food3.jpg';

export interface MediaItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string;
    caption?: string;
}

export interface AboutSection {
    subheading?: string;
    text?: string | string[];
    media?: MediaItem | MediaItem[];
    mediaPosition?: 'before' | 'after';
    mediaLayout?: 'grid' | 'featured-left';
    caption?: string;
}

export interface AboutItem {
    id: number;
    title: string;
    shortDesc?: string;
    fullDesc?: string;
    sections?: AboutSection[];
    media?: MediaItem[];
    links?: { label: string; url: string }[];
}

/**
 * About Me content entries (Tabs on the left, expandable in sidebar on the right).
 * You can easily add more tabs, change text, or attach photos and videos!
 */
const aboutItems: AboutItem[] = [
    {
        id: 1,
        title: "WHAT I'M UP TO",
        shortDesc: "RVT / UBC BAJA SAE",
        fullDesc: "Here's a look at what I'm actively working on, where I'm spending my time, and what is currently taking up most of my engineering bandwidth.",
        links: [
            { label: "UBC Baja SAE", url: "https://www.ubcbaja.com" },
            { label: "GitHub Profile", url: "https://github.com/jmursalim" }
        ],
        sections: [
            {
                subheading: "RIVIAN AND VOLKSWAGEN GROUP TECHNOLOGIES",
                text: [
                    "From May 2026 to December 2026, I am working as a Software Engineering Intern at Rivian Volkswagen Technologies on the Battery Management System (BMS) Test and Integration team.",
                    "My work involves developing automated test suites, triaging and debugging test results, validating embedded firmware reliability in edge cases, and creating internal developer tools. Working with High-Voltage systems and diving into all its components has been an amazing experience."
                ],
                media: [
                    {
                        type: 'image',
                        src: rivian1,
                        caption: 'Hanging out in the back of an R1T'
                    },
                    {
                        type: 'image',
                        src: rivian2,
                        caption: 'Irvine Rivian office'
                    },
                    {
                        type: 'image',
                        src: rivian3,
                        caption: 'Laguna Beach Rivian theatre'
                    }
                ],
                mediaPosition: 'after',
                mediaLayout: 'featured-left'
            },
            {
                subheading: "UBC BAJA SAE - MECHATRONICS LEAD",
                text: [
                    "As the Mechatronics sub-team lead with UBC Baja SAE, I oversee the electrical architecture and firmware of our off-road competition vehicle.",
                    "We're currently developing custom engine data acquisition (DAQ), driver telemetry displays, and CANbus sensor networks built to withstand extreme shock, vibration, and dirt (way too much dirt...).",
                    "I'm currently developing the FreeRTOS firmware architecture that will be used for our various DAQ systems and ECUs. Once that's complete to a state that I'm satisfied with, I'll be working on a custom CANFD bootloader, so we can flash our ECUs and DAQ systems over the CANbus instead of using an stlink.",
                    "On top of those projects I'm managing projects for my members and ensuring they have the adequate resources to work effectively and providing technical guidance where needed. I'm also facilitating communication and coordination between all the sub-teams to ensure we're all moving in the same direction."
                ],
                media: [
                    {
                        type: 'image',
                        src: baja1,
                        alt: 'UBC Baja SAE',
                        caption: 'Winter EDN competition in Quebec'
                    },
                    {
                        type: 'image',
                        src: baja2,
                        alt: 'UBC Baja SAE',
                        caption: 'Summer SAE competition in Oregon'
                    },
                    {
                        type: 'image',
                        src: baja3,
                        alt: 'UBC Baja SAE',
                        caption: 'Suiting up to drive'
                    },
                    {
                        type: 'image',
                        src: mecha1,
                        alt: 'Mechatronics',
                        caption: 'Team photo day'
                    },
                    {
                        type: 'image',
                        src: mecha2,
                        alt: 'Mechatronics',
                        caption: 'ECU and DAQ CANbus integration testing'
                    },
                    {
                        type: 'image',
                        src: mecha5,
                        alt: 'Mechatronics',
                        caption: 'Engine DAQ Work session'
                    },
                    {
                        type: 'video',
                        src: baja4,
                        caption: 'Driving around a mudflat'
                    },
                    {
                        type: 'video',
                        src: mecha7,
                        caption: 'Driver dashboard speakers (silly and temporary)'
                    }
                ],
                mediaPosition: 'after'
            },
            {
                subheading: "WHAT I'M CURRENTLY EXPLORING",
                text: [
                    "Outside of my core responsibilities, I've been reading some papers and textbooks hoping to refresh and expand my knowledge while I'm on Co-op.",
                    "I've recently read a paper about SOC and SOH estimation in EVs to improve my BMS knowledge. It was a cool read and I would highly recommend to anyone interested in EV batteries.",
                    "I have also been reading two books about design patterns on different ends of the spectrum. One is in the context of embedded systems and the other is in the context of large software systems. Both are quite interesting and read kinda like tutorials which is something I can appreciate.",
                    "My next read is probably going to be a technical document I found from SAE about data analysis for racecars. I want to get more involved in the data analysis aspect of the data we are collecting so hopefully this will be a good resource.",
                    "In the order I mentioned them, the books are: 'State of Charge and State of Health Estimation in Electric Vehicles: Challenges, Approaches and Future Directions' - Soyoye, B.D.; Bhattacharya, I.; Anthony Dhason, M.V.; Banik, T.; and 'Making Embedded Systems' (Second Edition) - Elecia White, and 'Designing Data-Intensive Applications' (First Edition) - Martin Kleppmann, and 'Analysis Techniques for Racecar Data Acquisition' (Second Edition) - Jorge Segers."
                ]
            }
        ]
    },
    {
        id: 2,
        title: "ANYTHING FUN?",
        shortDesc: "ACTIVITIES / HOBBIES",
        fullDesc: "Beyond engineering, these are the hobbies, activities, and passions that keep me entertained.",
        sections: [
            {
                subheading: "Staying fit",
                text: [
                    "A big emphasis in my life has been to stay athletic and I mainly do this through a mix of serious and fun training.",
                    "In highschool I played a bit of ultimate frisbee and am still playing occasionally with some friends. I'm especially excited to play again with my intramural team at UBC where we're looking for the three-peat this year.",
                    "Recently, I've started bouldering with some friends, which has been really fun. Still looking to hit my first V5.",
                    "Otherwise, I work out at the gym 2-3 times a week. Sometimes I'll go for a run or do some plyometric training. Also trying to get into hiking as well."
                ],
                media: [
                    {
                        type: 'image',
                        src: frisbee1,
                        alt: 'Frisbee',
                        caption: 'Highschool Frisbee'
                    },
                    {
                        type: 'image',
                        src: frisbee2,
                        alt: 'Intramural frisbee',
                        caption: 'Intramural Frisbee Champions'
                    },
                    {
                        type: 'video',
                        src: outside3,
                        alt: 'Bouldering',
                        caption: 'Bouldering with some friends'
                    },
                    {
                        type: 'video',
                        src: outside2,
                        alt: 'Kayak on a lake',
                        caption: 'Kayaking around Okanagan Lake'
                    }
                ],
                mediaPosition: 'after'
            },
            {
                subheading: "PLAYING MUSIC",
                text: [
                    "I've been playing guitar and bass for a while now, and I'm especially drawn to indie, alternative, and surf-adjacent genres.",
                    "I don't perform live much anymore, but I've been in a few bands on and off throughout highschool and into university. But I'm always down to jam with friends now and then."
                ],
                media: [
                    {
                        type: 'image',
                        src: guitar1,
                        alt: 'Guitar',
                        caption: 'Playing a show in highschool'
                    },
                    {
                        type: 'image',
                        src: guitar2,
                        alt: 'Bass',
                        caption: 'Jamming with friends'
                    }
                ]
            },
            {
                subheading: "COOKING & EATING",
                text: [
                    "Cooking has become an increasingly important hobby of mine and I've been trying to get better at cooking the last few years. I mostly enjoy making comfort foods and cooking larger meals for friends and family."
                ],
                media: [
                    {
                        type: 'image',
                        src: food1,
                        alt: 'Chicken Parm with vodka sauce pasta',
                        caption: 'Chicken Parm with vodka sauce pasta'
                    },
                    {
                        type: 'image',
                        src: food2,
                        alt: 'Hot-honey fried chicken and mac & cheese',
                        caption: 'Hot-honey fried chicken and mac & cheese'
                    },
                    {
                        type: 'image',
                        src: food3,
                        alt: 'Tomato and miso broth hotpots',
                        caption: 'Tomato and miso broth hotpots'
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "CURRENT ROTATION",
        shortDesc: "LAST.FM / LIVE AUDIO",
        fullDesc: "I listen to a lot of music, so check out what im listening to from Last.fm synced live. I'll listen to pretty much every genre, if you don't believe me, the proof is literally right here.",
        links: [
            { label: "Last.fm Profile", url: "https://www.last.fm/user/jmursalim" }
        ],
        sections: [
            {
                subheading: "LIVE SHOWS & CONCERTS",
                text: "I also enjoy catching live music, supporting touring artists, as well as underground gigs and indie concerts.",
                media: [
                    {
                        type: 'image',
                        src: panchiko,
                        alt: 'Panchiko concert',
                        caption: 'Panchiko @ The Pearl'
                    },
                    {
                        type: 'image',
                        src: macdemarco1,
                        alt: 'Mac DeMarco concert',
                        caption: 'Mac DeMarco @ Queen Elizabeth Theatre'
                    },
                    {
                        type: 'image',
                        src: ninaj2,
                        alt: 'Ninajirachi concert',
                        caption: 'Ninajirachi @ The Commodore Ballroom'
                    },
                    {
                        type: 'image',
                        src: ninajConcert,
                        alt: 'Concert crowd',
                        caption: 'Ninajirachi @ Commodore Ballroom'
                    },
                    {
                        type: 'image',
                        src: wisp1,
                        alt: 'Wisp concert',
                        caption: 'Wisp @ The Pearl'
                    },
                    {
                        type: 'image',
                        src: beabadoobe,
                        alt: 'Beabadoobee concert',
                        caption: 'Beabadoobee @ Pacific Coliseum'
                    }
                ]
            }
        ]
    }
];

// Content component for rendering rich about sections, media, and links
function AboutContent({
    item,
    isMobile = false,
    lastFmData,
}: {
    item: AboutItem;
    isMobile?: boolean;
    lastFmData: LastFmData;
}) {
    return (
        <div className="space-y-8 w-full">
            {/* Top Header Extras: Links if present */}
            {item.links && item.links.length > 0 && (
                <div className="flex gap-4 pb-3 border-b border-foreground/15 flex-wrap items-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Links:</span>
                    {item.links.map((link) => (
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

            {/* Introductory fullDesc if present */}
            {item.fullDesc && (
                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                    <p className={`${isMobile ? 'text-base font-light' : 'text-lg md:text-xl font-extralight'} leading-relaxed text-foreground font-inter`}>
                        {item.fullDesc}
                    </p>
                </div>
            )}

            {/* If Current Rotation / Music tab, render the live Last.fm scrobble section */}
            {item.id === 3 && (
                <LastFmSection data={lastFmData} isMobile={isMobile} />
            )}

            {/* Rich sections with subheadings, text, and photos/videos */}
            {item.sections && item.sections.length > 0 && (
                <div className="space-y-10">
                    {item.sections.map((section, sIndex) => {
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

                        const renderMediaItem = (media: MediaItem, key?: number | string) => (
                            <div key={key} className="flex flex-col gap-1.5">
                                {media.type === 'image' ? (
                                    <img
                                        src={media.src}
                                        alt={media.alt || media.caption || section.subheading || item.title}
                                        className="w-full h-auto border border-foreground/10 rounded-sm hover:opacity-90 transition-all duration-500"
                                    />
                                ) : (
                                    <video
                                        src={media.src}
                                        controls
                                        playsInline
                                        poster={media.poster}
                                        className="w-full h-auto border border-foreground/10 rounded-sm"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {media.caption && (
                                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                        {media.caption}
                                    </p>
                                )}
                            </div>
                        );

                        const renderMedia = () => {
                            if (mediaItems.length === 0) return null;

                            if (section.mediaLayout === 'featured-left' && mediaItems.length > 1) {
                                const [featuredItem, ...stackedItems] = mediaItems;
                                return (
                                    <div className="my-6 space-y-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                            {renderMediaItem(featuredItem, 0)}
                                            <div className="flex flex-col gap-4">
                                                {stackedItems.map((media, idx) =>
                                                    renderMediaItem(media, idx + 1)
                                                )}
                                            </div>
                                        </div>
                                        {section.caption && (
                                            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                                {section.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <div className="my-6 space-y-2">
                                    <div className={`grid gap-4 ${mediaItems.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                                        {mediaItems.map((media, idx) => renderMediaItem(media, idx))}
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

            {/* Optional item-level media gallery if present */}
            {item.media && item.media.length > 0 && (
                <div className="flex flex-col gap-8 pt-4 pb-20">
                    {item.media.map((media, index) => (
                        <div key={index} className="w-full flex flex-col gap-2">
                            {media.type === 'image' ? (
                                <img
                                    src={media.src}
                                    alt={media.alt || media.caption || item.title}
                                    className="w-full h-auto border border-foreground/10 rounded-sm hover:opacity-90 transition-all duration-500"
                                />
                            ) : (
                                <video
                                    src={media.src}
                                    controls
                                    playsInline
                                    poster={media.poster}
                                    className="w-full h-auto border border-foreground/10 rounded-sm"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {media.caption && (
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                    {media.caption}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function About() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const lastFmData = useLastFm();

    const handleItemClick = (id: number) => {
        if (selectedId === id) {
            setSelectedId(null);
        } else {
            setSelectedId(id);
        }
    };

    const selectedItem = aboutItems.find(item => item.id === selectedId);

    return (
        <div className="flex h-full gap-12 relative">
            {/* Unified subtle feathered vignette behind the text column */}
            <div
                className="absolute inset-y-0 -left-8 w-full md:w-5/12 -z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 90% 85% at 35% 45%, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.18) 50%, hsl(var(--background) / 0.05) 75%, transparent 100%)',
                }}
            />

            {/* About Tabs / Item List (Left Side) - Always visible, fixed width */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                {aboutItems.map((item) => (
                    <motion.div
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`group cursor-pointer p-0 transition-opacity duration-300 ${selectedId && selectedId !== item.id ? 'opacity-30 hover:opacity-100' : 'opacity-100'
                            }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <h3
                                className="font-light mb-1 transition-colors text-foreground"
                                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.875rem)' }}
                            >
                                {item.title}
                            </h3>
                            {item.id === 3 && lastFmData.isNowPlaying && (
                                <span className="relative flex h-2 w-2 mb-1" title="Currently Playing on Last.fm">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            )}
                        </div>
                        {item.shortDesc && (
                            <div className="flex flex-col items-start">
                                <p className="text-sm font-light text-foreground uppercase tracking-widest mb-1 flex items-center gap-2">
                                    {item.id === 3 && lastFmData.isNowPlaying ? (
                                        <span className="text-emerald-500 font-medium">NOW PLAYING • LAST.FM</span>
                                    ) : (
                                        item.shortDesc
                                    )}
                                </p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* About Details Sidebar Panel (Right Side) - Slides in on Desktop */}
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
                                aria-label="Close details"
                            >
                                <X size={28} className="text-foreground transition-transform group-hover:rotate-90" />
                            </button>
                        </div>

                        <div className="space-y-6 max-w-3xl w-full mx-auto">
                            <div>
                                <h2
                                    className="font-thin tracking-tighter mb-4 leading-none"
                                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                                >
                                    {selectedItem?.title}
                                </h2>
                                {selectedItem?.shortDesc && (
                                    <div className="flex items-center gap-4 text-sm font-light font-mono text-foreground uppercase tracking-widest border-y border-foreground py-3">
                                        <span>
                                            {selectedItem.id === 3 && lastFmData.isNowPlaying
                                                ? "NOW PLAYING • LAST.FM"
                                                : selectedItem.shortDesc}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {selectedItem && (
                                <AboutContent item={selectedItem} isMobile={false} lastFmData={lastFmData} />
                            )}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Mobile Details Drawer (Slide-up modal) */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        className="md:hidden fixed inset-0 z-50 bg-background flex flex-col p-6 overflow-y-auto no-scrollbar"
                    >
                        <div className="flex justify-between items-center mb-4 shrink-0">
                            <h2 className="text-2xl font-bold">{selectedItem?.title}</h2>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="p-2 hover:bg-muted/10 rounded-full"
                                aria-label="Close details"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 pb-20">
                            {selectedItem?.shortDesc && (
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground flex-wrap">
                                    <span>
                                        {selectedItem.id === 3 && lastFmData.isNowPlaying
                                            ? "NOW PLAYING • LAST.FM"
                                            : selectedItem.shortDesc}
                                    </span>
                                </div>
                            )}

                            {selectedItem && (
                                <AboutContent item={selectedItem} isMobile={true} lastFmData={lastFmData} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

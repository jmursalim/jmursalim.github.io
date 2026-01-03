import { Outlet } from 'react-router-dom';
import Dither from './Dither';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

export default function Layout() {
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(true); // Default to dark mode

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Initialize theme - Default to DARK
        if (localStorage.theme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            // Default to dark mode if no preference or if preference is dark
            setIsDark(true);
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    // Theme Logic:
    // Dark Mode: Outer=Black | Frame Border=White | Dither BG=Black | Wave Color=White([1,1,1])
    // Theme Logic:
    // Dark Mode: reduced intensity white ([0.4, 0.4, 0.4]) - visible but not overpowering
    const waveColor: [number, number, number] = isDark ? [0.35, 0.35, 0.35] : [0, 0, 0];
    const backgroundColor: [number, number, number] = isDark ? [0, 0, 0] : [1, 1, 1];

    // Outer frame background
    const outerBgClass = isDark ? 'bg-black' : 'bg-white';
    const borderColorClass = isDark ? 'border-white' : 'border-black';

    return (
        <div className={`relative w-full h-screen overflow-hidden ${outerBgClass} text-foreground transition-colors duration-300`}>
            {/* Background Layer with Border Logic */}
            {/* Background Layer with Border Logic */}
            <div
                className={`absolute inset-0 z-0 transition-all duration-300 ${isDark ? 'bg-black' : 'bg-white'} ${isMobile ? 'top-0 left-0 right-0 bottom-0' : `top-4 left-4 right-4 bottom-4 md:top-8 md:left-8 md:right-8 md:bottom-8 border ${borderColorClass} rounded-lg overflow-hidden`
                    }`}
            >
                <Dither
                    waveColor={waveColor}
                    backgroundColor={backgroundColor}
                    disableAnimation={false}
                    enableMouseInteraction={false}
                    mouseRadius={0.3}
                    colorNum={5}
                    pixelSize={1}
                    waveAmplitude={0.2}
                    waveFrequency={0.6}
                    waveSpeed={0.02}
                />
                {/* Overlay removed as per request for pure B&W, let dither do the work */}
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col p-4 md:p-12 pointer-events-none">
                {/* Persistent Header Area */}
                <div className="flex flex-col gap-6 pointer-events-auto mb-8 tracking-tight">
                    {/* Top-Left Navbar */}
                    <div className="flex justify-between items-start w-full">
                        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
                    </div>

                    {/* Persistent Name and Title */}
                    <div>
                        <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-2">
                            Jordi Mursalim
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-foreground font-thin">
                            Computer Engineering Student
                        </h2>
                    </div>
                </div>

                {/* Dynamic Main Content Area */}
                <main className="flex-1 pointer-events-auto overflow-y-auto no-scrollbar relative min-h-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

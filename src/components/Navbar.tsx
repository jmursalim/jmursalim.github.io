import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={clsx(
                            "text-lg font-medium transition-colors hover:text-foreground/80",
                            location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-muted/10 transition-colors pointer-events-auto"
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="flex md:hidden items-center gap-4 pointer-events-auto">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-muted/10 transition-colors"
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-muted/10 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex flex-col gap-4 md:hidden pointer-events-auto z-50 shadow-lg"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "text-lg font-medium transition-colors p-2 hover:bg-muted/10 rounded-md",
                                    location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

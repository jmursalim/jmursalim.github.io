import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="flex items-center gap-6">
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
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </nav>
    );
}

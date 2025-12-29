import { Mail, Linkedin, FileText, Github } from 'lucide-react';

export default function Contact() {
    const contactLinks = [
        { icon: <Mail size={24} />, label: "Email", value: "jordideans@gmail.com" },
        { icon: <Linkedin size={24} />, label: "LinkedIn", value: "linkedin.com/in/jordimursalim", href: "https://www.linkedin.com/in/mursalimjordi/" },
        { icon: <Github size={24} />, label: "GitHub", value: "github.com/jordimursalim", href: "https://github.com/jmursalim" },
        { icon: <FileText size={24} />, label: "Resume", value: "View Resume", href: "/src/assets/JordiMursalim_resume_W2026_dec.pdf" },
    ];

    return (
        <div className="h-full flex flex-col justify-center max-w-2xl overflow-hidden">
            <div className="grid gap-6">
                {contactLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-6 p-6 border border-foreground rounded-lg"
                    >
                        <div className="p-0">
                            {link.icon}
                        </div>
                        <div>
                            <p className="text-xs font-mono uppercase tracking-widest mb-1">{link.label}</p>
                            <p className="text-2xl font-light">{link.value}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

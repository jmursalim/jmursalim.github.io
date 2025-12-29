

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-start pt-8 max-w-2xl">
            {/* Just the About content now, adjusting padding if needed */}
            <div className="space-y-6 text-xl md:text-2xl font-light leading-relaxed text-foreground">
                <p>
                    Hello! I'm Jordi Mursalim, a second-year Computer Engineering student at the University of British Columbia. I'm currently looking for opportunities to apply my skills and knowledge in the field of embedded systems and software development.
                </p>
                <p>
                    When I'm not in school, I enjoy playing the guitar and bass, trying video games with friends, and spending time with my cats.
                </p>
            </div>
        </div>
    );
}

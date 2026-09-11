

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-start pt-8 max-w-2xl">
            {/* Just the About content now, adjusting padding if needed */}
            <div className="vignette-radial space-y-6 text-xl md:text-2xl font-light leading-relaxed text-foreground font-inter">
                <p>
                    Hello! I'm Jordi Mursalim, a Engineering student at the University of British Columbia. I'm currently looking for opportunities to apply my skills and knowledge in the field of embedded systems and software development.
                </p>
                <p>
                    I'm on a co-op term from May 2026 to December 2026, working as a software engineering intern at Rivian Volkswagen Technologies with the battery management system test and integration team. I'm also the mechatronics sub-team lead with UBC Baja SAE, working on the development of our off-road vehicle.
                </p>
            </div>
        </div>
    );
}

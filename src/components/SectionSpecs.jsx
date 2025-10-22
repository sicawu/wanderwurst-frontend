import { Link } from "react-router-dom"

function SpecsSection({ specs }) {
    return (
        <div className="min-h-screen w-full bg-mint flex flex-col justify-center items-center py-16 px-4">
            <h2 className="pb-10 text-3xl sm:text-4xl md:text-5xl text-ivory mb-4 font-extrabold uppercase text-center animate-fade-in">
                Set priorities.
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                {specs.map((spec) => (
                    <Link
                        key={spec}
                        to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-darkcoral text-cream hover:bg-coral font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral"
                        aria-label={`Explore cafes with ${spec}`}                    >
                        {spec}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SpecsSection

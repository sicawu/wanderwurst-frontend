import { Link } from "react-router-dom";

function DrinksSection({ drinks }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal via-teal-600 to-teal-400 flex flex-col justify-center lg:justify-start items-center py-24 px-4 sm:px-6">
      <h2 className="pb-10 text-3xl sm:text-4xl md:text-5xl text-cream mb-4 font-extrabold uppercase text-center animate-fade-in">
        Find your Fuel.
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        {drinks.map((drink) => (
          <Link
            key={drink}
            to={`/best-cafes/drinks/${drink.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-coral text-cream hover:bg-darkcoral font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral"
            aria-label={`Explore cafes with ${drink}`}
          >
            {drink}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DrinksSection;
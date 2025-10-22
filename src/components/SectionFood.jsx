import { Link } from "react-router-dom";

function FoodSection({ food }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center lg:justify-start items-center py-24 px-4 sm:px-6">
      <h2 className="pb-10 text-3xl sm:text-4xl md:text-5xl text-ivory mb-4 font-extrabold uppercase text-center animate-fade-in">
        Feed the Monster.
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        {food.map((item) => (
          <Link
            key={item}
            to={`/best-cafes/food/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-olive text-ivory hover:bg-mint font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mint"
            aria-label={`Explore cafes with ${item}`}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FoodSection;
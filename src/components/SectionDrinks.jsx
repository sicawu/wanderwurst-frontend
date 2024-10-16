import { Link } from "react-router-dom"

function DrinksSection({ drinks }) {
  return (
<div className="min-h-screen w-full bg-green flex flex-col justify-center lg:justify-start items-center py-24 px-4">
<h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Find your Fuel.</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {drinks.map((drink) => (
          <Link
            key={drink}
            to={`/best-cafes/drinks/${drink.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-coral text-white border-1 border-black hover:bg-darkcoral font-semibold py-1 px-5 rounded-full shadow-md text-center"
          >
            {drink}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DrinksSection

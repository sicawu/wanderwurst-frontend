import { Link } from "react-router-dom"

function FoodSection({ food }) {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col justify-center items-center py-16 px-4">
      <h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Feed the Monster.</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {food.map((item) => (
          <Link
            key={item}
            to={`/best-cafes/food/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-olive text-white border-1 border-black hover:bg-mint font-semibold py-1 px-5 rounded-full shadow-md text-center"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FoodSection

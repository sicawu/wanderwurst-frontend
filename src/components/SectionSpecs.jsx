import { Link } from "react-router-dom"

function SpecsSection({ specs }) {
  return (
    <div className="min-h-screen w-full bg-green flex flex-col justify-center items-center py-16 px-4">
      <h2 className="pb-10 text-4xl text-white mb-4 font-extrabold uppercase text-center">Set priorities.</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {specs.map((spec) => (
          <Link
            key={spec}
            to={`/best-cafes/${spec.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-mint text-white border-1 border-black hover:bg-black font-semibold py-1 px-5 rounded-full shadow-md text-center"
          >
            {spec}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecsSection

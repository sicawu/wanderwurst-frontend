import { Link } from "react-router-dom"
import { iconMap, iconDescriptions } from "../config/iconConfig"  // Here you can change content + icon

function TopPickSection({ topPick }) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center mt-10 pb-10 gap-5">
      <h2 className="pb-10 text-4xl font-extrabold uppercase text-center">Know your purpose.</h2>
      <div className="flex flex-wrap justify-center items-stretch gap-4">
        {topPick.map((pick, index) => {
          const iconUrl = iconMap[pick];
          const linkText = pick.replace(/([A-Z])/g, '-$1').toLowerCase(); // convert camelCase to kebab-case
          const { h3, p } = iconDescriptions[pick];
          return (
            <div className="flex flex-col items-center mb-5 lg:w-1/4 w-1/3" key={index}>
              <Link to={`/best-cafes/for/${linkText}`} className="w-12 h-12">
                <img
                  src={iconUrl}
                  alt={pick}
                  className="w-full h-full border-2 rounded-full object-cover object-center"
                />
              </Link>
              <Link to={`/best-cafes/for/${linkText}`}>
                <div className="flex flex-col items-center min-h-[4rem] flex-grow">
                  <h3 className="text-s pt-3 flex justify-center text-center font-extrabold">{h3}</h3>
                  <p className="text-center">{p}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopPickSection

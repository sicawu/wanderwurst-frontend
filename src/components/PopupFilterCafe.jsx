import React from "react";
import CafeFilter from "./FilterCafe";
import { RxCrossCircled } from "react-icons/rx";

function FilterPopup({ onCityFilter, onDrinkFilter, onFoodFilter, setShowPopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl font-bold w-10 h-10 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <RxCrossCircled className="text-4xl" />
        </button>
        {/* Filters */}
        <div className="flex flex-col items-center space-y-4 my-8"> {/* Apply flex-col to stack filters */}
          <h2 className="text-black uppercase text-center text-xl m-1 px-0.5 py-0.5 font-extrabold italic">
            Make some Magic
          </h2>
          <CafeFilter
            onCityFilter={onCityFilter}
            onDrinkFilter={onDrinkFilter}
            onFoodFilter={onFoodFilter}
          />
          <button
            className="w-60 mb-5 bg-mint py-2 px-4 rounded-full shadow-md"
            onClick={() => setShowPopup(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;

import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import CafeFilter from "./FilterCafe";

function FilterPopup({
  onCityFilter,
  onDrinkFilter,
  onFoodFilter,
  onSpecFilter,
  cities,
  drinks,
  foods,
  specs,
  setShowPopup,
  showCityFilter = true, 
  showDrinkFilter = true,
  showFoodFilter = true,
  showSpecFilter = true
}) {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        ref={popupRef}
        className="relative bg-white p-8 rounded-lg shadow-xl max-w-md w-full border-2 border-gray-300"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-200"
          onClick={() => setShowPopup(false)}
        >
          <IoClose size={30} />
        </button>

        {/* Popup Title */}
        <h2 className="text-center text-2xl font-extrabold text-black uppercase tracking-wide mt-2 mb-6">
          Make Some Magic
        </h2>

        {/* Filters */}
        <div className="flex flex-col space-y-5 mb-12">
          <CafeFilter
            onCityFilter={onCityFilter}
            onDrinkFilter={onDrinkFilter}
            onFoodFilter={onFoodFilter}
            onSpecFilter={onSpecFilter}
            cities={cities}
            drinks={drinks}
            foods={foods}
            specs={specs}
            showCityFilter={showCityFilter} 
            showDrinkFilter={showDrinkFilter}
            showFoodFilter={showFoodFilter}
            showSpecFilter={showSpecFilter}
          />
        </div>

        {/* Apply Button */}
        <button
          className="w-1/2 max-w-md bg-teal text-white font-semibold py-3 rounded-full shadow-md hover:bg-black transition duration-300 text-lg"
          onClick={() => setShowPopup(false)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default FilterPopup;
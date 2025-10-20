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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 animate-fade-in">
      <div
        ref={popupRef}
        className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 transform transition-all duration-300 ease-out scale-100"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
          onClick={() => setShowPopup(false)}
        >
          <IoClose size={24} />
        </button>

        {/* Popup Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900 uppercase tracking-wider mt-2 mb-8">
          Make Some Magic
        </h2>

        {/* Filters */}
        <div className="flex flex-col space-y-6 mb-10">
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
        <div className="flex justify-center">
          <button
            className="w-full max-w-xs bg-teal text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-black hover:shadow-xl transition-all duration-300 text-lg"
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
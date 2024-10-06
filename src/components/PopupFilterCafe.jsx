import React, { useRef, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
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
    // Add event listener for clicks outside the popup
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div ref={popupRef} className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl font-bold w-10 h-10 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <IoClose size={30} />
        </button>
        {/* Filters */}
        <div className="flex flex-col items-center space-y-4 my-8">
          <h2 className="text-black uppercase text-center text-xl m-1 px-0.5 py-0.5 font-extrabold italic">
            Make some Magic
          </h2>
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
          <button
            className="w-60 mb-5 bg-gold py-2 px-4 rounded-full shadow-md"
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

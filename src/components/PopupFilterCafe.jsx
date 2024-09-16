import React, { useState } from "react";
import CafeFilter from "./FilterCafe";
import { RxCrossCircled } from "react-icons/rx";

function FilterPopup({ onCityFilter, onDrinkFilter, onFoodFilter, setShowPopup }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-2xl font-bold w-10 h-10 flex items-center justify-center"
            onClick={() => setShowPopup(false)}
          >
            <RxCrossCircled className="text-4xl"/>
          </button>
          {/* Filters */}
          <div className="flex flex-col space-y-4 mt-8"> {/* Apply flex-col to stack filters */}
            <CafeFilter 
              onCityFilter={onCityFilter} 
              onDrinkFilter={onDrinkFilter} 
              onFoodFilter={onFoodFilter} 
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default FilterPopup;

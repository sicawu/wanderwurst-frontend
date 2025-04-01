import React from "react";
import { ChevronDown } from "lucide-react";

function InlineFilterCafe({
  onCityFilter,
  onDrinkFilter,
  onFoodFilter,
  onSpecFilter,
  cities,
  drinks,
  foods,
  specs,
  selectedCity,
  selectedDrink,
  selectedFood,
  selectedSpec,
  showCityFilter = true,
  showDrinkFilter = true,
  showFoodFilter = true,
  showSpecFilter = true
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {showCityFilter && (
        <div className="w-full sm:w-60">
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => onCityFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-xl appearance-none text-sm font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all duration-200"
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      )}
      
      {showDrinkFilter && (
        <div className="w-full sm:w-60">
          <div className="relative">
            <select
              value={selectedDrink}
              onChange={(e) => onDrinkFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-xl appearance-none text-sm font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all duration-200"
            >
              <option value="">Select a Drink</option>
              {drinks.map((drink) => (
                <option key={drink} value={drink}>
                  {drink}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      )}
      
      {showFoodFilter && (
        <div className="w-full sm:w-60">
          <div className="relative">
            <select
              value={selectedFood}
              onChange={(e) => onFoodFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-xl appearance-none text-sm font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all duration-200"
            >
              <option value="">Select Food</option>
              {foods.map((food) => (
                <option key={food} value={food}>
                  {food}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      )}
      
      {showSpecFilter && (
        <div className="w-full sm:w-60">
          <div className="relative">
            <select
              value={selectedSpec}
              onChange={(e) => onSpecFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-xl appearance-none text-sm font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all duration-200"
            >
              <option value="">Choose your Preference</option>
              {specs.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InlineFilterCafe;
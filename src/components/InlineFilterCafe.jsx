import React from "react";

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
    <div className="flex flex-wrap gap-3 justify-center mb-4">
      {showCityFilter && (
        <div className="w-full sm:w-auto">
          <select
            value={selectedCity}
            onChange={(e) => onCityFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      {showDrinkFilter && (
        <div className="w-full sm:w-auto">
          <select
            value={selectedDrink}
            onChange={(e) => onDrinkFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Select a Drink</option>
            {drinks.map((drink) => (
              <option key={drink} value={drink}>
                {drink}
              </option>
            ))}
          </select>
        </div>
      )}

      {showFoodFilter && (
        <div className="w-full sm:w-auto">
          <select
            value={selectedFood}
            onChange={(e) => onFoodFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Select Food</option>
            {foods.map((food) => (
              <option key={food} value={food}>
                {food}
              </option>
            ))}
          </select>
        </div>
      )}

      {showSpecFilter && (
        <div className="w-full sm:w-auto">
          <select
            value={selectedSpec}
            onChange={(e) => onSpecFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Choose your Preference</option>
            {specs.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default InlineFilterCafe;
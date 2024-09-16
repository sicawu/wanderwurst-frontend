// FilterCafeFood.js
import React, { useState } from "react";

function FilterCafeFood({ cafes, onFilter }) {
  const [selectedFood, setSelectedFood] = useState("");

  // Get unique food items from cafes
  const uniqueFoods = [...new Set(cafes.flatMap(cafe => cafe.food))];

  const handleFoodChange = (event) => {
    const foodValue = event.target.value;
    setSelectedFood(foodValue);

    // Filter cafes based on selected food
    if (foodValue === "") {
      onFilter(cafes);
    } else {
      const filteredCafes = cafes.filter(cafe => cafe.food.includes(foodValue));
      onFilter(filteredCafes);
    }
  };

  return (
    <div className="w-60 flex rounded-full shadow-md max-w-md mx-auto mt-8 h-10">
      <select
        id="food-filter"
        value={selectedFood}
        onChange={handleFoodChange}
        className="py-2 px-4 rounded-full flex-grow focus:outline-none"
        >
        <option value="" className="text-gray-700">Select your Food</option>
        {uniqueFoods.map((food, index) => (
          <option key={index} value={food} className="text-gray-700">
            {food}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterCafeFood;

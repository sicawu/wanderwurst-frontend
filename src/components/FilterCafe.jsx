import React, { useState, useEffect } from "react";

function CafeFilter({
  onCityFilter,
  onDrinkFilter,
  onFoodFilter,
  onSpecFilter,
  cities,
  drinks,
  foods,
  specs,
  // Set on false if want to disable on individual pages
  showCityFilter = true,   
  showDrinkFilter = true,
  showFoodFilter = true,
  showSpecFilter = true
}) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [filteredDrinks, setFilteredDrinks] = useState(drinks);
  const [filteredFoods, setFilteredFoods] = useState(foods);
  const [filteredSpecs, setFilteredSpecs] = useState(specs);

  useEffect(() => {
    onCityFilter(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    onDrinkFilter(selectedDrink);
  }, [selectedDrink]);

  useEffect(() => {
    onFoodFilter(selectedFood);
  }, [selectedFood]);

  useEffect(() => {
    onSpecFilter(selectedSpec);
  }, [selectedSpec]);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCityFilter(city);
    setFilteredCities(cities.filter((c) => c === city));
  }

  const handleDrinkChange = (event) => {
    const drink = event.target.value;
    setSelectedDrink(drink);
    onDrinkFilter(drink);
    setFilteredDrinks(drinks.filter((d) => d === drink));
  }

  const handleFoodChange = (event) => {
    const food = event.target.value;
    setSelectedFood(food);
    onFoodFilter(food);
    setFilteredFoods(foods.filter((f) => f === food));
  }

  const handleSpecChange = (event) => {
    const spec = event.target.value;
    setSelectedSpec(spec);
    onSpecFilter(spec);
    setFilteredSpecs(specs.filter((s) => s === spec));
  }

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-5 mx-auto mt-5">
      {/* City Filter Dropdown */}
      {showCityFilter && (
        <div className="w-60 rounded-full shadow-md">
          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
          >
            <option value="">Select a City</option>
            {filteredCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Drinks Filter Dropdown */}
      {showDrinkFilter && (
        <div className="w-60 rounded-full shadow-md">
          <select
            id="drink"
            value={selectedDrink}
            onChange={handleDrinkChange}
            className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
          >
            <option value="">Select a Drink</option>
            {filteredDrinks.map((drink) => (
              <option key={drink} value={drink}>
                {drink}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Food Filter Dropdown */}
      {showFoodFilter && (
        <div className="w-60 rounded-full shadow-md">
          <select
            id="food"
            value={selectedFood}
            onChange={handleFoodChange}
            className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
          >
            <option value="">Select Food</option>
            {filteredFoods.map((food) => (
              <option key={food} value={food}>
                {food}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Specs Filter Dropdown */}
      {showSpecFilter && (
        <div className="w-60 rounded-full shadow-md">
          <select
            id="spec"
            value={selectedSpec}
            onChange={handleSpecChange}
            className="text-center py-2 px-4 rounded-full flex-grow focus:outline-none w-full"
          >
            <option value="">Choose your Preference</option>
            {filteredSpecs.map((spec) => (
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

export default CafeFilter;

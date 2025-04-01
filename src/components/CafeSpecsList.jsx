import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Searchbar from "./Searchbar";
import FilterPopup from "./PopupFilterCafe";
import { TbCoffeeOff } from "react-icons/tb";
import WishlistButton from '../components/WishlistButton';
import InlineFilterCafe from "./InlineFilterCafe";

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async";

function CafeSpecList() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { specs } = useParams();
    const encodedSpecs = encodeURIComponent(specs);
    const [cafeSpec, setcafeSpec] = useState([]);
    const [filteredCafes, setFilteredCafes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDrink, setSelectedDrink] = useState("");
    const [selectedFood, setSelectedFood] = useState("");
    const [selectedSpec, setSelectedSpec] = useState("");

    const [filters, setFilters] = useState({
        city: "",
        drink: "",
        food: "",
        spec: "",
    });

    const [filterValues, setFilterValues] = useState({
        cities: [],
        drinks: [],
        foods: [],
        specs: [],
    });

    const getSpecCafes = () => {
        axios.get(`${API_URL}/cafes/tag/${encodedSpecs}`)
            .then((response) => {
                setcafeSpec(response.data);
                setFilteredCafes(response.data);
                const cities = [...new Set(response.data.map((cafe) => cafe.location.city))];
                const drinks = [...new Set(response.data.flatMap((cafe) => cafe.drinks))];
                const foods = [...new Set(response.data.flatMap((cafe) => cafe.food))];
                const specs = [...new Set(response.data.flatMap((cafe) => cafe.specs))];
                setFilterValues({
                    cities,
                    drinks,
                    foods,
                    specs,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getSpecCafes();
    }, []);

    useEffect(() => {
        const filtered = cafeSpec.filter((cafe) => {
            const titleMatch = cafe.title.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
            const foodMatch = cafe.food.some((food) => food.toLowerCase().includes(searchTerm.toLowerCase()));
            const drinksMatch = cafe.drinks.some((drink) => drink.toLowerCase().includes(searchTerm.toLowerCase()));
            const specsMatch = cafe.specs.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()));
            const cityMatch = cafe.location.city.toLowerCase().includes(searchTerm.toLowerCase());
            const countryMatch = cafe.location.country.toLowerCase().includes(searchTerm.toLowerCase());
            const selectedCityMatch = selectedCity ? cafe.location.city.toLowerCase() === selectedCity.toLowerCase() : true;
            const selectedDrinksMatch = selectedDrink ? cafe.drinks.includes(selectedDrink) : true;
            const selectedFoodMatch = selectedFood ? cafe.food.includes(selectedFood) : true;
            const selectedSpecsMatch = selectedSpec ? cafe.specs.some((spec) => spec.toLowerCase() === selectedSpec.toLowerCase()) : true;

            return (titleMatch || descriptionMatch || cityMatch || countryMatch || foodMatch || drinksMatch || specsMatch) && selectedCityMatch && selectedDrinksMatch && selectedFoodMatch && selectedSpecsMatch;
        });
        setFilteredCafes(filtered);
    }, [searchTerm, selectedCity, selectedDrink, selectedFood, selectedSpec, cafeSpec]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        switch (filterType) {
            case 'city':
                setSelectedCity(value);
                break;
            case 'drink':
                setSelectedDrink(value);
                break;
            case 'food':
                setSelectedFood(value);
                break;
            case 'spec':
                setSelectedSpec(value);
                break;
            default:
                break;
        }
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCity("");
        setSelectedDrink("");
        setSelectedFood("");
        setSelectedSpec("");
        setFilters({ city: "", drink: "", food: "", spec: "" });
    };

    const formatSpecs = (specs) => {
        return specs.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <>
            <Helmet>
                <title>{`${filteredCafes.length} Best Cafes for ${formatSpecs(specs)} | Sweet Spots`}</title>
                <meta name="description" content={`Discover the best cafes for ${formatSpecs(specs)}. Explore our favorite spots.`} />
            </Helmet>
            <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
                {filteredCafes.length} Best cafes for
                <br />
                <span className="text-teal">{formatSpecs(specs)}</span>
            </h1>
            <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
                Carefully curated, discover my favorite coffee shops for {formatSpecs(specs)}. These little gems brought much joy to my heart.
            </p>

            <div className="container mx-auto px-4 mt-8">
                {/* Search and Filters in one line */}
                <div className="flex flex-wrap items-center justify-center mb-6">
                    <div className="w-full md:w-auto mb-8 pr-4 md:mb-8">
                        <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
                    </div>
                    <div>
                        <InlineFilterCafe
                            onCityFilter={(city) => handleFilterChange('city', city)}
                            onDrinkFilter={(drink) => handleFilterChange('drink', drink)}
                            onFoodFilter={(food) => handleFilterChange('food', food)}
                            onSpecFilter={(spec) => handleFilterChange('spec', spec)}
                            cities={filterValues.cities}
                            drinks={filterValues.drinks}
                            foods={filterValues.foods}
                            specs={filterValues.specs}
                            selectedCity={selectedCity}
                            selectedDrink={selectedDrink}
                            selectedFood={selectedFood}
                            selectedSpec={selectedSpec}
                            className="w-full md:w-1/2"
                        />
                    </div>
                </div>
                {/* Filter Tags Container with Reduced Fixed Height */}
                <div className="mt-2 h-10 overflow-y-auto">
                    <div className="flex flex-wrap justify-center">
                        {Object.entries(filters).map(([key, value]) =>
                            value && (
                                <span
                                    key={key}
                                    className="inline-flex items-center border border-gray-300 rounded-full py-0.5 px-2 mr-2 mb-1 text-xs shadow-sm bg-gray-50 hover:bg-white transition duration-300"
                                >
                                    {value}
                                    <button
                                        onClick={() => handleFilterChange(key, "")}
                                        className="ml-1"
                                    >
                                        x
                                    </button>
                                </span>
                            )
                        )}
                        {(selectedCity || selectedDrink || selectedFood || selectedSpec) && (
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center bg-gray-100 border border-gray-300 rounded-full px-2 py-0.5 text-xs shadow-sm hover:bg-gray-200 transition duration-300"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mt-10">
                {filteredCafes.length > 0 ? (
                    filteredCafes.map((cafe) => (
                        <div key={cafe._id} className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5">
                            <div className="relative h-72 w-full max-w-full rounded-2xl border-solid">
                                <Link to={`/cafes/${cafe.urlSlug}`} className="h-full w-full block">
                                    <img src={cafe.image} alt={cafe.title} className="h-full w-full object-cover border-solid rounded-2xl" />
                                </Link>
                                <div className="absolute top-4 right-4 z-20">
                                    <WishlistButton urlSlug={cafe.urlSlug} />
                                </div>
                            </div>
                            <Link to={`/cafes/${cafe.urlSlug}`} className="h-full w-full block mt-4">
                                <p className="font-bold uppercase bg-mint text-gray-800 rounded-full mb-1 mr-1 px-2 py-1 inline-block">
                                    {cafe.location.city}
                                </p>
                                <p className="font-bold uppercase bg-teal text-white rounded-full mb-1 px-2 py-1 inline-block">
                                    {cafe.location.country}
                                </p>
                                <p className="font-bold text-gray-900">{cafe.title}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <TbCoffeeOff size={60} />
                        <p className="mt-2">Meow, no cafes that match your criteria for {formatSpecs(specs)}. Pls change your filter.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default CafeSpecList;
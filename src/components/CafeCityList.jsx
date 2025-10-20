import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import WishlistButton from '../components/WishlistButton';
import CafeCarousel from "../components/CafeCarousel";
import CafeLeafletMaps from "../components/CafeLeafletMapsCafesinOneCity.jsx";
import InlineFilterCafe from "./InlineFilterCafe";
import Searchbar from "./Searchbar";
import FilterPopup from "./PopupFilterCafe";
import { GoFilter } from "react-icons/go";

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async";

function CafeCityList() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { city } = useParams();
    const [cafeCity, setcafeCity] = useState([]);
    const [filteredCafes, setFilteredCafes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDrink, setSelectedDrink] = useState("");
    const [selectedFood, setSelectedFood] = useState("");
    const [selectedSpec, setSelectedSpec] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [favoriteCafes, setFavoriteCafes] = useState([]);

    // State to hold the selected filters' descriptions
    const [filters, setFilters] = useState({
        city: "",
        drink: "",
        food: "",
        spec: "",
    });

    // State to hold the unique filter values
    const [filterValues, setFilterValues] = useState({
        cities: [],
        drinks: [],
        foods: [],
        specs: [],
    });

    const getCityCafes = () => {
        axios.get(`${API_URL}/cafes/city/${city}`)
            .then((response) => {
                setcafeCity(response.data);
                setFilteredCafes(response.data);
                // Extract unique filter options
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
        getCityCafes();
    }, [city]);

    useEffect(() => {
        axios
            .get(`${API_URL}/cafes/city/${city}/favorites`)
            .then((response) => {
                setFavoriteCafes(response.data);
            })
            .catch((error) => console.error("Error fetching favorite cafes:", error));
    }, [city]);

    const favoriteUrlSlugs = favoriteCafes.map((cafe) => cafe.urlSlug);

    // Search through cafes based on search term, city, drinks, food, and specs
    useEffect(() => {
        const filtered = cafeCity.filter((cafe) => {
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
    }, [searchTerm, selectedCity, selectedDrink, selectedFood, selectedSpec, cafeCity]);

    // Handle search input change
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
        // Removed setShowPopup(false) here since FilterPopup has an "Apply" button to close it
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCity("");
        setSelectedDrink("");
        setSelectedFood("");
        setSelectedSpec("");
        setFilters({ city: "", drink: "", food: "", spec: "" });
    };

    // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
    const formatCity = (city) => {
        return city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <>
            <Helmet>
                <title>{`${filteredCafes.length} Best Cafes in ${formatCity(city)} | Sweet Spots`}</title>
                <meta name="description" content={`Discover the best cafes in ${formatCity(city)}. Explore our favorite spots in the city.`} />
            </Helmet>
            <div>
                <div className="bg-black text-white uppercase text-center text-3xl px-0.5 py-3 font-extrabold italic flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Empty left column for desktop spacing (hidden on mobile) */}
                    <div className="hidden md:block md:w-1/3"></div>

                    {/* Center column (headline) */}
                    <div className="flex justify-center md:w-1/3">
                        <h1 className="text-center">
                            Best cafes in
                            <br /><span className="text-teal">{formatCity(city)}</span>
                        </h1>
                    </div>

                    {/* Right column (search bar) */}
                    <div className="flex justify-center md:justify-end md:w-1/3 px-4 mt-4 md:mt-0">
                        <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
                    </div>
                </div>

                <p className="text-1xl pt-10 px-10 flex justify-center text-center">
                    Carefully curated, discover my {filteredCafes.length} favorite coffee shops in {formatCity(city)}. These little gems hold my travel memories in and brought much joy to my heart while exploring {formatCity(city)}'s beauty.
                </p>
                <div className="container mx-auto px-4 mt-6">
                    {/* Filters: Inline on desktop, button on mobile */}
                    <div className="flex flex-wrap items-center justify-center">
                        {/* Desktop: Show inline filters */}
                        <div className="hidden md:flex">
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
                            />
                        </div>
                        {/* Mobile: Show filter button */}
                        <div className="md:hidden flex justify-center">
                            <button
                                onClick={() => setShowPopup(!showPopup)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition duration-200"
                            >
                                <GoFilter size={16} />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Mobile Popup */}
                    {showPopup && (
                        <FilterPopup
                            onCityFilter={(city) => handleFilterChange('city', city)}
                            onDrinkFilter={(drink) => handleFilterChange('drink', drink)}
                            onFoodFilter={(food) => handleFilterChange('food', food)}
                            onSpecFilter={(spec) => handleFilterChange('spec', spec)}
                            cities={filterValues.cities}
                            drinks={filterValues.drinks}
                            foods={filterValues.foods}
                            specs={filterValues.specs}
                            setShowPopup={setShowPopup}
                        />
                    )}

                    {/* Filter Tags Container */}
                    <div className="overflow-y-auto">
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
                                    className="inline-flex items-center bg-gray-100 border border-gray-300 rounded-full py-0.5 px-2 mr-2 mb-1  text-xs shadow-sm hover:bg-gray-200 transition duration-300"
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
                        <p className="flex flex-col text-center items-center text-sm my-10 mb-20 gap-3 italic">
                            Meow, no cafes that match your criteria in {formatCity(city)}. Please change your search or filter.
                        </p>
                    )}
                </div>
                <CafeLeafletMaps cafes={cafeCity} />

                <CafeCarousel urlSlugs={favoriteUrlSlugs} />
            </div>
        </>
    );
}

export default CafeCityList;
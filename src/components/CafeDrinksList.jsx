import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Searchbar from "./Searchbar"
import FilterPopup from "./PopupFilterCafe";
import { GoFilter } from "react-icons/go";
import WishlistButton from '../components/WishlistButton';

// Helmet library for individual SEO title + description
import { Helmet } from "react-helmet-async"

function CafeDrinkList() {
    const API_URL = import.meta.env.VITE_API_URL
    const [filteredCafes, setFilteredCafes] = useState([])
    const [cafeDrinks, setCafeDrinks] = useState([]);
    const { drinks } = useParams();

    //For Filter & Search
    const [cafeTopPick, setcafeTopPick] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedDrink, setSelectedDrink] = useState("")
    const [selectedFood, setSelectedFood] = useState("")
    const [selectedSpec, setSelectedSpec] = useState("")
    const [showPopup, setShowPopup] = useState(false)

    // State to hold the selected filters' descriptions
    const [filters, setFilters] = useState({
        city: "",
        drink: "",
        food: "",
        spec: ""
    })

    // State to hold the unique filter values
    const [filterValues, setFilterValues] = useState({
        cities: [],
        drinks: [],
        foods: [],
        specs: []
    })

    const getCafes = () => {
        axios.get(`${API_URL}/cafes/drinks/${drinks}`)
            .then((response) => {
                setCafeDrinks(response.data)
                setFilteredCafes(response.data)
                const cities = [...new Set(response.data.map(cafe => cafe.location.city))];
                const drinks = [...new Set(response.data.flatMap(cafe => cafe.drinks))];
                const foods = [...new Set(response.data.flatMap(cafe => cafe.food))];
                const specs = [...new Set(response.data.flatMap(cafe => cafe.specs))];

                // Update the filter values
                setFilterValues({
                    cities,
                    drinks,
                    foods,
                    specs
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getCafes()
        setcafeTopPick(cafeDrinks)
    }, [drinks])

    useEffect(() => {
        setcafeTopPick(cafeDrinks)
    }, [cafeDrinks])

    // Capitalize the first letter of each word and keep spaces - For Headline in Frontend
    const formatDrinks = (drinks) => {
        return drinks.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Search through cafes based on search term, city, drinks, food and specs
    useEffect(() => {
        const filtered = cafeTopPick.filter((cafe) => {
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
        })
        setFilteredCafes(filtered)
    }, [searchTerm, selectedCity, selectedDrink, selectedFood, selectedSpec, cafeTopPick])

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    // Handle city filter
    const handleCityFilter = (city) => {
        setSelectedCity(city)
        setFilters((prev) => ({ ...prev, city }))
    }

    // Handle drinks filter
    const handleDrinkFilter = (drink) => {
        setSelectedDrink(drink)
        setFilters((prev) => ({ ...prev, drink }))
    }

    // Handle food filter
    const handleFoodFilter = (food) => {
        setSelectedFood(food)
        setFilters((prev) => ({ ...prev, food }))
    }

    // Handle specs filter
    const handleSpecFilter = (spec) => {
        setSelectedSpec(spec);
        setFilters((prev) => ({ ...prev, spec: spec }));
    }

    // Clear all filters
    const clearFilters = () => {
        setSelectedCity("")
        setSelectedDrink("")
        setSelectedFood("")
        setSelectedSpec("")
        setFilters({ city: "", drink: "", food: "", spec: "" })
    }

    return (
        <>
            <Helmet>
                <title>{`${filteredCafes.length} Best Cafes for ${formatDrinks(drinks)} | Sweet Spots`}</title>
                <meta name="description" content={`Choose your favorite cafe for ${formatDrinks(drinks)}.`} />
            </Helmet>
            <h1 className="bg-black text-white uppercase text-center text-3xl px-0.5 py-0.5 font-extrabold italic">
                <span className="text-teal"> {formatDrinks(drinks)} </span>
                <br /> - your elixir of the day.
            </h1>
            <p className="text-1xl pt-10 px-10 flex justify-center text-center ">
                Craving {formatDrinks(drinks).toLowerCase()}? Explore my {filteredCafes.length} favorite cafes for that.
            </p>

            {/* Search Bar & Filter Toggle Button */}
            <div className="flex justify-center items-center mt-8">

                <div className="flex flex-row items-center space-x-2">
                    <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
                    <button
                        className="py-2 px-4 rounded-full"
                        onClick={() => setShowPopup(true)}
                    >
                        <GoFilter size={40} className=" rounded-full hover:bg-white hover:shadow-lg transition duration-300" />
                    </button>
                </div>

                {/* Popup for Filters */}
                {showPopup && (
                    <FilterPopup
                        onCityFilter={handleCityFilter}
                        onDrinkFilter={handleDrinkFilter}
                        onFoodFilter={handleFoodFilter}
                        onSpecFilter={handleSpecFilter}
                        cities={filterValues.cities}
                        drinks={filterValues.drinks}
                        foods={filterValues.foods}
                        specs={filterValues.specs}
                        setShowPopup={setShowPopup}
                    />
                )}
            </div>

            {/* Display selected filters */}
            <div className="px-7">
                {Object.entries(filters).map(([key, value]) =>
                    value ? (
                        <span key={key} className="inline-block border border-grey py-0.5 px-2 mr-2 mb-2 text-sm shadow-md hover:bg-white hover:shadow-lg transition duration-300">
                            {value}
                            <button
                                onClick={() => {
                                    // Clear individual filter
                                    setFilters((prev) => ({ ...prev, [key]: "" }));
                                }}
                                className="ml-2"
                            >
                                x
                            </button>
                        </span>
                    ) : null
                )}
                {(filters.city || filters.drink || filters.food || filters.spec) && (
                    <button
                        onClick={clearFilters}
                        className="bg-grey border border-grey px-2 py-0.5 mt-1 text-sm shadow-md hover:bg-mint hover:shadow-lg transition duration-300"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            <div className="pt-0 pb-7 px-7 flex flex-wrap justify-center mb-20 mt-10">
                {filteredCafes.length > 0 ? (
                    filteredCafes.map((cafe) => (
                        <div key={cafe._id} className="mb-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-5 mb-5" >
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
                        Meow, no cafes that match your criteria. Please change your search or filter.
                    </p>
                )}
            </div>
        </>
    )
}

export default CafeDrinkList
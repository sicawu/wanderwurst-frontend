import CafedrinksList from "../components/CafeDrinksList"

function FilterByDrinksPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;

    return (
        <>
            <CafedrinksList />
        </>
    )
}

export default FilterByDrinksPage
import CafeFoodList from "../components/CafeFoodList"

function FilterByFoodPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;

    return (
        <>
            <CafeFoodList />
        </>
    )
}

export default FilterByFoodPage
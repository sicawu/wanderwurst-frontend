import CafeSpecsList from "../components/CafeSpecsList"

function FilterBySpecsPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;

    return (
        <>
            <CafeSpecsList />
        </>
    )
}

export default FilterBySpecsPage
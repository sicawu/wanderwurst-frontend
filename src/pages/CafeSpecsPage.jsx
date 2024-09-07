import CafeSpecsList from "../components/CafeSpecsList"
import { useNavigate } from "react-router-dom"

function FilterBySpecsPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;
    const navigate = useNavigate();

    return (
        <>
            <CafeSpecsList />
        </>
    )
}

export default FilterBySpecsPage
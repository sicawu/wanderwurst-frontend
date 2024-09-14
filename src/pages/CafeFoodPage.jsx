import CafeFoodList from "../components/CafeFoodList"
import { useNavigate } from "react-router-dom"

function FilterByFoodPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;
    const navigate = useNavigate();

    return (
        <>
            <CafeFoodList />
        </>
    )
}

export default FilterByFoodPage
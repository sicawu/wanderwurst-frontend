import CafeCityList from "../components/CafeCityList"
import { useNavigate } from "react-router-dom"

function CafeCityPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;
    const navigate = useNavigate();

    return (
        <>
            <CafeCityList />
        </>
    )
}

export default CafeCityPage
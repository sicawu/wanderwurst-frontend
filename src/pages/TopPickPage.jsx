import TopPickList from "../components/TopPickList"
import { useNavigate } from "react-router-dom"

function TopPickPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;
    const navigate = useNavigate();

    return (
        <>
            <TopPickList />
        </>
    )
}

export default TopPickPage
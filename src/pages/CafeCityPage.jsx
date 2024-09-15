import CafeCityList from "../components/CafeCityList"

function CafeCityPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;

    return (
        <>
            <CafeCityList />
        </>
    )
}

export default CafeCityPage
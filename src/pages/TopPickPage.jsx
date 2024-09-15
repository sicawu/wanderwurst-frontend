import TopPickList from "../components/CafeTopPickList"

function TopPickPage() {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedIn = storedToken !== null;

    return (
        <>
            <TopPickList />
        </>
    )
}

export default TopPickPage
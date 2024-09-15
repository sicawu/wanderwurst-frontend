import CafeList from "../components/CafeAllList"
import { useNavigate } from "react-router-dom"

function BestCafesPage() {
  const storedToken = localStorage.getItem("authToken");
  const isLoggedIn = storedToken !== null;

  return (
    <>
      <CafeList />
    </>
  )
}

export default BestCafesPage
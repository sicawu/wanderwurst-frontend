import { Routes, Route } from "react-router-dom"
import "./App.css"
import "./index.css"

// Import of pages
import HomePage from "./pages/Homepage"
import BestCafesPage from "./pages/BestCafesPage.jsx"
import CafeDetailsPage from "./pages/CafeDetailPage.jsx"
import FilterBySpecsPage from "./pages/FilteredSpecsPage.jsx"
import BestRestaurantsPage from "./pages/BestRestaurantsPage.jsx"
import NotFoundPage from "./pages/NotFoundPage"

// Import of all components
import NavBar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/best-cafes" element={<BestCafesPage />} />
      <Route path="/cafes/:urlSlug" element={<CafeDetailsPage />} />
      <Route path="/best-cafes/:specs" element={<FilterBySpecsPage />} />  {/* All cafes for one specific spec, e.g. cosy*/}
      <Route path="/best-restaurants" element={<BestRestaurantsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </>
  )
}

export default App

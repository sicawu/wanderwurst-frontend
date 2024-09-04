import { Routes, Route } from "react-router-dom"
import "./App.css"
import "./index.css"

// Import of pages
import HomePage from "./pages/Homepage"
import BestCafesPage from "./pages/BestCafesPage.jsx"
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
      <Route path="/best-restaurants" element={<BestRestaurantsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </>
  )
}

export default App

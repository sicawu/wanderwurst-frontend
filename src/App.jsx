import { Routes, Route } from "react-router-dom"
import "./App.css"
import "./index.css"

// For SEO Titles & Descriptions
import { HelmetProvider } from "react-helmet-async"

// Import of pages
import HomePage from "./pages/HomePage.jsx"
import BestCafesPage from "./pages/BestCafesPage.jsx"
import CafeDetailsPage from "./pages/CafeDetailPage.jsx"
import CafeSpecsPage from "./pages/CafeSpecsPage.jsx"
import CafeCityPage from "./pages/CafeCityPage.jsx"
import TopPickPage from "./pages/TopPickPage.jsx"
import CafeDrinksPage from "./pages/CafeDrinksPage.jsx"
import CafeFoodPage from "./pages/CafeFoodPage.jsx"
import BestRestaurantsPage from "./pages/BestRestaurantsPage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"
import RandomCafePage from "./pages/RandomCafePage.jsx"
import LegalNotice from "./pages/LegalNotice.jsx"
import DataPrivacy from "./pages/DataPrivacy.jsx"




// Import of all components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <HelmetProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cafes/:urlSlug" element={<CafeDetailsPage />} />
          <Route path="/best-cafes" element={<BestCafesPage />} />
          <Route path="/best-cafes/:specs" element={<CafeSpecsPage />} />  {/* All cafes for one specific spec, e.g. cosy*/}
          <Route path="/best-cafes/city/:city" element={<CafeCityPage />} />  {/* All cafes for one specific city, e.g. Bangkok*/}
          <Route path="/best-cafes/for/:toppick" element={<TopPickPage />} />  {/* All cafes for one specific purpose, e.g. Working, Brunch with the Girlies*/}
          <Route path="/best-cafes/drinks/:drinks" element={<CafeDrinksPage />} />  {/* All cafes for one specific drinks option, e.g. juices, smoothies*/}
          <Route path="/best-cafes/food/:food" element={<CafeFoodPage />} />  {/* All cafes for one specific food option, e.g. vegan, vegetarian*/}
          <Route path="/best-restaurants" element={<BestRestaurantsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/random" element={<RandomCafePage />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/data-privacy" element={<DataPrivacy />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </>
  )
}

export default App

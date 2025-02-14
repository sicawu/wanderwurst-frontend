import { Routes, Route } from "react-router-dom"
import React, { useState } from "react"

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
import AboutPage from "./pages/AboutPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"
import RandomCafePage from "./pages/RandomCafePage.jsx"
import LegalNotice from "./pages/LegalNotice.jsx"
import DataPrivacy from "./pages/DataPrivacy.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"

// Login & User profile
import LogInPage from "./pages/LogInPage.jsx"
import MySpacePage from "./pages/MySpacePage.jsx"
import MySpacePublicPage from "./pages/MySpacePublicPage.jsx"

// GA Tracking Hooks & Consent Banner
import usePageView from "./hooks/usePageView"
import useLinkTracking from "./hooks/useLinkTracking"
import CookieConsentBanner from './components/CookieConsentBanner'

// Import of all components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MySpace from "./components/MySpace"


function App() {
  usePageView()
  useLinkTracking()
  const [profile, setProfile] = useState(null);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || [])

  const updateWishlist = (urlSlug, isWished) => {
    let newWishlist = [...wishlist];
    if (isWished) {
      // Remove from wishlist
      newWishlist = newWishlist.filter(item => item !== urlSlug);
    } else {
      // Add to wishlist
      newWishlist.push(urlSlug);
    }
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };
  return (
    <>
      <CookieConsentBanner />
      <HelmetProvider>
        <ScrollToTop />
        <Navbar profile={profile} setProfile={setProfile} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cafes/:urlSlug" element={<CafeDetailsPage wishlist={wishlist} updateWishlist={updateWishlist} />} />
          <Route path="/best-cafes" element={<BestCafesPage />} />
          <Route path="/best-cafes/:specs" element={<CafeSpecsPage />} />  {/* All cafes for one specific spec, e.g. cosy*/}
          <Route path="/best-cafes/city/:city" element={<CafeCityPage />} />  {/* All cafes for one specific city, e.g. Bangkok*/}
          <Route path="/best-cafes/for/:toppick" element={<TopPickPage />} />  {/* All cafes for one specific purpose, e.g. Working, Brunch with the Girlies*/}
          <Route path="/best-cafes/drinks/:drinks" element={<CafeDrinksPage />} />  {/* All cafes for one specific drinks option, e.g. juices, smoothies*/}
          <Route path="/best-cafes/food/:food" element={<CafeFoodPage />} />  {/* All cafes for one specific food option, e.g. vegan, vegetarian*/}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/random" element={<RandomCafePage />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/data-privacy" element={<DataPrivacy />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/my-space" element={<MySpace profile={profile} setProfile={setProfile} wishlist={wishlist} updateWishlist={updateWishlist} />} />
          <Route path="/user/:publicId" element={<MySpacePublicPage />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </>
  )
}

export default App

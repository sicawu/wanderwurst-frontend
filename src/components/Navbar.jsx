import React, { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, useNavigate } from "react-router-dom"
import { GiBalloonDog } from "react-icons/gi"
import { Navigate } from "react-router-dom"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

function NavBar() {
  const { isAuthenticated, user, isLoggedIn, logOutUser } =
    useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="sticky bg-darkgreen bg-opacity-70 text-white shadow-md py-3 flex flex-row w-screen items-center justify-between">
      <div className="flex items-center mr-7">
        <Link className="flex items-center px-2 py-0.5" to="/">
          <GiBalloonDog size={30} />
        </Link>
      </div>
      <div className="flex items-center mr-7">
        {isLoggedIn ? (
          <>
            <Link to="/best-cafes" className="ml-4 font-extrabold">
              Explore
            </Link>
            <p className="mx-2.5">|</p>
            <button
              onClick={() => navigate(`/cafes/add`)}
              className="font-bold"
            >
              Add Cafe
            </button>
          </>
        ) : (
          <>
            <Link to="/best-cafes" className="ml-4">
              All Cafes
            </Link>
            <p className="ml-4">
              |
            </p>
            <Link to="/random" className="ml-4 font-bold">
              <GiPerspectiveDiceSixFacesRandom size={30} className=" border shadow-md rounded-full" />
            </Link>
          </>
        )}
      </div>

      {/* Login & Logout functionality - toggle between buttons
      {isLoggedIn === false ? (
        <div className="flex items-center">
          <Link to="/signup" className="mr-8 italic">
            Signup
          </Link>
          <Link to="/login" className="font-bold underline mr-8">
            Login
          </Link>
        </div>
      ) : (
        <div className="flex items-center">
          <p className="mr-8 italic">Hi, {user.name}!</p>
          <Link onClick={logOutUser} className="font-bold underline mr-8">
            Logout
          </Link>
        </div>
      )} */}
    </div>
  )
}

export default NavBar
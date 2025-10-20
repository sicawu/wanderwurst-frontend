import React from "react";
import { FiSearch } from "react-icons/fi";

function Searchbar({ searchTerm, handleSearch }) {
  return (
    <div className="flex justify-center md:justify-end sm:justify-center w-1/3 px-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search cafés..."
          className="rounded-full border border-gray-300 bg-white text-black text-sm py-1.5 pl-3 pr-8 w-40 focus:outline-none focus:ring-2 focus:ring-teal transition"
        />
        <button
          type="button"
          className="absolute right-2 top-4 text-gray-500 hover:text-black"
          onClick={() => handleSearch({ target: { value: "" } })}
        >
          <FiSearch size={14} />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
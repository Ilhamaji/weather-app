import React, { useState } from "react";

const SearchBar = ({ onSearch, onLocation }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="flex w-full space-x-2 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/50 dark:border-white/10 transition-all z-20 relative">
      <form
        onSubmit={handleSearch}
        className="flex-1 flex bg-white/40 dark:bg-black/40 rounded-xl overflow-hidden shadow-inner focus-within:ring-2 ring-blue-400"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city or city, countryId (jakarta, id)..."
          className="w-full bg-transparent border-none outline-none py-3 px-4 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-300 font-semibold"
        />
        <button
          type="submit"
          className="px-6 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 rounded-r-xl font-bold shadow-md"
        >
          Search
        </button>
      </form>
      <button
        onClick={onLocation}
        className="flex items-center justify-center px-4 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/30 transition-all rounded-xl shadow-md text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        title="Use my current location"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;

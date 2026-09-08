import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

const SearchBar = ({ onSearch, onLocation }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!city.trim() || city.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${GEO_URL}?q=${encodeURIComponent(city.trim())}&limit=5&appid=${API_KEY}`
        );
        setSuggestions(res.data || []);
        setIsOpen(true);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setIsOpen(false);
    }
  };

  const handleSelect = (item) => {
    const locationName = item.state
      ? `${item.name}, ${item.state}, ${item.country}`
      : `${item.name}, ${item.country}`;
    setCity(locationName);
    onSearch(locationName);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="w-full relative z-30">
      <div className="flex w-full space-x-2 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/50 dark:border-white/10 transition-all">
        <form
          onSubmit={handleSearch}
          className="flex-1 flex bg-white/40 dark:bg-black/40 rounded-xl overflow-hidden shadow-inner focus-within:ring-2 ring-blue-400"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder="Search for a city or country..."
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

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 dark:border-slate-700/50 overflow-hidden z-50 animate-fade-in-up">
          {isLoading ? (
            <div className="p-4 text-center text-gray-600 dark:text-gray-300 text-sm font-medium">
              Searching locations...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="divide-y divide-gray-200/50 dark:divide-gray-700/50 max-h-60 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <li
                  key={`${item.lat}-${item.lon}-${idx}`}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-3 cursor-pointer hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors flex items-center justify-between text-gray-800 dark:text-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-blue-500"
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
                    <span className="font-semibold">{item.name}</span>
                    {item.state && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({item.state})
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    {item.country}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              No matching locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

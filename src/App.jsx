import React, { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import About from "./components/About";
import "./App.css";

function App() {
  const { data, forecast, loading, error, searchByCity, getByLocation } = useWeather("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("weather"); // 'weather' or 'about'

  useEffect(() => {
    // Check local storage for theme preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };
  
  const getBackground = () => {
    if (!data) return "from-blue-200 to-cyan-200 dark:from-slate-800 dark:to-slate-900";
    
    // Convert current UTC time to API location's local time using timezone shift (in seconds)
    const localDate = new Date();
    const utcTime = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
    const apiLocalTime = new Date(utcTime + (data.timezone * 1000));
    
    const hour = apiLocalTime.getHours();
    const isNight = hour >= 18 || hour <= 5;
    const main = data.weather[0].main.toLowerCase();

    if (isNight) return "from-slate-900 via-purple-900 to-indigo-900";
    if (main.includes("clear")) return "from-blue-400 to-blue-200 dark:from-blue-900 dark:to-slate-800";
    if (main.includes("cloud")) return "from-slate-400 to-slate-200 dark:from-slate-800 dark:to-slate-700";
    if (main.includes("rain") || main.includes("drizzle")) return "from-slate-700 to-slate-500 dark:from-slate-900 dark:to-slate-800";
    if (main.includes("snow")) return "from-blue-100 to-white dark:from-slate-700 dark:to-slate-600";
    return "from-blue-300 to-cyan-100 dark:from-slate-800 dark:to-slate-700";
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${getBackground()} transition-colors duration-1000 p-4 sm:p-8 flex items-center justify-center font-sans relative overflow-hidden`}>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end space-y-4 z-50">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/50 dark:border-white/10 p-3 rounded-full shadow-lg text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform"
          title="Toggle Light/Dark Mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.773l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>

        {/* About Toggle Button */}
        <button 
          onClick={() => setCurrentView(currentView === "weather" ? "about" : "weather")}
          className="bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/50 dark:border-white/10 p-3 rounded-full shadow-lg text-gray-800 dark:text-blue-400 hover:scale-110 transition-transform flex items-center justify-center"
          title={currentView === "weather" ? "About Developer" : "Back to Weather"}
        >
          {currentView === "weather" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto shadow-2xl rounded-[40px] overflow-hidden bg-white/10 dark:bg-black/20 backdrop-blur-lg border p-6 sm:p-10 z-10 box-border border-white/20 dark:border-white/5 transition-colors duration-500">
        {currentView === "about" ? (
          <About onBack={() => setCurrentView("weather")} />
        ) : (
          <>
            <SearchBar onSearch={searchByCity} onLocation={getByLocation} />
            
            {loading && (
              <div className="flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white drop-shadow-md"></div>
              </div>
            )}

            {!loading && error && (
              <div className="mt-8 bg-red-100/90 dark:bg-red-900/80 backdrop-blur-md border border-red-400 dark:border-red-500 text-red-700 dark:text-red-100 px-6 py-4 rounded-2xl shadow-lg relative flex items-center animate-fade-in-up">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <strong className="font-bold block text-lg">Error Occurred</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              </div>
            )}

            {!loading && !error && data && (
              <div className="animate-fade-in-up">
                <CurrentWeather data={data} />
                <WeatherDetails data={data} />
                <HourlyForecast forecast={forecast} />
                <Forecast forecast={forecast} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

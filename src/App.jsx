import React from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const { data, forecast, loading, error, searchByCity, getByLocation } = useWeather("");
  
  const getBackground = () => {
    if (!data) return "from-blue-200 to-cyan-200";
    const main = data.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour <= 5;

    if (isNight) return "from-slate-900 via-purple-900 to-indigo-900";
    if (main.includes("clear")) return "from-blue-400 to-blue-200";
    if (main.includes("cloud")) return "from-slate-400 to-slate-200";
    if (main.includes("rain") || main.includes("drizzle")) return "from-slate-700 to-slate-500";
    if (main.includes("snow")) return "from-blue-100 to-white";
    return "from-blue-300 to-cyan-100";
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${getBackground()} transition-colors duration-1000 p-4 sm:p-8 flex items-center justify-center font-sans relative overflow-hidden`}>
      <div className="w-full max-w-4xl mx-auto shadow-2xl rounded-[40px] overflow-hidden bg-white/10 backdrop-blur-lg border p-6 sm:p-10 z-10 box-border border-white/20">
        <SearchBar onSearch={searchByCity} onLocation={getByLocation} />
        
        {loading && (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white drop-shadow-md"></div>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 bg-red-100/90 backdrop-blur-md border border-red-400 text-red-700 px-6 py-4 rounded-2xl shadow-lg relative flex items-center animate-fade-in-up">
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
            <Forecast forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

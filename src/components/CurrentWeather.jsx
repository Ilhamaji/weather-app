import React, { useState, useEffect } from 'react';

const CurrentWeather = ({ data }) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    // Determine the local time from the API data instead of the user machine
    const updateTime = () => {
      const utcDate = new Date();
      const utcTime = utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000);
      const apiLocalTime = new Date(utcTime + (data.timezone * 1000));
      
      setTimeStr(apiLocalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDateStr(apiLocalTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [data.timezone]);

  if (!data) return null;

  const { name, main, weather, sys } = data;
  const { temp } = main;
  const weatherIcon = weather[0].icon;
  const weatherDesc = weather[0].description;
  const country = sys.country;

  return (
    <div className="flex flex-col items-center mt-6 p-6 sm:p-8 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/60 dark:border-white/10 text-center relative overflow-hidden transition-all duration-500">
      <div className="flex flex-col sm:flex-row justify-between w-full mb-6 relative z-10">
        <div className="text-left mb-2 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">{name}, {country}</h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mt-1">{dateStr}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 bg-white/40 dark:bg-black/40 px-4 py-1 rounded-full shadow-sm inline-block transition-colors">{timeStr}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center w-full relative z-10 space-y-4 sm:space-y-0 sm:space-x-8">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`} 
          alt={weatherDesc}
          className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl animate-pulse"
          crossOrigin="anonymous"
        />
        <div className="flex flex-col items-center sm:items-start text-gray-900 dark:text-white">
          <div className="text-7xl sm:text-8xl font-black drop-shadow-lg tracking-tighter">
            {Math.round(temp)}°<span className="text-5xl sm:text-6xl text-gray-800 dark:text-gray-200 font-bold">C</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold capitalize mt-2 text-gray-800 dark:text-gray-100 drop-shadow-md bg-white/40 dark:bg-black/40 px-6 py-2 rounded-2xl w-max transition-colors">
            {weatherDesc}
          </div>
        </div>
      </div>
      
      {/* Decorative Blur blob */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 dark:bg-yellow-500 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default CurrentWeather;

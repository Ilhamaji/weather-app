import React from 'react';

const HourlyForecast = ({ forecast }) => {
  if (!forecast || !forecast.hourly) return null;

  return (
    <div className="mt-8 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/50 dark:border-white/10 transition-all">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b-2 border-gray-900/10 dark:border-white/10 pb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-700 dark:text-yellow-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Today's Hourly Forecast
      </h3>
      <div className="flex flex-row overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
        {forecast.hourly.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          const desc = item.weather[0].main;
          const icon = item.weather[0].icon;

          return (
            <div key={index} className="flex flex-col items-center min-w-[90px] p-4 bg-white/40 dark:bg-black/40 hover:bg-white/70 dark:hover:bg-black/60 transition-colors rounded-2xl shadow-sm border border-white/50 dark:border-white/10 snap-center cursor-pointer">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-md">{timeStr}</p>
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} className="w-14 h-14 drop-shadow-md my-1" />
              <p className="text-lg font-black text-gray-900 dark:text-white">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;

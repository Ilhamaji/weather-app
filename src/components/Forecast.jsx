import React from 'react';

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  return (
    <div className="mt-8 bg-white/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/50 transition-all">
      <h3 className="text-2xl font-black mb-6 text-gray-900 border-b-2 border-gray-900/10 pb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 mr-2 text-indigo-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        5-Day Forecast
      </h3>
      <div className="flex flex-row overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
        {forecast.list.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const desc = item.weather[0].main;
          const icon = item.weather[0].icon;

          return (
            <div key={index} className="flex flex-col items-center min-w-[100px] p-4 bg-white/40 hover:bg-white/70 transition-colors rounded-2xl shadow-sm border border-white/50 snap-center cursor-pointer">
              <p className="font-extrabold text-gray-800 text-lg uppercase">{dayName}</p>
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} className="w-16 h-16 drop-shadow-md my-2" />
              <p className="text-xl font-black text-gray-900">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;

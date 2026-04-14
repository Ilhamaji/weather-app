import React from 'react';

const WeatherDetails = ({ data }) => {
  if (!data) return null;

  const { main, wind, visibility } = data;
  
  const details = [
    { label: 'Feels Like', value: `${Math.round(main.feels_like)}°C`, icon: '🌡️' },
    { label: 'Humidity', value: `${main.humidity}%`, icon: '💧' },
    { label: 'Wind Speed', value: `${wind.speed} m/s`, icon: '💨' },
    { label: 'Pressure', value: `${main.pressure} hPa`, icon: '🔽' },
    { label: 'Visibility', value: `${(visibility / 1000).toFixed(1)} km`, icon: '👁️' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {details.map((detail, index) => (
        <div key={index} className="flex flex-col items-center p-4 py-6 bg-white/40 backdrop-blur-lg rounded-3xl shadow-[0_4px_16px_0_rgba(31,38,135,0.1)] border border-white/60 transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <div className="text-4xl mb-3">{detail.icon}</div>
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">{detail.label}</p>
          <p className="text-xl font-extrabold text-gray-900 mt-1">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;

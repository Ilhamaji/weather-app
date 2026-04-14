import React from 'react';

const About = ({ onBack }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 dark:bg-black/20 dark:hover:bg-black/40 transition-colors text-gray-800 dark:text-white shadow-sm border border-white/50 dark:border-white/10"
          title="Back to Weather"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white drop-shadow-sm">About the Developer</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-[32px] p-8 border border-white/50 dark:border-white/10 shadow-xl flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 mb-6 shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
               {/* Placeholder or local image */}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ilham Aji</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium">Web Developer & Design Enthuasiast</p>
          
          <div className="w-full h-px bg-white/20 dark:bg-white/5 mb-6"></div>
          
          <a 
            href="https://instagram.com/ilhmsap" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>@ilhmsap</span>
          </a>
        </div>

        {/* Info Card */}
        <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-[32px] p-8 border border-white/50 dark:border-white/10 shadow-xl">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            This modern weather application provides real-time updates and forecasts with a focus on premium user experience and aesthetics. Built with React, Tailwind CSS, and OpenWeather API.
          </p>
          
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h4>
          <ul className="space-y-3">
            {[
              "Dynamic Atmospheric Backgrounds",
              "Glassmorphism Design System",
              "Dark & Light Mode Support",
              "Interactive Forecast Sections",
              "Geolocation Integration"
            ].map((feature, i) => (
              <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

# <img src="public/weather_favicon.png" alt="Logo" width="42" height="42" align="top" /> Weather App

A modern, responsive weather dashboard that provides real-time atmospheric data for cities around the world. Designed with a focus on simplicity and clean data visualization.

**Demo:** [https://m-cuaca.netlify.app](https://m-cuaca.netlify.app)

## 🚀 Features

  * **Global Search**: Get weather information for any city in the world.
  * **Real-time Data**: Displays current temperature, weather conditions (clouds, rain, sun), humidity, and wind speed.
  * **Dynamic Backgrounds**: Visuals that change based on the current weather status (e.g., sunny, rainy, or night mode).
  * **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.

## 🛠️ Built With

  * **Frontend**: React.js / Vite
  * **Styling**: Tailwind CSS
  * **Data Source**: [OpenWeatherMap API](https://openweathermap.org/api)
  * **Icons**: FontAwesome / Lucide React

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Ilhamaji/weather-app.git
    cd weather-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your OpenWeather API key:

    ```env
    VITE_OPENWEATHER_API_KEY=your_api_key_here
    ```

## 📋 Usage

To start the local development server:

```bash
npm run dev
```

## 📊 API Reference

This app uses the **Current Weather Data** endpoint from OpenWeatherMap:

  * **Units**: Metric (Celsius)
  * **Endpoints**: `/weather?q={city name}&appid={API key}`

## 🤝 Contributing

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`).
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`).
4.  Push to the Branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the **MIT License**. See the `LICENSE` file for more information.

## ✉️ Contact

**Ilham Aji** - [GitHub Profile](https://www.google.com/search?q=https://github.com/Ilhamaji)  
Project Link: [https://github.com/Ilhamaji/weather-app](https://www.google.com/search?q=https://github.com/Ilhamaji/weather-app)

-----

*Disclaimer: This project is built for educational purposes and as a portfolio piece for web development.*

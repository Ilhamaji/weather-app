import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = (defaultCity = "Surakarta") => {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (query, isCoords = false) => {
    setLoading(true);
    setError(null);
    try {
      const endpoints = isCoords
        ? {
            weather: `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`,
            forecast: `${BASE_URL}/forecast?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`,
          }
        : {
            weather: `${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric`,
            forecast: `${BASE_URL}/forecast?q=${query}&appid=${API_KEY}&units=metric`,
          };

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(endpoints.weather),
        axios.get(endpoints.forecast),
      ]);

      setData(weatherRes.data);
      
      // Filter list data to show 5 items for the next day, since forecast gives 3 hour intervals (8 elements per day).
      // Approximating 1 per day by jumping 8 elements.
      const dailyForecast = forecastRes.data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      
      setForecast({ city: forecastRes.data.city, list: dailyForecast });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "City not found or unable to fetch data"
      );
      setData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCity = (city) => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };
  const getByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(
          { lat: position.coords.latitude, lon: position.coords.longitude },
          true
        );
      },
      (geoErr) => {
        // Jika akses lokasi ditolak, berikan fallback default (misal Jakarta)
        fetchWeather("Jakarta");
      }
    );
  }, [fetchWeather]);

  useEffect(() => {
    if (defaultCity) {
      fetchWeather(defaultCity);
    } else {
      getByLocation();
    }
  }, [fetchWeather, defaultCity, getByLocation]);

  return { data, forecast, loading, error, searchByCity, getByLocation };
};

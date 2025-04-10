import React, { useEffect, useState } from "react";
import { Cloud, Sun, Wind, Droplets } from "lucide-react";
import axios from "axios";

const Weather = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (err) => {
          // console.error("Geolocation error:", err);
          setError("Location access denied. Using default location (Delhi).");
          fetchWeather(28.6139, 77.209); // Default to Delhi
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      fetchWeather(28.6139, 77.209); // Default to Delhi
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      // Fetch current weather
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const dailyForecast = forecastResponse.data.list.filter(
        (_, index) => index % 8 === 0
      );

      setForecastData(dailyForecast.slice(0, 5));
    } catch (error) {
      // console.error("Error fetching weather data:", error);
    }
  };

  // Function to get weather icon
  const getWeatherIcon = (icon) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Weather Information
        </h1>

        {error && <p className="text-red-600">{error}</p>}

        {/* Current Weather */}
        {weatherData && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex  justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Current Weather</h2>
                <p className="text-gray-600">
                  {weatherData.name}, {weatherData.sys.country}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">
                  {weatherData.main.temp}°C
                </div>
                <p className="text-gray-600 capitalize">
                  {weatherData.weather[0].description}
                </p>
                <img
                  src={getWeatherIcon(weatherData.weather[0].icon)}
                  alt="weather icon"
                  className="w-16 h-16 mx-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <Droplets className="h-8 w-8 mx-auto text-blue-500" />
                <p className="mt-2 text-sm text-gray-600">Humidity</p>
                <p className="font-bold">{weatherData.main.humidity}%</p>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 mx-auto text-gray-500" />
                <p className="mt-2 text-sm text-gray-600">Wind</p>
                <p className="font-bold">
                  {(weatherData.wind.speed * 3.6).toFixed(1)} km/h
                </p>
              </div>
              <div className="text-center">
                <Cloud className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Cloud Cover</p>
                <p className="font-bold">{weatherData.clouds.all}%</p>
              </div>
              <div className="text-center">
                <Sun className="h-8 w-8 mx-auto text-yellow-500" />
                <p className="mt-2 text-sm text-gray-600">Pressure</p>
                <p className="font-bold">{weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecastData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">5-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecastData.map((day, index) => {
                const date = new Date(day.dt * 1000);
                return (
                  <div
                    key={index}
                    className="text-center p-4 border rounded-lg"
                  >
                    <p className="font-medium">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <img
                      src={getWeatherIcon(day.weather[0].icon)}
                      alt="weather icon"
                      className="w-12 h-12 mx-auto"
                    />
                    <p className="font-bold">{Math.round(day.main.temp)}°C</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {day.weather[0].description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Weather Advisory */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Farming Advisory</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">Ideal for Planting</h3>
              <p className="text-green-700">
                Current weather conditions are suitable for planting wheat and
                vegetables.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800">Irrigation Alert</h3>
              <p className="text-yellow-700">
                Consider irrigation in the evening due to high daytime
                temperatures.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">Pest Warning</h3>
              <p className="text-blue-700">
                High humidity levels may increase pest activity. Monitor your
                crops closely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

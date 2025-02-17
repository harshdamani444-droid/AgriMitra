import React from "react";
import { Cloud, Sun, Wind, Droplets } from "lucide-react";

const Weather = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Weather Information
        </h1>

        {/* Current Weather */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Current Weather</h2>
              <p className="text-gray-600">Mumbai, Maharashtra</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">28°C</div>
              <p className="text-gray-600">Partly Cloudy</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto text-blue-500" />
              <p className="mt-2 text-sm text-gray-600">Humidity</p>
              <p className="font-bold">65%</p>
            </div>
            <div className="text-center">
              <Wind className="h-8 w-8 mx-auto text-gray-500" />
              <p className="mt-2 text-sm text-gray-600">Wind</p>
              <p className="font-bold">12 km/h</p>
            </div>
            <div className="text-center">
              <Cloud className="h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Cloud Cover</p>
              <p className="font-bold">40%</p>
            </div>
            <div className="text-center">
              <Sun className="h-8 w-8 mx-auto text-yellow-500" />
              <p className="mt-2 text-sm text-gray-600">UV Index</p>
              <p className="font-bold">6</p>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">7-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              return (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <p className="font-medium">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <Sun className="h-8 w-8 mx-auto my-2 text-yellow-500" />
                  <p className="font-bold">
                    {Math.round(25 + Math.random() * 5)}°C
                  </p>
                  <p className="text-sm text-gray-600">Sunny</p>
                </div>
              );
            })}
          </div>
        </div>

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

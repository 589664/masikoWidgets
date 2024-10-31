import React from "react";
import logo from "./logo.svg";
import { useTheme } from "./ThemeContext";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";

import "./App.css";

function App() {
  // Using custom hook to access theme context
  const { theme, toggleTheme } = useTheme();

  const weatherData = {
    city: "Bergen",
    temperature: 12,
    feelsLikeTemperature: 10,
    condition: "Cloudy",
    humidity: 80,
    rainAmount: 3, // mm of rain
    windSpeed: 5, // m/s
    windDirection: "NW", // North-West direction
  };

  return (
    <div className="App">
      {/* Button to toggle between light and dark modes */}
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Weather Widget Component */}
      <WeatherWidget
        city={weatherData.city}
        temperature={weatherData.temperature}
        feelsLikeTemperature={weatherData.feelsLikeTemperature}
        condition={weatherData.condition}
        humidity={weatherData.humidity}
        rainAmount={weatherData.rainAmount}
        windSpeed={weatherData.windSpeed}
        windDirection={weatherData.windDirection}
      />
    </div>
  );
}

export default App;

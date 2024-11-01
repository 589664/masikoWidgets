import { useState } from "react";
import { useTheme } from "./ThemeContext";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";
import getWeatherData, { WeatherData } from "./services/WeatherDataAPI";
import SunriseService, { SunTimes } from "./services/SunService";

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
    rainAmount: 30, // mm of rain
    windSpeed: 15, // m/s
    windDirection: "NW", // North-West direction
  };

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [sunTimes, setSunTimes] = useState<SunTimes>({
    sunrise: null,
    sunset: null,
  });

  const handleFetchWeather = async () => {
    const weatherData = await getWeatherData(60.39, 5.32); // Example coordinates for Bergen
    const sunData = await SunriseService.getSunriseSunset(
      60.39,
      5.32,
      "2024-10-31",
      "+01:00"
    );
    if (weatherData && sunData) {
      setSunTimes(sunData);
      setWeather(weatherData);
      console.log("Fetched Sun data:", sunData);
      console.log("Fetched Weather Data:", weatherData); // Log the weather data to the console
    } else {
      console.error("Failed to fetch weather data");
    }
  };

  return (
    <div className="App">
      {/* Button to toggle between light and dark modes */}
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <button onClick={handleFetchWeather}>Fetch Weather Data</button>

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

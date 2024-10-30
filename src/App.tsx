import React from "react";
import logo from "./logo.svg";
import { useTheme } from "./ThemeContext";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";
import "./App.css";

function App() {
  // Using custom hook to access theme context
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App">
      {/* Button to toggle between light and dark modes */}
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Weather Widget Component */}
      <WeatherWidget
        city="Bergen"
        temperature={12}
        condition="Sunny"
        humidity={50}
        windSpeed={10}
      />
    </div>
  );
}

export default App;

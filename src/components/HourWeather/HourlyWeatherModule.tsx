import React from "react";
import HourlyWeatherRow from "./HourlyWeatherRow";
import "./HourlyWeatherModule.css";

interface HourlyWeatherData {
  time: string;
  weatherIcon: React.ReactNode;
  temperature: number;
  windSpeed: number;
  windGust: number;
  windDirection: string;
}

interface HourlyWeatherModuleProps {
  forecast: HourlyWeatherData[];
}

const HourlyWeatherModule: React.FC<HourlyWeatherModuleProps> = ({
  forecast,
}) => {
  return (
    <div className="hourly-weather-module">
      {forecast.map((data, index) => (
        <HourlyWeatherRow
          key={index}
          time={data.time}
          weatherIcon={data.weatherIcon}
          temperature={data.temperature}
          windSpeed={data.windSpeed}
          windGust={data.windGust}
          windDirection={data.windDirection}
        />
      ))}
    </div>
  );
};

export default HourlyWeatherModule;

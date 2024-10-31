import React from "react";
import { WiWindy, WiDirectionUp } from "react-icons/wi";
import "./HourlyWeatherRow.css";

interface HourlyWeatherRowProps {
  time: string; // e.g., "12 - 14"
  weatherIcon: React.ReactNode; // Icon component like <WiCloud />
  temperature: number; // Temperature in degrees
  windSpeed: number; // Wind speed
  windGust: number; // Wind gusts
  windDirection: string; // e.g., "N", "NE", "E", etc.
}

const HourlyWeatherRow: React.FC<HourlyWeatherRowProps> = ({
  time,
  weatherIcon,
  temperature,
  windSpeed,
  windGust,
  windDirection,
}) => {
  return (
    <div className="hourly-weather-row">
      <div className="hourly-time">{time}</div>
      <div className="hourly-icon">{weatherIcon}</div>
      <div className="hourly-temp">{temperature}°C</div>
      <div className="hourly-wind">
        <WiWindy className="wind-icon" />
        <span>
          {windSpeed} ({windGust})
        </span>
        <WiDirectionUp
          className={`direction-icon direction-${windDirection.toLowerCase()}`}
        />
      </div>
    </div>
  );
};

export default HourlyWeatherRow;

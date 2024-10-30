import React from "react";
import "./WeatherWidget.css";
import { WiDaySunny } from "react-icons/wi";

interface WeatherWidgetProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
}) => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <h2>{city}</h2>
      </div>
      <div className="widget-main">
        <WiDaySunny size={50} color="gold" />
        <h1 className="widget-temperature">{temperature}°C</h1>
        <p>{condition}</p>
      </div>
      <div className="widget-footer">
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} km/h</p>
      </div>
    </div>
  );
};

export default WeatherWidget;

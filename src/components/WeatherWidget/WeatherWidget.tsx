import React from "react";
import "./WeatherWidget.css";
import TemperatureGauge from "../TemperatureGauge/TemperatureGauge";

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
        <TemperatureGauge
          minTemperature={5}
          maxTemperature={15}
          currentTemperature={temperature}
          scale={1.0} // Scales the gauge
        />
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

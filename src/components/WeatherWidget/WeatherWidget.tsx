import React from "react";
import "./WeatherWidget.css";
import {
  WiThermometer,
  WiRaindrops,
  WiStrongWind,
  WiDirectionUp,
  WiHumidity,
  WiCloud,
  WiRain,
} from "react-icons/wi";
import TemperatureGauge from "../TemperatureGauge/TemperatureGauge";
import HourlyWeatherModule from "../HourWeather/HourlyWeatherModule";

interface WeatherWidgetProps {
  city: string;
  temperature: number;
  feelsLikeTemperature: number;
  condition: string;
  humidity: number;
  rainAmount: number;
  windSpeed: number;
  windDirection: string; // e.g., "N", "NE", "E", etc.
  iconSizes?: {
    thermometer?: number;
    humidity?: number;
    raindrop?: number;
    wind?: number;
    direction?: number;
  }; // Allows customization of icon sizes
}

const forecast = [
  {
    time: "12 - 14",
    weatherIcon: <WiCloud size={24} />,
    temperature: 14,
    windSpeed: 13,
    windGust: 17,
    windDirection: "NE",
  },
  {
    time: "14 - 16",
    weatherIcon: <WiRain size={24} />,
    temperature: 13,
    windSpeed: 15,
    windGust: 20,
    windDirection: "E",
  },
  {
    time: "16 - 18",
    weatherIcon: <WiCloud size={24} />,
    temperature: 12,
    windSpeed: 12,
    windGust: 15,
    windDirection: "S",
  },
];

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city,
  temperature,
  feelsLikeTemperature,
  condition,
  humidity,
  rainAmount,
  windSpeed,
  windDirection,
  iconSizes = {}, // Default to an empty object
}) => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <h2 className="city-title">{city}</h2>
      </div>
      <div className="widget-main">
        <TemperatureGauge
          minTemperature={5}
          maxTemperature={15}
          currentTemperature={temperature}
          scale={1.0}
        />
      </div>
      <div className="widget-footer">
        <div className="footer-row">
          <div className="footer-item">
            <WiThermometer
              size={iconSizes.thermometer || 24}
              className="footer-icon"
            />
            <span>Feels Like:</span>
            <span className="footer-value">{feelsLikeTemperature}°C</span>
          </div>
          <div className="footer-item">
            <WiHumidity
              size={iconSizes.humidity || 24}
              className="footer-icon"
            />
            <span>Humidity:</span>
            <span className="footer-value">{humidity}%</span>
          </div>
        </div>
        <div className="footer-row">
          <div className="footer-item">
            <WiRaindrops size={24} className="footer-icon raindrop-icon" />
            <span>Rain:</span>
            <span className="footer-value">{rainAmount} mm</span>
          </div>
          <div className="footer-item">
            <WiStrongWind size={iconSizes.wind || 24} className="footer-icon" />
            <span>Wind:</span>
            <span className="footer-value">{windSpeed} m/s</span>
            <WiDirectionUp
              size={iconSizes.direction || 24}
              className={`footer-icon direction-icon-header direction-${windDirection.toLowerCase()}`}
            />
          </div>
        </div>
        <HourlyWeatherModule forecast={forecast} />
      </div>
    </div>
  );
};

export default WeatherWidget;

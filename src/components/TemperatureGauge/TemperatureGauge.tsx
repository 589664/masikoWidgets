import React from "react";
import { WiDaySunny } from "react-icons/wi";
import "./TemperatureGauge.css";

interface TemperatureGaugeProps {
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
  scale?: number;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({
  minTemperature,
  maxTemperature,
  currentTemperature,
  scale = 1,
}) => {
  const percentage =
    ((currentTemperature - minTemperature) /
      (maxTemperature - minTemperature)) *
    100;
  const radius = 100; // Keep the radius the same to maintain gauge size
  const strokeWidth = 15;

  // Calculate the angle for the current temperature
  const startAngle = -115;
  const endAngle = 115;
  const fillAngle = startAngle + ((endAngle - startAngle) * percentage) / 100;

  // Calculate polar to Cartesian coordinates
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Describe the arc
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  return (
    <div
      className="temperature-gauge-wrapper"
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        className="temperature-gauge-svg"
        width="280"
        height="160"
        viewBox="10 50 280 160"
      >
        <defs>
          {/* Define gradient for the arc */}
          <linearGradient
            id="temperatureGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#ff4500", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ffa500", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Background Arc */}
        <path
          d={describeArc(150, 150, radius, startAngle, endAngle)}
          fill="none"
          stroke="var(--gauge-border-color)"
          strokeWidth={strokeWidth - 5}
          strokeLinecap="round"
          className="gauge-arc"
        />

        {/* Filled Arc */}
        <path
          d={describeArc(150, 150, radius, startAngle, fillAngle)}
          fill="none"
          stroke="url(#temperatureGradient)" // This remains as gradient
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="gauge-arc"
        />

        {/* Icon and Temperature Label */}
        <g className="gauge-content">
          <foreignObject x="90" y="110" width="120" height="40">
            <div className="gauge-content-container">
              <WiDaySunny className="weather-icon" color="gold" />
              <span className="current-temperature">
                {currentTemperature}°C
              </span>
            </div>
          </foreignObject>
        </g>

        {/* Min and Max Temperature Labels */}
        <text x="30" y="200" textAnchor="middle" className="min-label">
          {minTemperature}°C
        </text>
        <text x="270" y="200" textAnchor="middle" className="max-label">
          {maxTemperature}°C
        </text>
      </svg>
    </div>
  );
};

export default TemperatureGauge;

import React from "react";
import "./TemperatureGauge.css";

interface TemperatureGaugeProps {
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
  scale?: number; // Scale factor to resize
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
  const radius = 100; // Radius of the arc
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
        width="300"
        height="200"
        viewBox="0 0 300 200"
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
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Filled Arc */}
        <path
          d={describeArc(150, 150, radius, startAngle, fillAngle)}
          fill="none"
          stroke="url(#temperatureGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Min Temperature Label */}
        <text
          x="50"
          y="220"
          textAnchor="middle"
          fontSize="14"
          fill="#666"
          className="min-label"
        >
          {minTemperature}°C
        </text>

        {/* Max Temperature Label */}
        <text
          x="250"
          y="220"
          textAnchor="middle"
          fontSize="14"
          fill="#666"
          className="max-label"
        >
          {maxTemperature}°C
        </text>

        {/* Current Temperature Label */}
        <text
          x="150"
          y="150"
          textAnchor="middle"
          fontSize="250"
          fontWeight="bold"
          fill="#ff4500"
          className="current-temperature-label"
        >
          {currentTemperature}°C
        </text>
      </svg>
    </div>
  );
};

export default TemperatureGauge;

export interface WeatherData {
  temperature: number;
  feelsLikeTemperature: number;
  humidity: number | null;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  segmentedForecast: Array<SegmentedForecast>;
}

export interface SegmentedForecast {
  startTime: string;
  endTime: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
}

// Helper function to calculate feels like temperature (wind chill for T < 10°C)
const calculateFeelsLikeTemperature = (
  temperature: number,
  windSpeed: number
): number => {
  if (temperature < 10 && windSpeed > 4.8) {
    // wind chill formula applies when T < 10°C and V > 4.8 km/h
    const windSpeedKmH = windSpeed * 3.6; // convert m/s to km/h
    return (
      13.12 +
      0.6215 * temperature -
      11.37 * Math.pow(windSpeedKmH, 0.16) +
      0.3965 * temperature * Math.pow(windSpeedKmH, 0.16)
    );
  } else {
    return temperature; // If temperature >= 10°C, use actual temperature
  }
};

// Determine the closest 6-hour interval for the current time, with 24 wrapping to 00
const getClosestInterval = (hour: number): number => {
  if (hour < 6) return 6;
  if (hour < 12) return 12;
  if (hour < 18) return 18;
  return 0; // Wrap 24 to 00 for the next day
};

// Format hours, converting `0` to `"00"` and padding single digits
const formatHour = (hour: number): string => hour.toString().padStart(2, "0");

const getWeatherData = async (
  lat: number,
  lon: number
): Promise<WeatherData | null> => {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          process.env.REACT_APP_USER_AGENT ||
          "DefaultUserAgent/1.0 (default@example.com)",
      },
    });

    if (!response.ok) {
      console.error("Error fetching weather data:", response.statusText);
      return null;
    }

    const data = await response.json();
    const timeseries = data.properties.timeseries;

    // Extract current weather data
    const currentWeather = timeseries[0].data.instant.details;
    const currentTemperature = currentWeather.air_temperature;
    const currentWindSpeed = currentWeather.wind_speed;
    const feelsLikeTemperature = calculateFeelsLikeTemperature(
      currentTemperature,
      currentWindSpeed
    );

    // Current hour and closest interval for the first entry
    const now = new Date();
    const currentHour = now.getHours();
    const closestInterval = getClosestInterval(currentHour);

    // Define the segments with first entry starting at current hour, ending at closest interval
    const segments = [
      { startHour: currentHour, endHour: closestInterval, index: 0 }, // Segment 1
      {
        startHour: closestInterval,
        endHour: (closestInterval + 6) % 24,
        index: 6,
      }, // Segment 2
      {
        startHour: (closestInterval + 6) % 24,
        endHour: (closestInterval + 12) % 24,
        index: 12,
      }, // Segment 3
    ];

    const segmentedForecast = segments.map((segment) => {
      const segmentData = timeseries[segment.index]?.data.instant.details || {};

      // Use `formatHour` to zero-pad single-digit hours
      const startTime = formatHour(segment.startHour);
      const endTime = formatHour(segment.endHour);

      const temperature = segmentData.air_temperature || 0;
      const windSpeed = segmentData.wind_speed || 0;
      const windDirection = segmentData.wind_from_direction || 0;

      // Access precipitation using next_6_hours
      const precipitation =
        timeseries[segment.index]?.data.next_6_hours?.details
          ?.precipitation_amount || 0;

      return {
        startTime,
        endTime,
        temperature,
        precipitation,
        windSpeed,
        windDirection,
      };
    });

    const weatherData: WeatherData = {
      temperature: currentTemperature,
      feelsLikeTemperature,
      humidity: currentWeather.relative_humidity ?? null,
      windSpeed: currentWindSpeed,
      windDirection: currentWeather.wind_from_direction,
      precipitation:
        timeseries[0].data.next_6_hours?.details?.precipitation_amount || 0,
      segmentedForecast,
    };

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default getWeatherData;

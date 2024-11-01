export interface SunTimes {
  sunrise: string | null;
  sunset: string | null;
}

class SunriseService {
  private static baseUrl = "https://api.met.no/weatherapi/sunrise/3.0/sun";

  /**
   * Fetches sunrise and sunset times for a specific location, date, and timezone offset.
   *
   * @param lat - Latitude of the location
   * @param lon - Longitude of the location
   * @param date - Date in 'YYYY-MM-DD' format
   * @param offset - Timezone offset in '+HH:MM' or '-HH:MM' format
   * @returns Promise<SunTimes> - An object containing sunrise and sunset times or null if unavailable
   */
  public static async getSunriseSunset(
    lat: number,
    lon: number,
    date: string,
    offset: string
  ): Promise<SunTimes> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&date=${date}&offset=${offset}`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            process.env.REACT_APP_USER_AGENT ||
            "DefaultUserAgent/1.0 (default@example.com)",
        },
      });

      if (!response.ok) {
        console.error(
          "Failed to fetch sunrise/sunset data:",
          response.statusText
        );
        return { sunrise: null, sunset: null };
      }

      const jsonData = await response.json();

      // Extract sunrise and sunset times from JSON response
      const sunrise = jsonData.properties?.sunrise?.time || null;
      const sunset = jsonData.properties?.sunset?.time || null;
      return { sunrise, sunset };
    } catch (error) {
      console.error("Error fetching sunrise/sunset data:", error);
      return { sunrise: null, sunset: null };
    }
  }
}

export default SunriseService;

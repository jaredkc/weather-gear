import type {
  Forecast,
  Temp,
  Weather,
} from "~/openweathermap/openweathermap-types";

/**
 * UserLocation is a subset of the OpenWeatherMap API response
 * Making the data as small as possible to store more locations in cookies
 */
export type UserLocation = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  dt: number;
  temp: Temp;
  weather: Weather;
};

/**
 * Convert a forecast to a UserLocation
 */
export function forecastToUserLocation(
  name: string,
  forecast: Forecast,
): UserLocation {
  const daily = forecast.daily[0];
  return {
    id: `${forecast.lat}${forecast.lon}`,
    name: name,
    lat: forecast.lat,
    lon: forecast.lon,
    dt: daily.dt,
    temp: daily.temp,
    weather: daily.weather[0],
  };
}

/**
 * Check if UserLocation date/time is in the last 3 hours
 */
export function isRecent(userLocation: UserLocation): boolean {
  const now = Math.floor(Date.now() / 1000);
  return now - userLocation.dt < 60 * 60 * 3;
}

/**
 * Sample locations for testing
 */
export const sampleLocations: UserLocation[] = [
  {
    id: "1",
    dt: 1698606000,
    name: "London",
    lat: 51.5074,
    lon: 0.1278,
    temp: {
      day: 37.54,
      min: 30.63,
      max: 43.11,
      night: 33.91,
      eve: 35.6,
      morn: 30.63,
    },
    weather: {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  },
];

import invariant from "tiny-invariant";
import type {
  Coord,
  Forecast,
  OpenWeatherError,
  WeatherLocation,
} from "./openweathermap-types";

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const openWeatherApiUrl = "https://api.openweathermap.org/";
const openWeatherApiUrlGeo = `${openWeatherApiUrl}geo/1.0/`;
invariant(openWeatherApiKey, "OPEN_WEATHER_API_KEY must be set");

/**
 * Get location data from query or zip.
 * Zip queries return a single location, while queries return an array of locations.
 * Making sure we always return an array of locations for consistency in data an UX.
 *
 * [Geocoding API](https://openweathermap.org/api/geocoding-api)
 */
export const searchLocations = async (
  location: string,
): Promise<WeatherLocation[] | OpenWeatherError> => {
  const limit = 10;
  let queryType = "query";
  let url = openWeatherApiUrlGeo;

  if (/^\d{5}$/.test(location)) {
    url = `${url}zip?zip=${location}&limit=${limit}&appid=${openWeatherApiKey}`;
    queryType = "zip";
  } else {
    url = `${url}direct?q=${location}&limit=${limit}&appid=${openWeatherApiKey}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return queryType === "zip" ? [data] : data;
};

/**
 * Get location data from coordinates
 * So we can display a city name, which is not returned from the forecast api.
 *
 * Example: https://api.openweathermap.org/geo/1.0/reverse?lat=40.7596&lon=-111.8868&limit=3&appid=${openWeatherApiKey}
 */
export const coordLocations = async (
  location: Coord,
): Promise<WeatherLocation[] | OpenWeatherError> => {
  const url = `${openWeatherApiUrlGeo}reverse?lat=${location.lat}&lon=${location.lon}&limit=3&appid=${openWeatherApiKey}`;
  const response = await fetch(url);
  return await response.json();
};

/**
 * Get forecast from one call api. Excluding current, minutely, alerts.
 * Trimming to 8 hourly and 1 daily forecasts.
 *
 * [One Call API 3.0](https://openweathermap.org/api/one-call-3)
 * Version 3.0, 1,000 calls per day for free, $0.15 after that.
 */
export const getForecast = async (
  location: Coord,
): Promise<Forecast | OpenWeatherError> => {
  let url = `${openWeatherApiUrl}/data/3.0/onecall?&lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,alerts&appid=${openWeatherApiKey}&units=imperial`;

  const response = await fetch(url);
  const data = await response.json();

  data.hourly = data.hourly.slice(0, 8);
  data.daily = data.daily.slice(0, 1);

  return data;
};

import invariant from "tiny-invariant";
import type {
  Coord,
  WeatherLocation,
  Weather,
  Forecast,
} from "./openweathermap-types";

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const openWeatherApiUrl = "https://api.openweathermap.org/";
invariant(openWeatherApiKey, "OPEN_WEATHER_API_KEY must be set");

/**
 * Get location data from query, zip or lat/lon
 * If not results are found, an empty array is returned
 */
export const getLocation = async (
  location: Coord | string,
): Promise<WeatherLocation[]> => {
  let url = `${openWeatherApiUrl}geo/1.0/`;
  const limit = 10;
  if (typeof location === "object") {
    url = `${url}/reverse?lat=${location.lat}&lon=${location.lon}&limit=${limit}&appid=${openWeatherApiKey}`;
  } else if (/^\d{5}$/.test(location)) {
    url = `${url}/zip?zip=${location}&limit=${limit}&appid=${openWeatherApiKey}`;
  } else {
    url = `${url}/direct?q=${location}&limit=${limit}&appid=${openWeatherApiKey}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getForecast = async (
  location: Coord | string,
): Promise<Forecast> => {
  let url = `${openWeatherApiUrl}data/2.5/forecast?appid=${openWeatherApiKey}&units=imperial&cnt=3`;
  if (typeof location === "object") {
    url = `${url}&lat=${location.lat}&lon=${location.lon}`;
  } else if (/^\d{5}$/.test(location)) {
    url = `${url}&zip=${location}`;
  } else {
    url = `${url}&q=${location}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getWeather = async (location: Coord): Promise<Weather> => {
  const url = `${openWeatherApiUrl}data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${openWeatherApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

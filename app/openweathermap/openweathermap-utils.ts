import invariant from "tiny-invariant";
import type { Coord, OpenWeatherMap_Location, OpenWeatherMap_Weather } from "./openweathermap-types";

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const openWeatherApiUrl = "https://api.openweathermap.org/";
invariant(openWeatherApiKey, "OPEN_WEATHER_API_KEY must be set");

export const getLocationByLatLon = async (
  lat: Coord["lat"],
  lon: Coord["lon"],
): Promise<OpenWeatherMap_Location> => {
  const url = `${openWeatherApiUrl}/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
};

export const getWeatherByLatLon = async (
  lat: Coord["lat"],
  lon: Coord["lon"],
): Promise<OpenWeatherMap_Weather> => {
  const url = `${openWeatherApiUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

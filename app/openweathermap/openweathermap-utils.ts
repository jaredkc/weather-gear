import invariant from "tiny-invariant";
import type { Coord, WeatherLocation } from "./openweathermap-types";
import type { Forecast } from "./openweathermap-types-onecall";

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const openWeatherApiUrl = "https://api.openweathermap.org/";
invariant(openWeatherApiKey, "OPEN_WEATHER_API_KEY must be set");

interface WeatherGearLocation {
  type: "latlon" | "zip" | "query";
  location: WeatherLocation | null;
  locations: WeatherLocation[] | null;
}

/**
 * Get location data from query, zip or lat/lon.
 * [Geocoding API](https://openweathermap.org/api/geocoding-api)
 */
export const getLocation = async (
  location: Coord | string,
): Promise<WeatherGearLocation> => {
  const limit = 10;
  const structuredResponse: WeatherGearLocation = {
    type: "latlon",
    location: null,
    locations: null,
  };
  let url = `${openWeatherApiUrl}geo/1.0/`;

  if (typeof location === "object") {
    url = `${url}/reverse?lat=${location.lat}&lon=${location.lon}&limit=${limit}&appid=${openWeatherApiKey}`;
    structuredResponse.type = "latlon";
  } else if (/^\d{5}$/.test(location)) {
    url = `${url}/zip?zip=${location}&limit=${limit}&appid=${openWeatherApiKey}`;
    structuredResponse.type = "zip";
  } else {
    url = `${url}/direct?q=${location}&limit=${limit}&appid=${openWeatherApiKey}`;
    structuredResponse.type = "query";
  }

  const response = await fetch(url);
  const data = await response.json();

  if (structuredResponse.type === "query") {
    structuredResponse.locations = data;
  } else {
    structuredResponse.location = data;
  }
  return structuredResponse;
};

/**
 * Get forecast from one call api. Excluding minutely, daily and alerts.
 * [One Call API 3.0](https://openweathermap.org/api/one-call-3)
 * Version 3.0, 1,000 calls per day for free, $0.15 after that.
 */
export const getForecast = async (location: Coord): Promise<Forecast> => {
  let url = `${openWeatherApiUrl}/data/3.0/onecall?&lat=${location.lat}&lon=${location.lon}&exclude=minutely,daily,alerts&appid=${openWeatherApiKey}&units=imperial`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};


/**
 * API calls to Version 2.5, which is free. Not currently using.
 */
/*
export const getForecast2 = async (location: Coord): Promise<Forecast> => {
  let url = `${openWeatherApiUrl}data/2.5/forecast?appid=${openWeatherApiKey}&units=imperial&cnt=3`;

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
*/
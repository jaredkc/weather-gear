import type {
  Forecast,
  Temp,
  Weather,
} from "~/openweathermap/openweathermap-types";
import { slugToTitle } from "~/utils";

/**
 * UserLocation is a subset of the OpenWeatherMap API response
 * Making the data as small as possible to store more locations in cookies
 */
export type UserLocation = {
  id: string;
  name: string;
  dt: number;
  lat: number;
  lon: number;
  temp: Temp;
  timezone: string;
  weather: Weather;
};

/**
 * Available sports
 */
export type UserSport = "cycling" | "running";

/*
 * User preference is used to store the user's
 * sport preference and client side date
 */
export type UserPreference = {
  sport: UserSport;
  clientDate: number;
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
    id: `${forecast.lat}_${forecast.lon}`,
    name: slugToTitle(name),
    dt: daily.dt,
    lat: forecast.lat,
    lon: forecast.lon,
    temp: daily.temp,
    timezone: forecast.timezone,
    weather: daily.weather[0],
  };
}

/**
 * Add or update a UserLocation in the locations array,
 * limit the results to 5 locations for cookie storage
 */
export function updateUserLocations(
  locations: UserLocation[],
  location: UserLocation,
): UserLocation[] {
  // Remove any locations that are not in the last 2 weeks
  // TODO: this is not working as expected, server-side date issue?
  // locations = locations.filter((l) => withinDays(7, l));

  // Update or add location
  const locationIndex = locations.findIndex((l) => l.id === location.id);
  locationIndex !== -1
    ? (locations[locationIndex] = location)
    : locations.unshift(location);
  // Sort by dt (date/time)
  locations = locations.sort((a, b) => b.dt - a.dt);
  // Limit to 5 locations
  return locations.slice(0, 5);
}

/**
 * Check if UserLocation date/time is within the last time period
 */
export function withinDays(days: number, userLocation: UserLocation): boolean {
  const now = Math.floor(Date.now() / 1000);
  return now - userLocation.dt < 60 * 60 * days;
}

/**
 * Delete a UserLocation from the locations array
 */
export function deleteUserLocation(
  locations: UserLocation[],
  locationId: string,
): UserLocation[] {
  return locations.filter((location) => location.id !== locationId);
}

/**
 * Sample locations for testing
 */
export const sampleLocations: UserLocation[] = [
  {
    id: "40.6727_-111.8605",
    dt: 1699208212,
    name: "Millcreek",
    lat: 40.6727,
    lon: -111.8605,
    timezone: "America/Denver",
    temp: {
      day: 57.74,
      min: 55.13,
      max: 63.16,
      night: 57.58,
      eve: 58.01,
      morn: 55.13,
    },
    weather: {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  },
  {
    id: "51.5074_0.1278",
    dt: 1698606000,
    name: "London",
    lat: 51.5074,
    lon: 0.1278,
    timezone: "Europe/London",
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

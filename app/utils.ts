import type { UserLocation, UserSport } from "./models/user-location.server";

/**
 * Custom Weather Icons
 *
 * Designed to align with the OpenWeatherMap icons
 * https://openweathermap.org/weather-conditions#Icon-list
 */
export function getWeatherIcon(icon: string): string {
  return `/_static/weather-icons/${icon}.svg`;
}

/**
 * Handlize a string
 * - "Salt Lake City" -> "salt-lake-city"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Slug to Title
 * - "salt-lake-city" -> "Salt Lake City"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format link for sport and location
 * Example return: `/cycling/salt-lake-city?lat=40.7608&lon=-111.8910`
 */
export function sportLocationPath(
  sport: UserSport = "cycling",
  location: UserLocation,
): string {
  const { name, lat, lon } = location;
  return `/${sport}/${slugify(name)}?lat=${lat.toFixed(4)}&lon=${lon.toFixed(
    4,
  )}`;
}

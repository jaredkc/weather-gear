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
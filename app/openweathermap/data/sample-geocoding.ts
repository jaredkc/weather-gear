import type { WeatherLocation } from "../openweathermap-types";

/**
 * Sample data response from the [Geocoding API](https://openweathermap.org/api/geocoding-api)
 */
export const sampleGeocoding: WeatherLocation[] = [
  {
    name: 'Park City',
    lat: 40.6460921,
    lon: -111.4979963,
    country: 'US',
    state: 'Utah'
  },
  {
    name: 'Park City',
    lat: 37.8000123,
    lon: -97.3183763,
    country: 'US',
    state: 'Kansas'
  },
  {
    name: 'Park City',
    lat: 37.0939375,
    lon: -86.046367,
    country: 'US',
    state: 'Kentucky'
  },
  {
    name: 'Park City',
    lat: 42.3483554,
    lon: -87.8842397,
    country: 'US',
    state: 'Illinois'
  },
  {
    name: 'Park City',
    lat: 45.6327243,
    lon: -108.9179269,
    country: 'US',
    state: 'Montana'
  }
];
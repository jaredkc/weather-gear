// Type definitions for OpenWeatherMap API 3.0 One Call
// Generated with https://transform.tools/json-to-typescript

/**
 * [Current and forecast weather data](https://openweathermap.org/api/one-call-3)
 * - minute forecast for 1 hour
 * - hourly forecast for 48 hours
 * - daily forecast for 8 days
 *
 * Excluding current, minutely, and alerts in our app.
 */
export interface Forecast {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: Current;
  minutely?: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
  alerts?: Alert[];
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Weather[];
  rain?: { "1h": number };
  snow?: { "1h": number };
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Minutely {
  dt: number;
  precipitation: number;
}

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Weather[];
  pop: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Alert {
  sender_name: string
  event: string
  start: number
  end: number
  description: string
  tags: any[]
}

/**
 * [Geocoding API](https://openweathermap.org/api/geocoding-api)
 * - name Name of the found location
 * - local_names (not used at this time)
 * - lat Geographical coordinates of the found location (latitude)
 * - lon Geographical coordinates of the found location (longitude)
 * - country Country of the found location
 * - state (where available) State of the found location
 */
export interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  local_names?: object;
  state?: string;
}

export interface Coord {
  lon: number | string;
  lat: number | string;
}

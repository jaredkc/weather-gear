// Type definitions for OpenWeatherMap API 3.0 One Call
// Generated with https://transform.tools/json-to-typescript

export interface Forecast {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: Current
  hourly: Hourly[]
  // Exlucding for now
  // minutely: Minutely[]
  // daily: Daily[]
}

export interface Current {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Minutely {
  dt: number
  precipitation: number
}

export interface Hourly {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  pop: number
}

export interface Daily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  summary: string
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  clouds: number
  pop: number
  rain: number
  uvi: number
}

export interface Temp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export interface FeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

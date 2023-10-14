// Type definitions for OpenWeatherMap API 2.5 Forecast
// Generated by https://quicktype.io

export interface Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface Weather {
  coord: Coord;
  weather: WeatherElement[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface List {
  dt: number;
  main: Main;
  weather: WeatherElement[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: object;
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: "US";
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number | string;
  lat: number | string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

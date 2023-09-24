import type { OpenWeatherMap_Weather } from "./openweathermap-types";

export const testWeather: OpenWeatherMap_Weather = {
  coord: {
    lon: -111.8604,
    lat: 40.673,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 81.68,
    feels_like: 79.43,
    temp_min: 77.76,
    temp_max: 84.15,
    pressure: 1000,
    humidity: 14,
  },
  visibility: 10000,
  wind: {
    speed: 17.27,
    deg: 170,
    gust: 27.63,
  },
  clouds: {
    all: 75,
  },
  dt: 1682985702,
  sys: {
    type: 2,
    id: 2006603,
    country: "US",
    sunrise: 1682943974,
    sunset: 1682994160,
  },
  timezone: -21600,
  id: 5778352,
  name: "Millcreek",
  cod: 200,
};

import type { Forecast, Weather } from "./openweathermap-types";

export const testForecast: Forecast = {
  cod: "200",
  message: 0,
  cnt: 3,
  list: [
    {
      dt: 1695686400,
      main: {
        temp: 301.54,
        feels_like: 300.09,
        temp_min: 299.49,
        temp_max: 301.54,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 875,
        humidity: 16,
        temp_kf: 2.05,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 2.7,
        deg: 263,
        gust: 4.3,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2023-09-26 00:00:00",
    },
  ],
  city: {
    id: 5778755,
    name: "Murray",
    coord: {
      lat: 40.673,
      lon: -111.8604,
    },
    country: "US",
    population: 46746,
    timezone: -21600,
    sunrise: 1695647862,
    sunset: 1695691236,
  },
};

export const testWeather: Weather = {
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

import type { Forecast } from "../openweathermap-types";

export const sampleForecast: Forecast = {
  cod: "200",
  message: 0,
  cnt: 3,
  list: [
    {
      dt: 1696798800,
      main: {
        temp: 75.07,
        feels_like: 73.89,
        temp_min: 75.07,
        temp_max: 76.77,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 874,
        humidity: 34,
        temp_kf: -0.94,
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
        speed: 5.21,
        deg: 302,
        gust: 6.87,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2023-10-08 21:00:00",
    },
    {
      dt: 1696809600,
      main: {
        temp: 74.1,
        feels_like: 72.66,
        temp_min: 72.18,
        temp_max: 74.1,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 873,
        humidity: 31,
        temp_kf: 1.07,
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
        speed: 5.23,
        deg: 329,
        gust: 6.38,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2023-10-09 00:00:00",
    },
    {
      dt: 1696820400,
      main: {
        temp: 67.06,
        feels_like: 64.98,
        temp_min: 63.05,
        temp_max: 67.06,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 871,
        humidity: 32,
        temp_kf: 2.23,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 1.79,
        deg: 83,
        gust: 3.22,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2023-10-09 03:00:00",
    },
  ],
  city: {
    id: 5778755,
    name: "Murray",
    coord: {
      lat: 40.6727,
      lon: -111.8605,
    },
    country: "US",
    population: 46746,
    timezone: -21600,
    sunrise: 1696771846,
    sunset: 1696813139,
  },
};

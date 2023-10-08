// This is page template used to flush things out.
// It is not used in production and can be modified or deleted as needed

import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { testWeather } from "~/openweathermap/openweathermap-test-data";
import { getWeatherIcon } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export default function WIP() {
  const data = testWeather;
  const weather = data.weather[0];
  const iconUrl = getWeatherIcon(weather.icon);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-blue-100">
      <Header />
      <div>
        {data.name}
        <img src={iconUrl} alt={weather.description} width={100} height={100} />
        <ul>
          <li>{weather.main}</li>
          <li>{weather.description}</li>
        </ul>
      </div>
      <div className="p-4 md:p-8 w-full">
        <div className="flex items-center justify-around bg-white/50 rounded-full border">
          <a className="p-4" href="#now">
            Now
          </a>
          <a className="p-4" href="#3hours">
            In 3 hours
          </a>
          <a className="p-4" href="#6hours">
            In 6 hours
          </a>
        </div>
      </div>
    </main>
  );
}

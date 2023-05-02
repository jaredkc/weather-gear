import type { V2_MetaFunction } from "@remix-run/node";
import { testWeather } from "~/types/openmapweather";
import { getWeatherIcon } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Work-in-progress" }];

export default function WIP() {
  const data = testWeather.weather;
  const weather = data.weather[0];
  const iconUrl = getWeatherIcon(weather.icon);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <div className="w-full bg-yellow-100 px-4 py-2 text-sm text-yellow-700">
        Work in progress from static data
      </div>
      <div>
        {data.name}
        <img src={iconUrl} alt={weather.description} width={100} height={100} />
        <ul>
          <li>{weather.main}</li>
          <li>{weather.description}</li>
        </ul>
      </div>
      <div>nav-bar</div>
    </main>
  );
}

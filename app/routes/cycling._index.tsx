import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getForecast } from "~/openweathermap/openweathermap-utils";
import { getWeatherIcon } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const forecast = await getForecast({ lat, lon });

  return json(forecast);
};

export default function WIP() {
  const forecast = useLoaderData<typeof loader>();
  const weather = forecast.list[0].weather[0];
  const iconUrl = getWeatherIcon(weather.icon, "@4x");

  return (
    <div className="flex flex-col items-center gap-12 h-screen justify-center">
      <h1 className="text-2xl">{forecast.city.name}</h1>
      <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
        <img src={iconUrl} alt={weather.description} width={100} height={100} />
      </div>
      <p className="capitalize">{weather.description}</p>
    </div>
  );
}

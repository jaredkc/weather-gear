import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { GearList } from "~/components/GearList";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";
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

  const { feels_like } = forecast.current;
  const gear = gearForTemp(cyclingGear, feels_like);

  return json({ forecast, gear });
};

export default function CyclingIndex() {
  const { forecast, gear } = useLoaderData<typeof loader>();
  const { temp, feels_like, wind_speed, weather } = forecast.current;
  const iconUrl = getWeatherIcon(weather[0].icon, "@4x");

  return (
    <div className="py-12 max-w-xl mx-auto flex flex-col gap-8 text-center">
      <h1 className="text-2xl">{forecast.timezone}</h1>
      <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center mx-auto">
        <img src={iconUrl} alt={weather[0].description} width={100} height={100} />
      </div>
      <dl className="grid grid-cols-2 w-48 text-left mx-auto gap-2">
        <dt className="opacity-75">Conditions:</dt>
        <dd className="font-semibold capitalize">{weather[0].description}</dd>
        <dt className="opacity-75">Temp:</dt>
        <dd className="font-semibold">{temp}</dd>
        <dt className="opacity-75">Feels like:</dt>
        <dd className="font-semibold">{feels_like}</dd>
        <dt className="opacity-75">Wind:</dt>
        <dd className="font-semibold">{wind_speed}</dd>
      </dl>
      <GearList gear={gear} />
    </div>
  );
}

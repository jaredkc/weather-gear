import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { AppFrame } from "~/components/AppFrame";
import { GearList } from "~/components/GearList";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";
import {
  getForecast,
  getLocation,
} from "~/openweathermap/openweathermap-utils";
import { getWeatherIcon } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const forecast = await getForecast({ lat, lon });
  const { locations } = await getLocation({ lat, lon });
  const { feels_like } = forecast.current;
  const gear = gearForTemp(cyclingGear, feels_like);

  return json({
    forecast,
    gear,
    location: locations ? locations[0].name : "Unknown location name",
  });
};

export default function CyclingIndex() {
  const { forecast, gear, location } = useLoaderData<typeof loader>();
  const { temp, feels_like, wind_speed, weather } = forecast.current;
  const iconUrl = getWeatherIcon(weather[0].icon, "@4x");
  const humanDate = new Date(forecast.current.dt * 1000).toLocaleString();

  return (
    <AppFrame>
      <div className="flex flex-col gap-8 mx-auto text-center">
        <div>
          <h1 className="text-2xl">{location}</h1>
          <p>{humanDate}</p>
        </div>
        <div className="flex items-center justify-center mx-auto bg-white rounded-full w-28 h-28">
          <img
            src={iconUrl}
            alt={weather[0].description}
            width={100}
            height={100}
          />
        </div>
        <dl className="grid w-48 grid-cols-2 gap-2 mx-auto text-left">
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
    </AppFrame>
  );
}

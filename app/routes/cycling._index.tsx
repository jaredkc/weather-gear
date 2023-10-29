import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import invariant from "tiny-invariant";
import { AppFrame } from "~/components/AppFrame";
import { Card } from "~/components/Card";
import { GearList } from "~/components/GearList";
import { LocationCard } from "~/components/LocationCard";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";
import type { Hourly } from "~/openweathermap/openweathermap-types";
import {
  coordLocations,
  getForecast,
} from "~/openweathermap/openweathermap-utils";
import { getWeatherIcon } from "~/utils";

export const meta: MetaFunction = () => [
  { title: "Gear to wear cycling - WeatherGear.app" },
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const forecast = await getForecast({ lat, lon });
  const locations = await coordLocations({ lat, lon });
  const { feels_like } = forecast.hourly[0];
  const gear = gearForTemp(cyclingGear, feels_like);

  return json({
    forecast,
    gear,
    location: locations ? locations[0].name : "Unknown location name",
  });
};

export default function CyclingIndex() {
  const { forecast, gear, location } = useLoaderData<typeof loader>();
  const forecastEightHours = forecast.hourly.slice(0, 8);
  const { temp, feels_like, wind_speed, weather } = forecast.hourly[0];

  const [gearList, setGearList] = useState(gear);
  const [activeHour, setActiveHour] = useState(0);

  const handleActiveHour = (temp: number, index: number) => {
    setActiveHour(index);
    setGearList(gearForTemp(cyclingGear, Math.round(temp)));
  };

  return (
    <AppFrame>
      <div className="flex flex-col gap-4">
        <LocationCard location={location} daily={forecast.daily[0]} />

        <Card>
          <div className="overflow-x-auto flex">
            {forecastEightHours.map((hour, index) => (
              <button
                key={index}
                onClick={() => handleActiveHour(hour.temp, index)}
                className={clsx(
                  "py-4 px-2 flex-none",
                  index === activeHour && "bg-slate-200",
                )}
              >
                <HourlyList {...hour} />
              </button>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-8 mx-auto text-center">
          <dl className="grid w-48 grid-cols-2 gap-2 mx-auto text-left">
            <dt className="opacity-75">Conditions:</dt>
            <dd className="font-semibold capitalize">
              {weather[0].description}
            </dd>
            <dt className="opacity-75">Temp:</dt>
            <dd className="font-semibold">{temp}</dd>
            <dt className="opacity-75">Feels like:</dt>
            <dd className="font-semibold">{feels_like}</dd>
            <dt className="opacity-75">Wind:</dt>
            <dd className="font-semibold">{wind_speed}</dd>
          </dl>
        </div>
        <Card>
          <GearList gear={gearList} />
        </Card>
      </div>
    </AppFrame>
  );
}

const HourlyList = (hour: Hourly) => {
  const { dt, temp, weather } = hour;
  const iconUrl = getWeatherIcon(weather[0].icon);

  const convertTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="text-center">
      <div className="text-xs">{convertTime(dt)}</div>
      <img src={iconUrl} alt={weather[0].description} width={60} height={60} />
      <div className="text-sm">{Math.round(temp)}°</div>
    </div>
  );
};

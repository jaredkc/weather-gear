import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";

import { AppFrame } from "~/components/AppFrame";
import { GearList } from "~/components/GearList";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";
import { sampleOneCall } from "~/openweathermap/data/sample-onecall";
import type { Hourly } from "~/openweathermap/openweathermap-types-onecall";
import { getWeatherIcon } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Weather Gear - " }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const forecast = sampleOneCall;
  return json({ forecast });
};

export default function Index() {
  const { forecast } = useLoaderData<typeof loader>();
  const gear = gearForTemp(cyclingGear, Math.round(forecast.hourly[0].temp));
  const forecastEightHours = forecast.hourly.slice(0, 8);

  const [gearList, setGearList] = useState(gear);
  const [activeHour, setActiveHour] = useState(0);

  const handleActiveHour = (temp: number, index: number) => {
    setActiveHour(index);
    setGearList(gearForTemp(cyclingGear, Math.round(temp)));
  }

  return (
    <AppFrame>
      <div className="rounded bg-slate-400 border">
        <div className="overflow-x-auto flex">
          {forecastEightHours.map((hour, index) => (
            <button
              key={index}
              onClick={() => handleActiveHour(hour.temp, index)}
              className={clsx(
                "py-4 px-2 flex-none first:ml-4 last:mr-4",
                index === activeHour && "bg-slate-300",
              )}
            >
              <HourlyList {...hour} />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <GearList gear={gearList} />
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

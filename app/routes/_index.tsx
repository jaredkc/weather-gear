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
  const temp = 65;
  const gear = gearForTemp(cyclingGear, temp);
  const forecast = sampleOneCall;

  return json({ forecast, gear, temp });
};

export default function Index() {
  const { forecast, gear, temp } = useLoaderData<typeof loader>();
  const forecastEightHours = forecast.hourly.slice(0, 8);

  const [tempValue, setTempValue] = useState(temp);
  const [gearList, setGearList] = useState(gear);
  const [activeHour, setActiveHour] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setTempValue(newValue);
    setGearList(gearForTemp(cyclingGear, newValue));
  };

  const handleActiveHour = (temp: number, index: number) => {
    setTempValue(Math.round(temp));
    setActiveHour(index);
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
        <div className="text-center text-5xl">{tempValue}°F</div>

        <div className="my-8">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={tempValue}
            onChange={handleChange}
            className="w-full"
          />
        </div>

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

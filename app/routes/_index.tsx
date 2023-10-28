import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";

import { AppFrame } from "~/components/AppFrame";
import { Card } from "~/components/Card";
import { GearList } from "~/components/GearList";
import { WeatherIcon } from "~/components/WeatherIcon";
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
  };

  return (
    <AppFrame>
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex gap-4 justify-between items-center py-2 px-4">
            <div>
              <h2>Salt Lake City, Ut</h2>
              <p>H:00° : L:00</p>
            </div>
            <div>
              <WeatherIcon weather={forecast.current.weather[0]} size={80} />
            </div>
          </div>
        </Card>

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

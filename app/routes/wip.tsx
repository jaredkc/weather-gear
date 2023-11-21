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
import { HourlyList } from "~/components/HourlyList";
import { LocationCard } from "~/components/LocationCard";
import { cyclingGear, gearForTemp } from "~/gear";
import { forecastToUserLocation } from "~/models/user-location.server";
import { sampleGeocoding } from "~/openweathermap/data/sample-geocoding";
import { sampleOneCall } from "~/openweathermap/data/sample-onecall";

export const meta: MetaFunction = () => [{ title: "Work in progress screen" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const forecast = sampleOneCall;
  const location = sampleGeocoding;

  const gear = gearForTemp(cyclingGear, forecast.hourly[0].temp);
  const userLocation = forecastToUserLocation(location[0].name, forecast);

  return json({ forecast, gear, userLocation });
};

export default function CyclingIndex() {
  const { forecast, gear, userLocation } = useLoaderData<typeof loader>();

  const [gearList, setGearList] = useState(gear);
  const [activeHour, setActiveHour] = useState(0);

  const handleActiveHour = (temp: number, index: number) => {
    setActiveHour(index);
    setGearList(gearForTemp(cyclingGear, temp));
  };

  return (
    <AppFrame>
      <div className="flex flex-col gap-2">
        <LocationCard location={userLocation} />

        <Card>
          <div className="flex overflow-x-auto snap-x">
            <div className="w-2 flex-none snap-start">&nbsp;</div>
            {forecast.hourly.map((hour, index) => (
              <button
                key={index}
                onClick={() => handleActiveHour(hour.temp, index)}
                className={clsx(
                  "flex-none cursor-pointer snap-start relative rounded-lg transition-all transform duration-200",
                  index === activeHour
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-50 text-slate-500",
                )}
              >
                <HourlyList hour={hour} timezone={forecast.timezone} />
              </button>
            ))}
            <div className="w-2 flex-none snap-start">&nbsp;</div>
          </div>
        </Card>

        <Card>
          <GearList gear={gearList} />
        </Card>
      </div>
    </AppFrame>
  );
}

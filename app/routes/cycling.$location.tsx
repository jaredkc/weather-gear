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
import { HourlyList } from "~/components/HourlyList";
import { LocationCard } from "~/components/LocationCard";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";
import { getForecast } from "~/openweathermap/openweathermap-utils";

export const meta: MetaFunction = () => [
  { title: "Gear to wear cycling - WeatherGear.app" },
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const location = params.location;
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(location, "Location not found");
  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const forecast = await getForecast({ lat, lon });
  const gear = gearForTemp(cyclingGear, forecast.hourly[0].feels_like);

  return json({ forecast, gear, location });
};

export default function CyclingIndex() {
  const { forecast, gear, location } = useLoaderData<typeof loader>();

  const [gearList, setGearList] = useState(gear);
  const [activeHour, setActiveHour] = useState(0);

  const handleActiveHour = (temp: number, index: number) => {
    setActiveHour(index);
    setGearList(gearForTemp(cyclingGear, temp));
  };

  return (
    <AppFrame>
      <div className="flex flex-col gap-4">
        <LocationCard location={location} daily={forecast.daily[0]} />

        <Card>
          <div className="flex overflow-x-auto">
            {forecast.hourly.map((hour, index) => (
              <button
                key={index}
                onClick={() => handleActiveHour(hour.temp, index)}
                className={clsx(
                  "flex-none px-2 py-4 cursor-pointer",
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

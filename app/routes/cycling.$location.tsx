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
import { cyclingGear, gearForTemp } from "~/gear";
import {
  forecastToUserLocation,
  updateUserLocations,
  type UserLocation,
} from "~/models/user-location.server";
import { getForecast } from "~/openweathermap/openweathermap-utils.server";
import { commitSession, getSession } from "~/session.server";

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

  // Update the users session with this new location
  const session = await getSession(request);
  const locations: UserLocation[] = session.get("locations") || [];
  const userLocation = forecastToUserLocation(location, forecast);
  const updatedLocations = updateUserLocations(locations, userLocation);
  session.set("locations", updatedLocations);

  return json(
    { forecast, gear, userLocation },
    {
      headers: {
        "Set-Cookie": await commitSession(session, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }),
      },
    },
  );
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
    <AppFrame showBack>
      <div className="flex flex-col gap-4">
        <LocationCard location={userLocation} />

        <Card>
          <div className="flex overflow-x-auto snap-x">
            {forecast.hourly.map((hour, index) => (
              <button
                key={index}
                onClick={() => handleActiveHour(hour.temp, index)}
                className={clsx(
                  "flex-none cursor-pointer snap-start relative border-white rounded-lg border-4",
                  index === activeHour && "bg-slate-200 border-slate-300",
                )}
              >
                <HourlyList hour={hour} timezone={forecast.timezone} />
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

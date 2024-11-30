import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import invariant from "tiny-invariant";
import { Card } from "~/components/Card";
import { GearList } from "~/components/GearList";
import { HourlyList } from "~/components/HourlyList";
import { LocationCard } from "~/components/LocationCard";
import { cyclingGear, gearForTemp, runningGear } from "~/gear";
import {
  forecastToUserLocation,
  updateUserLocations,
  deleteUserLocation,
  type UserLocation,
} from "~/models/user-location.server";
import { getForecast } from "~/openweathermap/openweathermap-utils.server";
import { commitSession, getSession } from "~/session.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  // TODO: better fallbacks for when data is undefined
  {
    title: `What to wear ${data?.sport} in ${data?.userLocation.name} when it's
            ${Math.round(data?.forecast.hourly[0].temp || 72)}º`,
  },
  {
    name: "description",
    content: `Know what to wear while ${data?.sport} for the current weather conditions`,
  },
  {
    name: "theme-color",
    content: "#0f172a",
  },
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const sport = params.sport;
  const location = params.location;
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(location, "Location not found");
  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const forecast = await getForecast({ lat, lon });

  if ("cod" in forecast) throw new Error(forecast.message);

  const sportGear = sport === "cycling" ? cyclingGear : runningGear;
  const gear = gearForTemp(sportGear, forecast.hourly[0].temp);

  // Update the users session with this new location
  const session = await getSession(request);
  const locations: UserLocation[] = session.get("locations") || [];
  const userLocation = forecastToUserLocation(location, forecast);
  const updatedLocations = updateUserLocations(locations, userLocation);
  session.set("locations", updatedLocations);

  return json(
    { sport, forecast, gear, userLocation },
    {
      headers: {
        "Set-Cookie": await commitSession(session, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
        }),
      },
    },
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const locationId = formData.get("locationId") as string;

  if (intent === "delete") {
    const session = await getSession(request);
    const locations: UserLocation[] = session.get("locations") || [];
    const updatedLocations = deleteUserLocation(locations, locationId);
    session.set("locations", updatedLocations);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return null;
};

export default function CyclingIndex() {
  const { forecast, gear, userLocation } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [gearList, setGearList] = useState(gear);
  const [activeHour, setActiveHour] = useState(0);

  const handleActiveHour = (temp: number, index: number) => {
    setActiveHour(index);
    setGearList(gearForTemp(cyclingGear, temp));
  };

  return (
    <div className="flex flex-col gap-2">
      <LocationCard location={userLocation} highlight />
      <Card>
        <div className="flex overflow-x-auto snap-x">
          <div className="flex-none w-2 snap-start">&nbsp;</div>
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
          <div className="flex-none w-2 snap-start">&nbsp;</div>
        </div>
      </Card>

      <Card>
        <GearList gear={gearList} />
      </Card>

      <fetcher.Form method="post" className="text-center">
        <input type="hidden" name="locationId" value={userLocation.id} />
        <button
          type="submit"
          name="intent"
          value="delete"
          className="p-4 text-xs tracking-widest uppercase text-slate-500 hover:text-red-400"
        >
          Remove location
        </button>
      </fetcher.Form>
    </div>
  );
}

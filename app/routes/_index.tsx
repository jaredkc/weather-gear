import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Card } from "~/components/Card";
import { GeoLocation } from "~/components/GeoLocation";
import { LocationCard } from "~/components/LocationCard";
import { IconSearch } from "~/components/icons";
import type { UserLocation } from "~/models/user-location.server";
import type { WeatherLocation } from "~/openweathermap/openweathermap-types";
import { searchLocations } from "~/openweathermap/openweathermap-utils.server";
import { getUsersLocations, getUsersPreference } from "~/session.server";
import { slugify } from "~/utils";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const usersLocations = await getUsersLocations(request);
  const usersPreference = await getUsersPreference(request);

  return json({ usersLocations, usersPreference });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const query = formData.get("query") as string;
  const locationSearch = await searchLocations(query);

  // TODO: handle this error better
  if ("cod" in locationSearch) throw new Error(locationSearch.message);

  return json(locationSearch);
};

export default function Index() {
  const { usersLocations, usersPreference } = useLoaderData<typeof loader>();
  const sport = usersPreference?.sport ?? "cycling";
  const locationSearch = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length < 3) return;
    const timeOutId = setTimeout(() => submit(formRef.current), 300);
    return () => clearTimeout(timeOutId);
  }, [query, submit]);

  return (
    <div className="flex flex-col gap-2">
      {usersLocations ? (
        <ListLocationCards sport={sport} locations={usersLocations} />
      ) : (
        <GettingStarted />
      )}

      <Card>
        <div className="flex flex-row-reverse gap-2 p-1">
          <GeoLocation />
          <Form method="post" ref={formRef} className="flex w-full rounded-lg">
            <button
              type="submit"
              title="Search city or zip code"
              className="flex items-center justify-center w-10 rounded-sm opacity-75 focus:opacity-100 hover:opacity-100 transition-opacity transition-fast"
            >
              <IconSearch />
              <span className="sr-only">Search</span>
            </button>
            <input
              type="text"
              name="query"
              placeholder="Search city or zip"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="flex-1 pr-4 py-2 rounded-lg bg-transparent focus:outline-none"
            />
          </Form>
        </div>
        {locationSearch && <ListSearchLocations locations={locationSearch} />}
      </Card>
    </div>
  );
}

function GettingStarted() {
  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between">
          <h2>
            <span className="text-sm uppercase tracking-widest">
              What to wear while
            </span>
            <span className="text-3xl block leading-8">
              Cycling &amp; Running
            </span>
          </h2>
          <div>
            <img
              src="/_static/weather-icons/02d.svg"
              alt=""
              width="110"
              height="110"
              className="inline-block -mt-10 -mb-4"
            />
          </div>
        </div>
        <p className="mt-4">
          Know what to wear for the current weather conditions. Search for a
          location to get started.
        </p>
        <p className="text-sm mt-3">
          This is a work-in-progress, be sure to check back for updates.
        </p>
      </div>
    </Card>
  );
}

function ListLocationCards({
  sport,
  locations,
}: {
  sport: "cycling" | "running";
  locations: UserLocation[];
}) {
  return (
    <>
      {locations.map(({ name, lat, lon }, index) => (
        <Link
          to={`${sport}/${slugify(name)}?lat=${lat}&lon=${lon}`}
          key={index}
        >
          <LocationCard location={locations[index]} highlight={index === 0} />
        </Link>
      ))}
    </>
  );
}

function ListSearchLocations({ locations }: { locations: WeatherLocation[] }) {
  return (
    <ul className="pb-3 text-sm">
      {locations.length === 0 && (
        <li className="py-3 px-4 opacity-75">No locations found</li>
      )}
      {locations.map(({ name, lat, lon, state }, index) => (
        <li key={index}>
          <Link
            to={`/cycling/${slugify(name)}?lat=${lat.toFixed(
              4,
            )}&lon=${lon.toFixed(4)}`}
            className="block py-3 px-4"
            unstable_viewTransition
          >
            {name}
            <span className="opacity-50 px-1">&middot;</span>
            <span className="opacity-75">{state}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

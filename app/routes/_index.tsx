import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { AppFrame } from "~/components/AppFrame";
import { Card } from "~/components/Card";
import { GeoLocation } from "~/components/GeoLocation";
import { LocationCard } from "~/components/LocationCard";
import { IconSearch } from "~/components/icons";
import type { UserLocation } from "~/models/user-location.server";
import type { WeatherLocation } from "~/openweathermap/openweathermap-types";
import { searchLocations } from "~/openweathermap/openweathermap-utils.server";
import { getUsersLocations } from "~/session.server";
import { slugify } from "~/utils";

export const meta: MetaFunction = () => [{ title: "WeatherGear.app" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const usersLocations = await getUsersLocations(request);
  return json({ usersLocations });
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
  const { usersLocations } = useLoaderData<typeof loader>();
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
    <AppFrame>
      <div className="flex flex-col gap-2">
        {usersLocations && <ListLocationCards locations={usersLocations} />}

        <Card>
          <div className="flex flex-row-reverse gap-2 p-1">
            <GeoLocation />
            <Form
              method="post"
              ref={formRef}
              className="flex w-full rounded-lg"
            >
              <button
                type="submit"
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
    </AppFrame>
  );
}

function ListLocationCards({ locations }: { locations: UserLocation[] }) {
  return (
    <>
      {locations.map(({ name, lat, lon }, index) => (
        <Link to={`cycling/${slugify(name)}?lat=${lat}&lon=${lon}`} key={index}>
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
            to={`/cycling/${slugify(name)}?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`}
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

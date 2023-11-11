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
import { GeoLocation } from "~/components/GeoLocation";
import { LocationCard } from "~/components/LocationCard";
import { IconSearch } from "~/components/icons";
import type { UserLocation } from "~/models/user-location.server";
import type { WeatherLocation } from "~/openweathermap/openweathermap-types";
import { searchLocations } from "~/openweathermap/openweathermap-utils";
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
      <div className="flex flex-col gap-4">
        {usersLocations && <ListLocationCards locations={usersLocations} />}

        <div className="flex gap-2">
          <Form
            method="post"
            ref={formRef}
            className="flex w-full bg-white border rounded-lg text-slate-700"
          >
            <input
              type="text"
              name="query"
              placeholder="Search city or zip"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="flex-1 px-4 py-2 rounded-lg"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-10 rounded-lg"
            >
              <IconSearch />
              <span className="sr-only">Search</span>
            </button>
          </Form>
          <GeoLocation />
        </div>

        {locationSearch && <ListSearchLocations locations={locationSearch} />}
      </div>
    </AppFrame>
  );
}

function ListLocationCards({ locations }: { locations: UserLocation[] }) {
  return (
    <>
      {locations.map(({ name, lat, lon }, index) => (
        <Link
          to={`cycling/${slugify(name)}?lat=${lat}&lon=${lon}}`}
          key={index}
        >
          <LocationCard location={locations[index]} />
        </Link>
      ))}
    </>
  );
}

function ListSearchLocations({ locations }: { locations: WeatherLocation[] }) {
  return (
    <ul className="border-t border-gray-300">
      {locations.length === 0 && <li className="py-2">No locations found</li>}
      {locations.map(({ name, lat, lon, state }, index) => (
        <li key={index} className="border-b border-gray-300">
          <Link
            to={`/cycling/${slugify(name)}?lat=${lat}&lon=${lon}`}
            className="block py-2"
            unstable_viewTransition
          >
            {name} <span className="opacity-50">{state}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

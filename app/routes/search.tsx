import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import type { WeatherLocation } from "~/openweathermap/openweathermap-types";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getLocations } from "~/openweathermap/openweathermap-utils";
import { IconSearch } from "~/components/icons";
import { AppFrame } from "~/components/AppFrame";

export const meta: MetaFunction = () => [{ title: "Weather Gear - " }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const query = formData.get("query") as string;

  const locationSearch = await getLocations(query);

  return json(locationSearch);
};

export default function Search() {
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
        <Form
          method="post"
          ref={formRef}
          className="flex w-full bg-white border rounded-full"
        >
          <input
            type="text"
            name="query"
            placeholder="Search city or zip"
            autoFocus={true}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="flex-1 px-4 py-2 rounded-full"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-10 rounded-full"
          >
            <IconSearch />
            <span className="sr-only">Search</span>
          </button>
        </Form>

        {locationSearch && <ListLocations locations={locationSearch} />}
      </div>
    </AppFrame>
  );
}

function ListLocations({ locations }: { locations: WeatherLocation[] }) {
  return (
    <ul className="border-t border-gray-300">
      {locations.length === 0 && <li className="py-2">No locations found</li>}
      {locations.map((location, index) => (
        <li key={index} className="border-b border-gray-300">
          <Link
            to={`/cycling?lat=${location.lat}&lon=${location.lon}`}
            className="block py-2"
            unstable_viewTransition
          >
            {location.name} <span className="opacity-50">{location.state}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

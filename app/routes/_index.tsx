import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import type { WeatherLocation } from "~/openweathermap/openweathermap-types";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getLocation } from "~/openweathermap/openweathermap-utils";
import { IconLocation, IconSearch } from "~/components/icons";

export const meta: MetaFunction = () => [{ title: "Weather Gear - " }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const query = formData.get("query") as string;

  const locationSearch = await getLocation(query);

  if (locationSearch.location) {
    return redirect(
      `/cycling?lat=${locationSearch.location.lat}&lon=${locationSearch.location.lon}`,
    );
  }

  return json(locationSearch);
};

export default function Index() {
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
    <main className="relative flex flex-col items-center gap-8 p-4 md:p-8">
      <div className="flex gap-2">
        <Form method="post" ref={formRef}>
          <div className="flex border rounded-full bg-white">
            <input
              type="text"
              name="query"
              placeholder="Search city or zip"
              autoFocus={true}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="px-4 py-2 flex-1 rounded-full"
            />
            <button
              type="submit"
              className="w-10 flex justify-center items-center rounded-full"
            >
              <IconSearch />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </Form>
        <GeoLocation />
      </div>

      {locationSearch?.locations && (
        <ListLocations locations={locationSearch.locations} />
      )}
    </main>
  );
}

function ListLocations({ locations }: { locations: WeatherLocation[] }) {
  return (
    <ul className="border-t border-gray-300">
      {locations.length === 0 && <li className="py-2">No locations found</li>}
      {locations.map((location) => (
        <li key={location.name} className="border-b border-gray-300">
          <Link
            to={`/cycling?lat=${location.lat}&lon=${location.lon}`}
            className="block py-2"
          >
            {location.name} <span className="opacity-50">{location.state}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function GeoLocation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSuccess(data: GeolocationPosition) {
    const { latitude, longitude } = data.coords;
    navigate(`/cycling?lat=${latitude}&lon=${longitude}`);
    setLoading(false);
  }

  function handleError(data: GeolocationPositionError) {
    alert(data.message); // TODO: Handle get location error
    setLoading(false);
  }

  function getLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  return (
    <button
      type="button"
      className={`w-10 flex justify-center items-center rounded-full${
        loading ? " loading" : ""
      }`}
      onClick={getLocation}
    >
      <IconLocation />
      <span className="sr-only">Use location from your device</span>
    </button>
  );
}

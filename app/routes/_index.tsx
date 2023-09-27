import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import type { WeatherLocation } from "~/openweathermap/openweathermap-types";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getLocation } from "~/openweathermap/openweathermap-utils";
import { IconLocation, IconSearch } from "~/components/icons";

// TODO: cookie users location, or redirect to /location?

export const meta: MetaFunction = () => [{ title: "Weather Gear" }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const query = formData.get("query") as string;
  const lat = formData.get("lat") as string;
  const lon = formData.get("lon") as string;

  if (lat && lon) {
    return redirect(`/cycling?lat=${lat}&lon=${lon}`);
  }

  const findLocation = await getLocation(query);
  return json(findLocation);
};

export default function Index() {
  const locations = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLocation, setUsersLocation] =
    useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (query.length < 3) return;
    const timeOutId = setTimeout(() => submit(formRef.current), 300);
    return () => clearTimeout(timeOutId);
  }, [query, submit]);

  useEffect(() => {
    if (usersLocation === null) return;
    const timeOutId = setTimeout(() => submit(formRef.current), 300);
    return () => clearTimeout(timeOutId);
  }, [usersLocation, submit]);

  function handleSetLocation(data: GeolocationPosition) {
    setUsersLocation(data);
    setLoading(false);
  }

  // TODO: Handle get location error, allow user to enter location or weather?
  function handleLocationError(data: GeolocationPositionError) {
    alert(data.message);
  }

  function getLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleSetLocation,
      handleLocationError,
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center gap-8 w-full p-4 md:p-8 bg-blue-100">
      <Form method="post" ref={formRef} className="flex gap-2">
        {usersLocation?.coords?.latitude && (
          <input
            hidden
            name="lat"
            defaultValue={usersLocation.coords.latitude}
          />
        )}
        {usersLocation?.coords?.longitude && (
          <input
            hidden
            name="lon"
            defaultValue={usersLocation.coords.longitude}
          />
        )}
        <div className="flex border rounded-full bg-white">
          <input
            type="text"
            name="query"
            placeholder="Enter location"
            autoFocus={true}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-transparent flex-1 outline-none"
          />
          <button
            type="submit"
            className="w-12 flex justify-center items-center"
          >
            <IconSearch />
            <span className="sr-only">Search location</span>
          </button>
        </div>

        <button
          type="button"
          className="w-10 flex justify-center items-center"
          onClick={getLocation}
        >
          <IconLocation />
          <span className="sr-only">Get location</span>
        </button>
      </Form>

      {loading && <div>Loading...</div>}

      {locations && <ListLocations locations={locations} />}
    </main>
  );
}

function ListLocations({ locations }: { locations: WeatherLocation[] }) {
  return (
    <>
      <ul className="border-t border-gray-300">
        {locations.map((location) => (
          <li key={location.name} className="border-b border-gray-300">
            <Link
              to={`/cycling?lat=${location.lat}&lon=${location.lon}`}
              className="block py-2"
            >
              {location.name}{" "}
              <span className="opacity-50">{location.state}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

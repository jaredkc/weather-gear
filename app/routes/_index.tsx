import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { DisplayGeolocationPosition } from "~/components/DisplayGeolocationPosition";
import IconLocation from "~/components/IconLocation";
import { getWeatherByLatLon } from "~/openweathermap/openweathermap-utils";

// TODO: Add https://www.npmjs.com/package/openweathermap-ts
// TODO: cookie users location, or redirect to /location?

export const meta: MetaFunction = () => [{ title: "Weather Gear" }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const lat = formData.get('lat') as string;
  const lon = formData.get('lon') as string;

  invariant(lat && lon, "Missing lat or lon");

  const weather = await getWeatherByLatLon(lat, lon);

  return json({ weather });
};

const btnClasses =
  "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 flex gap-1 items-center justify-center";
const inputClasses =
  "rounded px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500";

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [loading, setLoading] = useState(false);
  const [usersLocation, setUsersLocation] =
    useState<GeolocationPosition | null>(null);

  function handleSetLocation(data: GeolocationPosition) {
    setUsersLocation(data);
    setLoading(false);
  }

  function getLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleSetLocation,
      errorGetLocation,
    );
  }

  // TODO: Handle get location error, allow user to enter location or weather?
  function errorGetLocation(data: GeolocationPositionError) {
    alert(data.message);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center gap-4">
        <Form method="post" className="flex gap-2">
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
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className={inputClasses}
          />
          <button type="submit" className={btnClasses}>
            Get weather
          </button>
        </Form>
        <button className={btnClasses} onClick={getLocation}>
          <IconLocation />
          Get location
        </button>
      </div>

      {loading && <div>Loading...</div>}

      {usersLocation && <DisplayGeolocationPosition position={usersLocation} />}

      {actionData && <pre>{JSON.stringify(actionData, null, 2)}</pre>}
    </main>
  );
}

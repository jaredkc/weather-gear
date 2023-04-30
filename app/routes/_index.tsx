import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { DisplayGeolocationPosition } from "~/components/DisplayGeolocationPosition";

// TODO: Add https://www.npmjs.com/package/openweathermap-ts
// TODO: cookie users location, or redirect to /location?

export const meta: V2_MetaFunction = () => [{ title: "Weather Gear" }];

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const lat = formData.get("lat");
  const lon = formData.get("lon");

  const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  invariant(openWeatherApiKey, "OPEN_WEATHER_API_KEY must be set");
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => json({ weather: data }))
    .catch((error) => json({ error }));
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [loading, setLoading] = useState(false);
  const [usersLocation, setUsersLocation] =
    useState<GeolocationPosition | null>(null);
  const btnClasses =
    "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400";

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        handleSetLocation,
        errorGetLocation
      );
    } else {
      // TODO: handle UI for location not supported
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  function handleSetLocation(data: GeolocationPosition) {
    setUsersLocation(data);
    setLoading(false);
  }

  function getLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleSetLocation,
      errorGetLocation
    );
  }

  // TODO: Handle get location error, allow user to enter location or weather?
  function errorGetLocation(data: GeolocationPositionError) {
    alert(data.message);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8">
      {loading ? <div>Loading...</div> : <div>Done</div>}

      {usersLocation && <DisplayGeolocationPosition position={usersLocation} />}

      {actionData && <pre>{JSON.stringify(actionData, null, 2)}</pre>}

      {usersLocation && (
        <div className="flex items-center justify-center gap-4">
          <button className={btnClasses} onClick={getLocation}>
            Get location
          </button>
          <Form method="post">
            <input hidden name="lat" value={usersLocation.coords.latitude} />
            <input hidden name="lon" value={usersLocation.coords.longitude} />
            <button type="submit" className={btnClasses}>
              Get weather
            </button>
          </Form>
        </div>
      )}
    </main>
  );
}

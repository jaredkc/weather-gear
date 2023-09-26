import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { DisplayGeolocationPosition } from "~/components/DisplayGeolocationPosition";
import IconLocation from "~/components/IconLocation";
import { getLocation } from "~/openweathermap/openweathermap-utils";

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

  if (query) {
    console.log('getting locations');
    const findLocation = await getLocation(query);
    return json(findLocation);
  }
};

const btnClasses =
  "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 flex gap-1 items-center justify-center";
const inputClasses =
  "rounded px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500";

export default function Index() {
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLocation, setUsersLocation] =
    useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (query.length < 3) return;
    const timeOutId = setTimeout(() => submit(formRef.current), 500);
    return () => clearTimeout(timeOutId);
  }, [query, submit]);

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
        <input
          type="text"
          name="query"
          placeholder="Enter location"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={inputClasses}
        />
        <button type="submit" className={btnClasses}>
          Search location
        </button>
        <button type="button" className={btnClasses} onClick={getLocation}>
          <IconLocation />
          <span className="sr-only">Get location</span>
        </button>
      </Form>

      {loading && <div>Loading...</div>}

      {usersLocation && <DisplayGeolocationPosition position={usersLocation} />}

      {actionData && <pre>{JSON.stringify(actionData, null, 2)}</pre>}
    </main>
  );
}

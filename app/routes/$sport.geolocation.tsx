import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { coordLocations } from "~/openweathermap/openweathermap-utils.server";

// If a the user used geolocation, we don't have a location name.
// Fetch it and redirect to $sport.$location route.

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const sport = params.sport;
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const locations = await coordLocations({ lat, lon });

  if ("cod" in locations) throw new Error(locations.message);

  return redirect(`/${sport}/${locations[0].name}?lat=${lat}&lon=${lon}`);
};

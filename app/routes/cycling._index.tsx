import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { coordLocations } from "~/openweathermap/openweathermap-utils.server";
import { slugify } from "~/utils";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const locations = await coordLocations({ lat, lon });

  if ("cod" in locations) throw new Error(locations.message);

  const locationName = slugify(locations[0].name);

  return redirect(`/cycling/${locationName}?lat=${lat}&lon=${lon}`);
};

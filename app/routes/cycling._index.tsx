import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/components/Header";
import { getForecast } from "~/openweathermap/openweathermap-utils";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  invariant(lat, "Latitude not found");
  invariant(lon, "Logitude not found");

  const forecast = await getForecast({ lat, lon });

  return json({ lat, lon, forecast });
};

export default function WIP() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-blue-100 gap-8">
      <Header />
      <h1>Weather for: {data.forecast.city.name}</h1>
      {data.forecast && <pre>{JSON.stringify(data.forecast, null, 2)}</pre>}
    </main>
  );
}

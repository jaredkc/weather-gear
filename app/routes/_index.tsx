import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { AppFrame } from "~/components/AppFrame";
import { LocationCard } from "~/components/LocationCard";
import { sampleOneCall } from "~/openweathermap/data/sample-onecall";

export const meta: MetaFunction = () => [{ title: "Weather Gear - " }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const forecast = sampleOneCall;
  return json({ forecast });
};

export default function Index() {
  const { forecast } = useLoaderData<typeof loader>();

  return (
    <AppFrame>
      <div className="flex flex-col gap-4">
        <Link to="cycling?lat=40.6727607&lon=-111.860115">
          <LocationCard location="Millcreek" current={forecast.current} />
        </Link>
      </div>
    </AppFrame>
  );
}

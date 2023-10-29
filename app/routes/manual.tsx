import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { AppFrame } from "~/components/AppFrame";
import { GearList } from "~/components/GearList";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";
import { sampleOneCall } from "~/openweathermap/data/sample-onecall";

export const meta: MetaFunction = () => [{ title: "Manually set your weather - WeatherGear.app" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const temp = 65;
  const gear = gearForTemp(cyclingGear, temp);
  const forecast = sampleOneCall;

  return json({ forecast, gear, temp });
};

export default function Index() {
  const { gear, temp } = useLoaderData<typeof loader>();

  const [tempValue, setTempValue] = useState(temp);
  const [gearList, setGearList] = useState(gear);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setTempValue(newValue);
    setGearList(gearForTemp(cyclingGear, newValue));
  };

  return (
    <AppFrame>
      <div className="mt-12">
        <div className="text-center text-5xl">{tempValue}°F</div>

        <div className="my-8">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={tempValue}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <GearList gear={gearList} />
      </div>
    </AppFrame>
  );
}

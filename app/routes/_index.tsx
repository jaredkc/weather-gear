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

export const meta: MetaFunction = () => [{ title: "Weather Gear - " }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const temp = 65;
  const gear = gearForTemp(cyclingGear, 38);

  return json({ temp, gear });
};

export default function Index() {
  const { temp, gear } = useLoaderData<typeof loader>();
  const [sliderValue, setSliderValue] = useState(temp);
  const [gearList, setGearList] = useState(gear);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);
    setGearList(gearForTemp(cyclingGear, newValue));
  };

  return (
    <AppFrame>
      <div className="text-center text-5xl">{sliderValue}°F</div>

      <div className="my-8">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={sliderValue}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <GearList gear={gearList} />
    </AppFrame>
  );
}

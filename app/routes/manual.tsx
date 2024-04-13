import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { AppFrame } from "~/components/AppFrame";
import { Card } from "~/components/Card";
import { GearList } from "~/components/GearList";
import { cyclingGear, gearForTemp, runningGear } from "~/gear";

export const meta: MetaFunction = () => [
  { title: "Manually set your weather - WeatherGear.app" },
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const temp = 65;
  const gear = gearForTemp(cyclingGear, temp);

  return json({ gear, temp });
};

export default function Index() {
  const { gear, temp } = useLoaderData<typeof loader>();

  const [tempValue, setTempValue] = useState(temp);
  const [selectValue, setSelectValue] = useState("cycling");
  const [gearList, setGearList] = useState(gear);

  const handleRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setTempValue(newValue);
    setGearList(
      gearForTemp(
        selectValue === "cycling" ? cyclingGear : runningGear,
        newValue,
      ),
    );
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectValue(newValue);
    setGearList(
      gearForTemp(
        newValue === "cycling" ? cyclingGear : runningGear,
        tempValue,
      ),
    );
  };

  return (
    <AppFrame showBack>
      <div className="text-7xl text-center heading">{tempValue}°</div>

      <div className="my-8">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={tempValue}
          onChange={handleRange}
          className="w-full"
        />
      </div>

      <select
        className="w-full px-4 py-2 mb-4 bg-white rounded-lg shadow-lg text-slate-700"
        onChange={handleSelect}
        value={selectValue}
      >
        <option value="cycling">Cycling</option>
        <option value="running">Running</option>
      </select>

      <Card>
        <GearList gear={gearList} />
      </Card>
    </AppFrame>
  );
}

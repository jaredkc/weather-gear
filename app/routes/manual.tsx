import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Card } from "~/components/Card";
import { GearList } from "~/components/GearList";
import { IconBike, IconRun } from "~/components/icons";
import { cyclingGear, gearForTemp, runningGear } from "~/gear";

export const meta: MetaFunction = () => [
  { title: "What to wear while cycling and running, set your conditions" },
  {
    name: "description",
    content:
      "Set your temperature and see what to wear while cycling and running",
  },
  {
    name: "theme-color",
    content: "#0f172a",
  },
];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const temp = 65;
  const gear = gearForTemp(cyclingGear, temp);

  return json({ gear, temp });
};

export default function Index() {
  const { gear, temp } = useLoaderData<typeof loader>();

  const [tempValue, setTempValue] = useState(temp);
  const [sport, setSport] = useState("cycling");
  const [gearList, setGearList] = useState(gear);

  const handleRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setTempValue(newValue);
    setGearList(
      gearForTemp(sport === "cycling" ? cyclingGear : runningGear, newValue),
    );
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSport(newValue);
    setGearList(
      gearForTemp(
        newValue === "cycling" ? cyclingGear : runningGear,
        tempValue,
      ),
    );
  };

  return (
    <div>
      <Card>
        <div className="p-4">
          <div className="flex justify-between">
            <h1>
              <span className="text-sm tracking-widest uppercase">
                What to wear while
              </span>
              <span className="block text-3xl leading-8">
                Cycling &amp; Running
              </span>
            </h1>
            <div>
              <img
                src="/_static/weather-icons/02d.svg"
                alt=""
                width="110"
                height="110"
                className="inline-block -mt-10 -mb-4"
              />
            </div>
          </div>
          <p className="mt-4">
            Set your sport and weather temperature to see what you should wear.
          </p>
        </div>
      </Card>

      <div className="my-4 relative flex items-center gap-2 px-3 py-1.5 border border-slate-800 bg-opacity-50 rounded-lg bg-slate-900">
        <div className="w-5 h-5 shrink-0">
          {sport === "cycling" ? <IconBike /> : <IconRun />}
        </div>
        <div className="grow">
          {sport.charAt(0).toUpperCase() + sport.slice(1)}
        </div>
        <div className="w-5 h-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              stroke="%236b7280"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 8l4 4 4-4"
            />
          </svg>
        </div>
        <select
          id="sport"
          name="sport"
          className="absolute inset-0 w-full h-full opacity-0 appearance-none"
          onChange={handleSelect}
          value={sport}
        >
          <option value="cycling">Cycling</option>
          <option value="running">Running</option>
        </select>
      </div>

      <div className="mt-8 mb-6 text-center text-7xl heading">{tempValue}°</div>

      <div className="mb-8">
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

      <Card>
        <GearList gear={gearList} />
      </Card>
    </div>
  );
}

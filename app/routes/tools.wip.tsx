import { type MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { AppFrame } from "~/components/AppFrame";
import { IconBike } from "~/components/icons/IconBike";
import { IconRun } from "~/components/icons/IconRun";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export default function Wip() {
  const fetcher = useFetcher();
  const [sport, setSport] = useState("cycling");

  const setUserPreference = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSport(newValue);
    fetcher.submit(
      {
        sport: newValue,
        clientDate: new Date().getTime(),
      },
      {
        action: `/api/set-user-preference`,
        method: "post",
      },
    );
  };
  return (
    <AppFrame showBack>
      <h1 className="text-2xl text-center">Work-in-progress</h1>

      <div className="relative inline-flex items-center gap-2 px-3 py-1.5 border border-slate-800 bg-opacity-50 rounded-lg bg-slate-900">
        <div className="w-5 h-5 shrink-0">
          {sport === "cycling" ? <IconBike /> : <IconRun />}
        </div>
        {sport.charAt(0).toUpperCase() + sport.slice(1)}
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
          onChange={setUserPreference}
        >
          <option value="cycling">Cycling</option>
          <option value="running">Running</option>
        </select>
      </div>
    </AppFrame>
  );
}

import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { IconBike, IconRun } from "~/components/icons";
import { getUsersPreference } from "~/session.server";

export const meta: MetaFunction = () => [{ title: "Work-in-progress" }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const usersPreference = await getUsersPreference(request);
  return json({ usersPreference });
};

export default function Wip() {
  const { usersPreference } = useLoaderData<typeof loader>();
  const sport = usersPreference?.sport || "cycling";
  const fetcher = useFetcher();

  const setUserPreference = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
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
    <div>
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
          value={sport}
          onChange={setUserPreference}
        >
          <option value="cycling">Cycling</option>
          <option value="running">Running</option>
        </select>
      </div>
    </div>
  );
}

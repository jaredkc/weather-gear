import { Card } from "./Card";
import { slugToTitle } from "~/utils";
import type { UserLocation } from "~/models/user-location.server";
import clsx from "clsx";
import { WeatherIcons } from "./WeatherIcons";

type Props = {
  location: UserLocation;
  highlight?: boolean;
};

export const LocationCard = ({ location, highlight }: Props) => {
  const { name, dt, temp, timezone, weather } = location;
  const tempWidth = Math.round((temp.max - temp.min) * 3);
  const tempColor = (t: number) => {
    if (t < 35) return "blue";
    if (t < 55) return "cyan";
    if (t < 65) return "lime";
    if (t < 85) return "yellow";
    if (t < 95) return "orange";
    return "red";
  };

  // Function to return LocaleDateString with with / replaced with .
  function getLocaleDateString(date: Date) {
    return date
      .toLocaleDateString("en-US", {
        timeZone: timezone,
      })
      .replace(/\//g, ".");
  }

  return (
    <div data-component="LocationCard">
      <Card highlight={highlight}>
        <div className="flex gap-4 justify-between items-center px-4 py-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl">{slugToTitle(name)}</h2>
            <div className="text-sm flex gap-2 items-center">
              <span className="sr-only">Low and high temperature:</span>
              <span>{Math.round(temp.min)}°</span>
              <div
                className={clsx(
                  "w-10 h-1 bg-cyan-400 rounded-full min-w-6 bg-gradient-to-r mr-px",
                  `from-${tempColor(temp.min)}-500`,
                  `to-${tempColor(temp.max)}-500`,
                )}
                style={{ width: `${tempWidth}px` }}
              />
              <span>{Math.round(temp.max)}°</span>
            </div>
            <p title="Last updated" className="text-xs opacity-50 mt-2">
              <span className="sr-only">Weather last updated:</span>{" "}
              {getLocaleDateString(new Date(dt * 1000))}
            </p>
          </div>
          <div>
            <WeatherIcons icon={weather.icon} size={96} />
          </div>
        </div>
      </Card>
    </div>
  );
};

import { Card } from "./Card";
import { WeatherIcon } from "./WeatherIcon";
import { slugToTitle } from "~/utils";
import type { UserLocation } from "~/models/user-location.server";
import { IconTemperature } from "./icons";

type Props = {
  location: UserLocation;
  highlight?: boolean;
};

export const LocationCard = ({ location, highlight }: Props) => {
  const { name, dt, temp, timezone, weather } = location;

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
            <p title="High and low temperature" className="text-sm flex gap-2">
              <span className="text-cyan-400">
                <IconTemperature />
              </span>
              <span>H:{Math.round(temp.max)}°</span>
              <span>L:{Math.round(temp.min)}°</span>
            </p>
            <p title="Last updated" className="text-xs opacity-50 mt-1">
              {getLocaleDateString(new Date(dt * 1000))}
            </p>
          </div>
          <div>
            <WeatherIcon weather={weather} size={96} />
          </div>
        </div>
      </Card>
    </div>
  );
};

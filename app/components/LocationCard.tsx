import { Card } from "./Card";
import { WeatherIcon } from "./WeatherIcon";
import { slugToTitle } from "~/utils";
import type { UserLocation } from "~/models/user-location.server";

type Props = {
  location: UserLocation;
  highlight?: boolean;
};

export const LocationCard = ({ location, highlight }: Props) => {
  const { name, dt, temp, timezone, weather } = location;
  return (
    <Card highlight={highlight}>
      <div className="flex gap-4 justify-between items-center px-4">
        <div className="py-2">
          <h2 className="text-2xl font-light">{slugToTitle(name)}</h2>
          <p className="text-sm flex gap-2">
            <span>H:{Math.round(temp.max)}°</span>
            <span className="opacity-50">&middot;</span>
            <span>L:{Math.round(temp.min)}°</span>
          </p>
          <p className="text-xs opacity-50 mt-1">
            {new Date(dt * 1000).toLocaleDateString("en-US", {
              timeZone: timezone,
            })}
          </p>
        </div>
        <div>
          <WeatherIcon weather={weather} size={96} />
        </div>
      </div>
    </Card>
  );
};

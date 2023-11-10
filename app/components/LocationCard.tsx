import type { Daily } from "~/openweathermap/openweathermap-types";
import { Card } from "./Card";
import { WeatherIcon } from "./WeatherIcon";
import { slugToTitle } from "~/utils";

type Props = {
  location: string;
  timezone: string;
  daily: Daily;
};

export const LocationCard = ({ location, timezone, daily }: Props) => {
  return (
    <Card>
      <div className="flex gap-4 justify-between items-center px-4">
        <div className="py-2">
          <h2>{slugToTitle(location)}</h2>
          <p className="text-sm flex gap-2">
            <span>H:{Math.round(daily.temp.max)}°</span>
            <span className="opacity-50">&middot;</span>
            <span>L:{Math.round(daily.temp.min)}°</span>
            <span className="opacity-50">&middot;</span>
            <span>W:{Math.round(daily.wind_speed)}mph</span>
          </p>
          <p className="text-xs opacity-50 mt-1">
            {new Date(daily.dt * 1000).toLocaleDateString("en-US", {
              timeZone: timezone,
            })}
          </p>
        </div>
        <div>
          <WeatherIcon weather={daily.weather[0]} size={96} />
        </div>
      </div>
    </Card>
  );
};

import type { Current } from "~/openweathermap/openweathermap-types";
import { Card } from "./Card";
import { WeatherIcon } from "./WeatherIcon";

type Props = {
  location: string;
  current: Current;
};

export const LocationCard = ({ location, current }: Props) => {
  return (
    <Card>
      <div className="flex gap-4 justify-between items-center px-4">
        <div className="py-2">
          <h2>{location}</h2>
          <p className="text-sm flex gap-2">
            <span>T:{Math.round(current.temp)}°</span>
            <span className="opacity-50">&middot;</span>
            <span>W:{Math.round(current.wind_speed)}mph</span>
          </p>
          <p className="text-xs opacity-50 mt-1">
            {new Date(current.dt * 1000).toLocaleString()}
          </p>
        </div>
        <div>
          <WeatherIcon weather={current.weather[0]} size={96} />
        </div>
      </div>
    </Card>
  );
};

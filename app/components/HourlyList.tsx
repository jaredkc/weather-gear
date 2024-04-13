import type { Hourly } from "~/openweathermap/openweathermap-types";
import { getWeatherIcon } from "~/utils";
import { IconTemperature, IconWind } from "./icons";

type Props = {
  hour: Hourly;
  timezone: string;
};

export const HourlyList = ({ hour, timezone }: Props) => {
  const { dt, temp, weather, wind_speed } = hour;
  const iconUrl = getWeatherIcon(weather[0].icon);

  const convertTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: timezone,
    });
  };

  return (
    <div className="px-2 py-3 text-sm text-center" data-component="HourlyList">
      <div>
        <span className="sr-only">What to wear at </span>
        {convertTime(dt)}
      </div>
      <img
        src={iconUrl}
        alt={weather[0].description}
        width={64}
        height={64}
        className="inline-block"
      />
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-cyan-400">
            <IconTemperature />
          </span>
          {Math.round(temp)}°
        </div>
        <div className="flex items-center gap-1">
          {Math.round(wind_speed)}
          <span className="text-cyan-400">
            <IconWind />
          </span>
        </div>
      </div>
    </div>
  );
};

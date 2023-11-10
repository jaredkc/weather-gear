import type { Hourly } from "~/openweathermap/openweathermap-types";
import { getWeatherIcon } from "~/utils";

type Props = {
  hour: Hourly;
  timezone: string;
};

export const HourlyList = ({ hour, timezone }: Props) => {
  const { dt, temp, weather } = hour;
  const iconUrl = getWeatherIcon(weather[0].icon);

  const convertTime = (dt: number) => {
    return new Date(dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: timezone,
    });
  };

  return (
    <div className="text-center">
      <div className="text-xs">{convertTime(dt)}</div>
      <img src={iconUrl} alt={weather[0].description} width={60} height={60} />
      <div className="text-sm">{Math.round(temp)}°</div>
    </div>
  );
};

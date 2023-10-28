import type { Weather } from "~/openweathermap/openweathermap-types-onecall";
import { getWeatherIcon } from "~/utils";

type Props = {
  weather: Weather;
  size: number;
}

export const WeatherIcon = ({ weather, size }: Props) => {
  const iconUrl = getWeatherIcon(weather.icon, "@4x");
  return (
    <img src={iconUrl} alt={weather.description} width={size} height={size} />
  );
};

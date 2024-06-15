import type { Weather } from "~/openweathermap/openweathermap-types";
import { getWeatherIcon } from "~/utils";

type Props = {
  weather: Weather;
  size: number;
};

export const WeatherImgIcon = ({ weather, size }: Props) => {
  const iconUrl = getWeatherIcon(weather.icon);
  return (
    <div>
      <img src={iconUrl} alt={weather.description} width={size} height={size} />
    </div>
  );
};

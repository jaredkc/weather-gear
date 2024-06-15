import type { Weather } from "~/openweathermap/openweathermap-types";
import {
  Icon01d,
  Icon01n,
  Icon02d,
  Icon02n,
  Icon03d,
  Icon03n,
  Icon04d,
  Icon04n,
  Icon09d,
  Icon09n,
  Icon10d,
  Icon10n,
  Icon11d,
  Icon11n,
  Icon13d,
  Icon13n,
  Icon50d,
  Icon50n,
} from "./icons-weather";

type Props = {
  icon: Weather["icon"];
  size?: number;
}

export function WeatherIcons({icon, size = 60}: Props): JSX.Element {
  let iconSvg;
  switch (icon) {
    default:
      iconSvg = <Icon01d size={size} />;
      break;
    case "01n":
      iconSvg = <Icon01n size={size} />;
      break;
    case "02d":
      iconSvg = <Icon02d size={size} />;
      break;
    case "02n":
      iconSvg = <Icon02n size={size} />;
      break;
    case "03d":
      iconSvg = <Icon03d size={size} />;
      break;
    case "03n":
      iconSvg = <Icon03n size={size} />;
      break;
    case "04d":
      iconSvg = <Icon04d size={size} />;
      break;
    case "04n":
      iconSvg = <Icon04n size={size} />;
      break;
    case "09d":
      iconSvg = <Icon09d size={size} />;
      break;
    case "09n":
      iconSvg = <Icon09n size={size} />;
      break;
    case "10d":
      iconSvg = <Icon10d size={size} />;
      break;
    case "10n":
      iconSvg = <Icon10n size={size} />;
      break;
    case "11d":
      iconSvg = <Icon11d size={size} />;
      break;
    case "11n":
      iconSvg = <Icon11n size={size} />;
      break;
    case "13d":
      iconSvg = <Icon13d size={size} />;
      break;
    case "13n":
      iconSvg = <Icon13n size={size} />;
      break;
    case "50d":
      iconSvg = <Icon50d size={size} />;
      break;
    case "50n":
      iconSvg = <Icon50n size={size} />;
      break;
  }
  return iconSvg;
}

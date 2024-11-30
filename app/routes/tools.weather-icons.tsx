import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Static Weather Icons" }];

export default function WeatherIcons() {
  return (
    <div>
      <h1 className="text-2xl text-center">Weather Icons</h1>

      <div className="mt-12 text-center grid grid-cols-2 gap-4">
        <div><img src="/_static/weather-icons/01d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/01n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/02d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/02n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/03d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/03n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/04d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/04n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/09d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/09n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/10d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/10n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/11d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/11n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/13d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/13n.svg" alt="" width="120" height="120" className="inline-block" /></div>

        <div><img src="/_static/weather-icons/50d.svg" alt="" width="120" height="120" className="inline-block" /></div>
        <div><img src="/_static/weather-icons/50n.svg" alt="" width="120" height="120" className="inline-block" /></div>
      </div>
    </div>
  );
}

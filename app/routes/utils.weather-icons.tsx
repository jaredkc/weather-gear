import { type MetaFunction } from "@remix-run/node";

import cloud from "../assets/cloud.svg";
import moon from "../assets/moon.svg";
import snow from "../assets/snow.svg";
import sun from "../assets/sun.svg";

export const meta: MetaFunction = () => [{ title: "Static Weather Icons" }];

export default function WeatherIcons() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl">Weather Icons</h1>
      <p className="mt-2">
        This is a static page where we import all weather icons to ensure they
        are included in development and build. We can then use these image URLs
        throughout the app.
      </p>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div><img src={cloud} alt="Cloud" width="80" height="80" className="inline-block" /></div>
        <div><img src={moon} alt="Moon" width="80" height="80" className="inline-block" /></div>
        <div><img src={snow} alt="Snow" width="80" height="80" className="inline-block" /></div>
        <div><img src={sun} alt="Sun" width="80" height="80" className="inline-block" /></div>
      </div>
    </div>
  );
}

import { Link, useLocation, useNavigation } from "@remix-run/react";
import { WeatherGearLogo } from "./WeatherGearLogo";
import { IconChevron } from "./icons";
import { useEffect, useState } from "react";
import { type UserPreference } from "~/models/user-location.server";
import { SportSelect } from "./SportSelect";

type Props = {
  children: React.ReactNode;
  sport: UserPreference["sport"];
};

export const AppFrame = ({ children, sport }: Props) => {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <div className="px-4" data-component="AppFrame">
      <div className="flex flex-col max-w-sm mx-auto min-h-[100svh]">
        <header className="flex items-center justify-between h-20 text-white">
          {location.pathname !== "/" ? (
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-300 hover:text-white"
            >
              <span className="-ml-2 rotate-180 text-cyan-400">
                <IconChevron />
              </span>
              <span className="text-xs tracking-widest uppercase">back</span>
            </Link>
          ) : (
            <WeatherGearLogo />
          )}
          {location.pathname === "/" && <SportSelect sport={sport} />}
        </header>
        <main className="grow">{children}</main>
        <footer className="flex items-center justify-between py-8 text-xs text-slate-500">
          <div className="flex gap-4">
            <Link to="/manual" className="hover:text-slate-300">Manual Mode</Link>
            <Link to="/about" className="hover:text-slate-300">About</Link>
          </div>
          <span>App updated 05.05.2024</span>
        </footer>
      </div>
      {navigation.state !== "idle" && <Loading />}
    </div>
  );
};

function Loading() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0.2);
    const timer1 = setTimeout(() => setWidth(0.4), 500);
    const timer2 = setTimeout(() => setWidth(0.6), 1000);
    const timer3 = setTimeout(() => setWidth(0.8), 3000);
    const timer4 = setTimeout(() => setWidth(0.9), 6000);
    const timer5 = setTimeout(() => setWidth(0.99), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-0.5 origin-left transition duration-300 bg-gradient-to-r from-cyan-400 to-indigo-400"
      style={{ transform: `scaleX(${width})` }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

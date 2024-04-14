import { Link, useNavigation } from "@remix-run/react";
import { WeatherGearLogo } from "./WeatherGearLogo";
import { IconChevron } from "./icons";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  navItems?: React.ReactNode;
  showBack?: boolean;
};

export const AppFrame = ({ children, navItems, showBack }: Props) => {
  const navigation = useNavigation();

  return (
    <div className="px-4" data-component="AppFrame">
      <div className="flex flex-col max-w-sm mx-auto min-h-[100svh]">
        <header className="flex items-center justify-between h-20 text-white">
          {showBack ? (
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
          {navItems}
        </header>
        <main className="grow">{children}</main>
        <footer className="flex items-center justify-between py-8 text-xs text-slate-500">
          <span>A work-in-progress by Jared Cornwall</span>
          <span>Updated 04.12.2024</span>
        </footer>
      </div>
      {navigation.state !== 'idle' && <Loading />}
    </div>
  );
};

function Loading() {
  const [width, setWidth] = useState(0);
  const [duration, setDuration] = useState('3000ms');

  useEffect(() => {
    setWidth(0.5);
    const timer1 = setTimeout(() => {
      setWidth(0.6);
      setDuration('1000ms');
    }, 3000);
    const timer2 = setTimeout(() => {
      setWidth(0.7);
      setDuration('2000ms');
    }, 4000);
    const timer3 = setTimeout(() => setWidth(0.8), 6000);
    const timer4 = setTimeout(() => setWidth(0.9), 8000);
    const timer5 = setTimeout(() => setWidth(0.99), 10000);

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
      className="fixed top-0 left-0 w-full h-0.5 origin-left linear bg-gradient-to-r from-cyan-400 to-indigo-400"
      style={{ transform: `scaleX(${width})`, animationDuration: duration }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

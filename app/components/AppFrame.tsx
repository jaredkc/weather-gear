import { Link } from "@remix-run/react";
import { WeatherGearLogo } from "./WeatherGearLogo";
import { IconChevron } from "./icons";

type Props = {
  children: React.ReactNode;
  navItems?: React.ReactNode;
  showBack?: boolean;
};

export const AppFrame = ({ children, navItems, showBack }: Props) => {
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
    </div>
  );
};

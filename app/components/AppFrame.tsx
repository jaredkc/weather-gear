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
    <div className="px-4">
      <div className="flex flex-col max-w-sm mx-auto min-h-[100svh]">
        <header className="flex items-center justify-between h-20 text-white">
          {showBack ? (
            <Link to="/" className="flex items-center gap-1">
              <span className="-ml-2 rotate-180 text-cyan-400">
                <IconChevron />
              </span>
              <span className="text-xs tracking-widest uppercase text-slate-300">
                back
              </span>
            </Link>
          ) : (
            <WeatherGearLogo />
          )}
          {navItems}
        </header>
        <main className="grow">{children}</main>
        <footer className="flex items-center justify-between py-8 text-xs text-slate-500">
          <span>&nbsp;</span>
          <span>2022.11.19</span>
          <span>&nbsp;</span>
        </footer>
      </div>
    </div>
  );
};

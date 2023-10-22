import { Link } from "@remix-run/react";
import GeoLocation from "./GeoLocation";

type Props = {
  children: React.ReactNode;
};

export const AppFrame = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen">
      <header className="fixed bottom-0 flex items-center justify-between w-full p-4 text-white bg-slate-800 md:top-0 md:bottom-auto">
        <ul className="flex items-center justify-around w-full gap-4">
          <li>
            <Link to="/" unstable_viewTransition>Home</Link>
          </li>
          <li className="opacity-50">Locations</li>
          <li>
            <Link to="/search" unstable_viewTransition>Search</Link>
          </li>
          <li>
            <GeoLocation />
          </li>
        </ul>
      </header>
      <main className="flex min-h-full px-4 pt-8 pb-24 md:pt-24 md:pb-8">
        <div className="w-full max-w-sm mx-auto">{children}</div>
      </main>
    </div>
  );
};

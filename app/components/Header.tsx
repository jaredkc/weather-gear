import IconLocation from "./IconLocation";
import IconMenu from "./IconMenu";

const summaryClasses =
  "flex items-center justify-center w-10 h-10 rounded-full bg-white/75";

export default function Header() {
  return (
    <header className="header">
      <nav className="fixed top-0 left-0 right-0 p-4 md:p-8 flex justify-between">
        <details className="drawer drawer--left">
          <summary
            className={summaryClasses}
            aria-label="Menu"
            aria-controls="menu-drawer"
          >
            <IconMenu />
          </summary>
          <div id="menu-drawer" className="drawer__content">
            <ul>
              <li>Cycling</li>
              <li>Running</li>
            </ul>
          </div>
        </details>

        <details className="drawer drawer--right">
          <summary
            className={summaryClasses}
            aria-label="Location"
            aria-controls="location-drawer"
          >
            <IconLocation />
          </summary>
          <div id="location-drawer" className="drawer__content">
            <ul>
              <li>Enter my location</li>
              <li>Find my location</li>
            </ul>
          </div>
        </details>
      </nav>
    </header>
  );
}

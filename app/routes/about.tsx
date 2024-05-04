import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "About WeatherGear" },
  {
    name: "description",
    content:
      "Know what to wear while cycling and running for the current weather conditions",
  },
  {
    name: "theme-color",
    content: "#0f172a",
  },
];

export default function Wip() {
  return (
    <div>
      <h1 className="text-2xl text-center">About WeatherGear</h1>
      <div className="flex flex-col gap-4 mt-6">
        <p>
          A simple app that helps you know what to wear while
          cycling and running in the current weather conditions.
        </p>
        <p>
          Built by{" "}
          <a
            href="https://jaredcornwall.com/"
            className="underline decoration-slate-500 decoration-1 underline-offset-2 hover:decoration-slate-200"
          >
            Jared Cornwall
          </a>
          , a web developer and designer who loves to cycle and run and wanted
          to build something useful. It was built to be as simple as possible.
          There is no need to install an app; just visit the site and get the
          information you need.
        </p>
      </div>
    </div>
  );
}

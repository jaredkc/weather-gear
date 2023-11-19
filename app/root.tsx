import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import twStyles from "~/styles/tailwind.css";
import appStyles from "~/styles/app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: twStyles },
  { rel: "stylesheet", href: appStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full bg-slate-900">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/_static/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className="h-full text-slate-300">
        <Outlet />
        <div className="overflow-hidden">
          <img
            src="/_static/bg-gradient-1.png"
            className="fixed top-0 -translate-x-1/2 left-1/2 -z-10"
            width="800"
            height="380"
            alt=""
          />
          <img
            src="/_static/bg-gradient-2.png"
            className="fixed -translate-x-1/3 top-16 left-1/3 -z-10"
            width="625"
            height="565"
            alt=""
          />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

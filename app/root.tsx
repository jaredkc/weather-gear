import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  ErrorResponse,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import twStyles from "~/styles/tailwind.css";
import appStyles from "~/styles/app.css";

export const links: LinksFunction = () => [
  {
    rel: "alternate icon",
    type: "image/png",
    href: "/_static/favicons/favicon-32x32.png",
  },
  {
    rel: "apple-touch-icon",
    href: "/_static/favicons/apple-touch-icon.png",
  },
  {
    rel: "manifest",
    href: "/_static/site.webmanifest",
    crossOrigin: "use-credentials",
  },
  { rel: "stylesheet", href: twStyles },
  { rel: "stylesheet", href: appStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&family=Roboto:wght@300;400&display=swap",
  },
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

export function ErrorBoundary() {
  const error = useRouteError();

  let errorContent = <h1>Unknown Error</h1>;

  if (isRouteErrorResponse(error)) {
    errorContent = ShowErrorResponse(error);
  }

  if (error instanceof Error) {
    errorContent = ShowError(error);
    console.log(error.stack);
  }

  return (
    <html className="h-full bg-slate-900">
      <head>
        <title>Oh snap!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full text-slate-300">
        <div className="flex flex-col mx-auto min-h-[100svh] text-center justify-center max-w-96">
          {errorContent}
        </div>
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
        <Scripts />
      </body>
    </html>
  );
}

function ShowErrorResponse(error: ErrorResponse) {
  return (
    <div>
      <h1 className="text-3xl font-light mb-4">
        {error.status} {error.statusText}
      </h1>
      <p>{error.data}</p>
    </div>
  );
}

function ShowError(error: Error) {
  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Oh Snap!</h1>
      <p>{error.message}</p>
    </div>
  );
}

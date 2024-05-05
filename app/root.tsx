import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  ErrorResponse,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
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
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import { getUsersPreference } from "~/session.server";
import appStyles from "~/styles/app.css";
import twStyles from "~/styles/tailwind.css";
import { AppFrame } from "./components/AppFrame";

import clarityPkg from "react-microsoft-clarity";
const { clarity } = clarityPkg;

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

export const meta: MetaFunction = () => {
  return [
    { title: "What to wear while cycling and running" },
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
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const usersPreference = await getUsersPreference(request);
  return json({ usersPreference });
};

export default function App() {
  const { usersPreference } = useLoaderData<typeof loader>();
  const sport = usersPreference?.sport || "cycling";

  useEffect(() => {
    clarity.init("m7dd8rhe9q");
  }, []);

  return (
    <html lang="en" className="h-full bg-slate-900">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/_static/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className="h-full text-slate-300 font-light">
        <AppFrame sport={sport}>
          <Outlet />
        </AppFrame>
        <div className="overflow-hidden">
          <img
            src="/_static/bg-gradient-1.webp"
            className="fixed top-0 -translate-x-1/2 left-1/2 -z-10"
            width="800"
            height="380"
            alt=""
          />
          <img
            src="/_static/bg-gradient-2.webp"
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
            src="/_static/bg-gradient-1.webp"
            className="fixed top-0 -translate-x-1/2 left-1/2 -z-10"
            width="800"
            height="380"
            alt=""
          />
          <img
            src="/_static/bg-gradient-2.webp"
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
      <h1 className="text-3xl mb-4">
        {error.status} {error.statusText}
      </h1>
      <p>{error.data}</p>
    </div>
  );
}

function ShowError(error: Error) {
  return (
    <div>
      <h1 className="text-3xl mb-4">Oh Snap!</h1>
      <p>{error.message}</p>
    </div>
  );
}

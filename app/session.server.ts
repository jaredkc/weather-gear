import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

import type {
  UserLocation,
  UserPreference,
} from "~/models/user-location.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const LOCATIONS_SESSION_KEY = "locations";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export const { commitSession, destroySession } = sessionStorage;

export async function getUsersLocations(
  request: Request,
): Promise<UserLocation[] | undefined> {
  const session = await getSession(request);
  const locations = session.get(LOCATIONS_SESSION_KEY);
  return locations;
}

export async function getUsersPreference(
  request: Request,
): Promise<UserPreference | undefined> {
  const session = await getSession(request);
  const sport = session.get("sport");
  const clientDate = session.get("clientDate");
  return { sport, clientDate };
}

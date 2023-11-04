import type { Daily } from "~/openweathermap/openweathermap-types";

export type UserLocation = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  daily: Daily;
};

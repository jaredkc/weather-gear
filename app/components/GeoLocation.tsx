import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import type { UserSport } from "~/models/user-location.server";
import { IconLocation } from "./icons";

export const GeoLocation = ({sport}: {sport: UserSport}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSuccess(data: GeolocationPosition) {
    const { latitude, longitude } = data.coords;
    navigate(`/${sport}/geolocation?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}`);
  }

  function handleError(data: GeolocationPositionError) {
    alert(data.message); // TODO: Handle get location error
    setLoading(false);
  }

  function deviceLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  return (
    <button
      type="button"
      className={`flex items-center justify-center w-10 rounded-sm cursor-pointer shrink-0 opacity-75 focus:opacity-100 hover:opacity-100 transition-opacity transition-fast${
        loading ? " loading" : ""
      }`}
      onClick={deviceLocation}
      data-component="GeoLocation"
    >
      <IconLocation />
      <span className="sr-only">Use location from your device</span>
    </button>
  );
};

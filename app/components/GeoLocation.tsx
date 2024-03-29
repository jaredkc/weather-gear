import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { IconLocation } from "./icons";

export const GeoLocation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSuccess(data: GeolocationPosition) {
    const { latitude, longitude } = data.coords;
    navigate(`/cycling?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}`, {
      unstable_viewTransition: true,
    });
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
    >
      <IconLocation />
      <span className="sr-only">Use location from your device</span>
    </button>
  );
};

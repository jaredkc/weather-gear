import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { IconLocation } from "./icons";

export const GeoLocation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSuccess(data: GeolocationPosition) {
    const { latitude, longitude } = data.coords;
    navigate(`/cycling?lat=${latitude}&lon=${longitude}`, {
      unstable_viewTransition: true,
    });
    setLoading(false);
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
      className={`flex items-center justify-center w-10 bg-white border rounded-lg cursor-pointer text-slate-700 shrink-0${
        loading ? " loading" : ""
      }`}
      onClick={deviceLocation}
    >
      <IconLocation />
      <span className="sr-only">Use location from your device</span>
    </button>
  );
};

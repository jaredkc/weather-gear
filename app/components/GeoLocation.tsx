import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { IconLocation } from "./icons";

export default function GeoLocation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSuccess(data: GeolocationPosition) {
    const { latitude, longitude } = data.coords;
    navigate(`/cycling?lat=${latitude}&lon=${longitude}`, {
      unstable_viewTransition: true,
    });
  }

  function handleError(data: GeolocationPositionError) {
    alert(data.message); // TODO: Handle get location error
    setLoading(false);
  }

  function getLocation() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  return (
    <button
      type="button"
      className={`w-10 flex justify-center items-center${
        loading ? " loading" : ""
      }`}
      onClick={getLocation}
    >
      <IconLocation />
      <span className="sr-only">Use location from your device</span>
    </button>
  );
}

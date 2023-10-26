import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

import { AppFrame } from "~/components/AppFrame";
import { GearList } from "~/components/GearList";
import { cyclingGear } from "~/gear/cyclingGear";
import { gearForTemp } from "~/gear/gear";

export const meta: MetaFunction = () => [{ title: "Weather Gear - " }];

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const temp = 65;
  const gear = gearForTemp(cyclingGear, temp);

  return json({ temp, gear });
};

export default function Index() {
  const { temp, gear } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(temp);
  const [gearList, setGearList] = useState(gear);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);
    setGearList(gearForTemp(cyclingGear, newValue));
  };

  useEffect(() => {
    function handleSetLocation(data: GeolocationPosition) {
      const { latitude, longitude } = data.coords;
      navigate(`/cycling?lat=${latitude}&lon=${longitude}`, {
        unstable_viewTransition: true,
      });
    }

    // TODO: Handle get location error, allow user to enter location or weather?
    function errorGetLocation(data: GeolocationPositionError) {
      setLoading(false);
      alert(data.message);
    }

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        handleSetLocation,
        errorGetLocation,
      );
    }
  }, [navigate]);

  return (
    <AppFrame>
      {loading && <div className="mb-4 text-center">Getting your location...</div>}

      <div className="text-center text-5xl">{sliderValue}°F</div>

      <div className="my-8">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={sliderValue}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <GearList gear={gearList} />
    </AppFrame>
  );
}

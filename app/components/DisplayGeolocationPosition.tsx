type Props = {
  position: GeolocationPosition;
};

export const DisplayGeolocationPosition = ({ position }: Props) => {
  return (
    <dl>
      <dt className="font-bold">Coords</dt>
      <dd className="pl-4">
        <ul>
          <li>accuracy: {position.coords.accuracy}</li>
          <li>altitude: {position.coords.altitude}</li>
          <li>altitudeAccuracy: {position.coords.altitudeAccuracy}</li>
          <li>heading: {position.coords.heading}</li>
          <li>latitude: {position.coords.latitude}</li>
          <li>longitude: {position.coords.longitude}</li>
          <li>speed: {position.coords.speed}</li>
        </ul>
      </dd>
      <dt className="font-bold">Timestamp</dt>
      <dd className="pl-4">{position.timestamp}</dd>
    </dl>
  );
};

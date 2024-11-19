import { MapBoundsFlat, MapBoundsTuples } from '../interfaces/Geolocation';

export const parseFlatBoundsToTuples = (boundingBox: MapBoundsFlat): MapBoundsTuples => {
  const [minLat, maxLat, minLng, maxLng] = boundingBox;
  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
};

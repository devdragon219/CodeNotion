import { MapCoordinates } from '../../interfaces/Geolocation';
import { isOfType } from './isOfType';

export const isMapCoordinates = (object: unknown): object is MapCoordinates =>
  isOfType<MapCoordinates>(
    object,
    ['length'],
    [(object) => Array.isArray(object) && object.length === 2 && !object.some((el) => isNaN(Number(el)))],
  );

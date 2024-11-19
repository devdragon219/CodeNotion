import { MapBoundsFlat } from '../../interfaces/Geolocation';
import { isOfType } from './isOfType';

export const isMapBoundsFlat = (object: unknown): object is MapBoundsFlat =>
  isOfType<MapBoundsFlat>(
    object,
    ['length'],
    [(object) => Array.isArray(object) && object.length === 4 && !object.some((el) => isNaN(Number(el)))],
  );

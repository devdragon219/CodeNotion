import { MapViewWithBoundingBox } from '../../interfaces/MapField';
import { isMapBoundsFlat } from './isMapBoundsFlat';
import { isOfType } from './isOfType';

export const isMapViewWithBoundingBox = (object: unknown): object is MapViewWithBoundingBox =>
  isOfType<MapViewWithBoundingBox>(object, ['boundingBox'], [(object) => isMapBoundsFlat(object.boundingBox)]);

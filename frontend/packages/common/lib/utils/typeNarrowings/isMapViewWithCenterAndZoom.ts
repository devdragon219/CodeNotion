import { MapViewWithCenterAndZoom } from '../../interfaces/MapField';
import { isMapCoordinates } from './isMapCoordinates';
import { isOfType } from './isOfType';

export const isMapViewWithCenterAndZoom = (object: unknown): object is MapViewWithCenterAndZoom =>
  isOfType<MapViewWithCenterAndZoom>(
    object,
    ['position', 'zoom'],
    [(object) => isMapCoordinates(object.position), (object) => typeof object.zoom === 'number'],
  );

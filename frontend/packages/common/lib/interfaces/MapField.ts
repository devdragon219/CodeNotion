import { MapBoundsFlat, MapCoordinates } from './Geolocation';

export interface MapViewWithBoundingBox {
  boundingBox: MapBoundsFlat;
  position?: MapCoordinates | null;
}

export interface MapViewWithCenterAndZoom {
  position: MapCoordinates;
  zoom: number;
}

export type MapView = MapViewWithBoundingBox | MapViewWithCenterAndZoom;

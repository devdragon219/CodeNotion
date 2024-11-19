import { MapCoordinates } from '../../../../interfaces/Geolocation';

export interface MapFieldMarkerProps {
  position: MapCoordinates;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (newPosition: MapCoordinates) => void;
}

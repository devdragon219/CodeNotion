import { MapCoordinates } from '../../../interfaces/Geolocation';
import { MapView } from '../../../interfaces/MapField';

export interface MapFieldProps {
  mapView?: MapView | null;
  height?: number;
  disabled?: boolean;
  readonly?: boolean;
  onMarkerDragStart?: () => void;
  onMarkerDragEnd?: (newPosition: MapCoordinates) => void;
}

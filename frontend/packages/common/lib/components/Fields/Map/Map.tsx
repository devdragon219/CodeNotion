import { LatLngBounds, Map as LeafletMap } from 'leaflet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { MAP_BOUNDING_BOX_ITALY } from '../../../configs/map';
import { MapCoordinates } from '../../../interfaces/Geolocation';
import { parseFlatBoundsToTuples } from '../../../utils/geolocationUtils';
import { isMapViewWithBoundingBox } from '../../../utils/typeNarrowings/isMapViewWithBoundingBox';
import { isMapViewWithCenterAndZoom } from '../../../utils/typeNarrowings/isMapViewWithCenterAndZoom';
import { MapFieldProps } from './Map.types';
import { MapFieldMarker } from './Marker/Marker';

const MAP_FLY_TO_TOLERANCE = 0.00001;
const FLY_TO_OPTIONS = { duration: 1 };

export const MapField = ({
  mapView,
  height = 300,
  disabled,
  readonly,
  onMarkerDragStart,
  onMarkerDragEnd,
}: MapFieldProps) => {
  const [map, setMap] = useState<LeafletMap | null>(null);

  useEffect(() => {
    if (!map) return;

    if (isMapViewWithCenterAndZoom(mapView)) {
      map.flyTo(mapView.position, mapView.zoom, FLY_TO_OPTIONS);
      return;
    }

    if (isMapViewWithBoundingBox(mapView)) {
      const currentCenter = map.getCenter();
      const newBounds = parseFlatBoundsToTuples(mapView.boundingBox);
      const newCenter = new LatLngBounds(newBounds).getCenter();

      const maxShift = Math.max(
        Math.abs(currentCenter.lat - newCenter.lat),
        Math.abs(currentCenter.lng - newCenter.lng),
      );
      if (maxShift < MAP_FLY_TO_TOLERANCE) return;

      map.flyToBounds(newBounds, FLY_TO_OPTIONS);
    } else {
      map.flyToBounds(parseFlatBoundsToTuples(MAP_BOUNDING_BOX_ITALY), FLY_TO_OPTIONS);
    }
  }, [map, mapView]);

  useEffect(() => {
    if (map) {
      if (!readonly && !disabled) {
        map.dragging.enable();
      } else {
        map.dragging.disable();
      }
    }
  }, [disabled, map, readonly]);

  const isZoomControlEnabled = useMemo(() => !readonly && !disabled, [disabled, readonly]);

  const isMarkerDraggable = useMemo(
    () => !readonly && !disabled && !!onMarkerDragEnd,
    [disabled, onMarkerDragEnd, readonly],
  );

  const handleDragStart = useCallback(() => {
    if (isMarkerDraggable && onMarkerDragStart) {
      onMarkerDragStart();
    }
  }, [isMarkerDraggable, onMarkerDragStart]);

  const handleDragEnd = useCallback(
    (newPosition: MapCoordinates) => {
      if (isMarkerDraggable && onMarkerDragEnd) {
        onMarkerDragEnd(newPosition);
      }
    },
    [isMarkerDraggable, onMarkerDragEnd],
  );

  const markerPosition = useMemo(() => mapView?.position ?? null, [mapView?.position]);

  return (
    <MapContainer
      ref={setMap}
      bounds={parseFlatBoundsToTuples(MAP_BOUNDING_BOX_ITALY)}
      dragging
      style={{ height, filter: disabled ? 'grayscale(1)' : undefined, borderRadius: DEFAULT_BORDER_RADIUS }}
      attributionControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markerPosition && (
        <MapFieldMarker
          position={markerPosition}
          draggable={isMarkerDraggable}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      )}
      {isZoomControlEnabled && <ZoomControl position="topright" />}
    </MapContainer>
  );
};

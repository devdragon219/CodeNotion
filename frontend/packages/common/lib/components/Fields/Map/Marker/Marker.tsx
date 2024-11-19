import { Icon, Marker as LeafletMarker } from 'leaflet';
import { useMemo, useRef } from 'react';
import { Marker } from 'react-leaflet';

import mapMarker from '../../../../assets/images/mapMarker.svg';
import { MapFieldMarkerProps } from './Marker.types';

export const MapFieldMarker = ({ position, draggable = false, onDragStart, onDragEnd }: MapFieldMarkerProps) => {
  const markerRef = useRef<LeafletMarker<unknown>>(null);

  const mapMarkerIcon = useMemo(
    () =>
      new Icon({
        iconUrl: mapMarker,
        iconRetinaUrl: mapMarker,
        iconSize: [32, 32],
        className: draggable ? '' : 'cursor-default-override',
        iconAnchor: [16, 32],
      }),
    [draggable],
  );

  const eventHandlers = useMemo(
    () => ({
      dragstart() {
        if (!onDragStart) return;
        onDragStart();
      },
      dragend() {
        if (!draggable || !onDragEnd || !markerRef.current) return;
        const { lat, lng } = markerRef.current.getLatLng();
        onDragEnd([lat, lng]);
      },
    }),
    [draggable, onDragStart, onDragEnd],
  );

  return (
    <Marker
      ref={markerRef}
      icon={mapMarkerIcon}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
    />
  );
};

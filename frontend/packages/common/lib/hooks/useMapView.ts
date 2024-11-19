import { useEffect, useState } from 'react';
import { OperationResult, useClient } from 'urql';

import { MAP_BOUNDING_BOX_ITALY, MAP_STREET_ZOOM } from '../configs/map';
import { GetGeoPositionDocument, GetGeoPositionQuery } from '../gql/RealGimm.WebCommon.Geocoding.operation';
import { AsstAddressType } from '../gql/types';
import { MapCoordinates } from '../interfaces/Geolocation';
import { MapView } from '../interfaces/MapField';
import { isMapBoundsFlat } from '../utils/typeNarrowings/isMapBoundsFlat';
import { isMapCoordinates } from '../utils/typeNarrowings/isMapCoordinates';

const DEFAULT_MAP_VIEW: MapView = { boundingBox: MAP_BOUNDING_BOX_ITALY, position: null };
export const useMapView = (
  countryISO: string | null,
  cityName: string,
  toponymy: string,
  numbering: string,
  coordinates: MapCoordinates | null,
  onCoordinatesChange?: (coordinates: MapCoordinates | null, addressCoordinates: MapCoordinates | null) => void,
) => {
  const [mapView, setMapView] = useState<MapView>(DEFAULT_MAP_VIEW);
  const client = useClient();

  useEffect(() => {
    if (isMapCoordinates(coordinates)) {
      setMapView({ position: coordinates, zoom: MAP_STREET_ZOOM });
      return;
    }

    const fetchMapView = async () => {
      const result: OperationResult<GetGeoPositionQuery> = await client.query(GetGeoPositionDocument, {
        address: {
          addressType: AsstAddressType.Primary,
          countryISO,
          cityName,
          toponymy,
          numbering,
        },
      });
      const fetchedGeoData = result.data?.geocoding.position;

      if (fetchedGeoData) {
        const boundingBox = fetchedGeoData.boundingBox;

        if (isMapBoundsFlat(boundingBox)) {
          const fetchedPosition = fetchedGeoData.position;
          const currentCoordinates: MapCoordinates | null = isMapCoordinates(coordinates) ? [...coordinates] : null;
          const candidateCoordinates: MapCoordinates | null = isMapCoordinates(fetchedPosition)
            ? [...fetchedPosition]
            : null;

          if (onCoordinatesChange) onCoordinatesChange(currentCoordinates, candidateCoordinates);

          setMapView({
            boundingBox,
            position: candidateCoordinates,
          });
        }
      }
    };

    void fetchMapView();
  }, [client, coordinates, onCoordinatesChange, countryISO, cityName, toponymy, numbering]);

  return {
    mapView,
  };
};

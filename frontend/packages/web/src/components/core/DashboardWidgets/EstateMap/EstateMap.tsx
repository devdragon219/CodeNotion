import { Box, Button, Skeleton, Typography } from '@mui/material';
import { DEFAULT_BORDER_RADIUS, MAP_BOUNDING_BOX_ITALY } from '@realgimm5/frontend-common/configs';
import mapMarker from '@realgimm5/frontend-common/images/mapMarker.svg';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { isMapCoordinates, parseFlatBoundsToTuples } from '@realgimm5/frontend-common/utils';
import { Icon, MarkerCluster, divIcon, latLngBounds, point } from 'leaflet';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useNavigate } from 'react-router-dom';

import { useGetEstatesMapQuery } from '../../../../gql/RealGimm.Web.Estate.operation';
import { EstateMapLocation } from '../../../../interfaces/Geolocation';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { parseEstateLocationFragmentToEstateMapWidgetLocation } from '../../../../utils/geolocationUtils';

const mockData: EstateMapLocation[] = [
  {
    estateName: 'Castello Sforzesco',
    estateInternalCode: 'MILCASFO',
    coordinates: [45.47077090824928, 9.179668690216015],
  },
  {
    estateName: 'Pinacoteca di Brera',
    estateInternalCode: 'MILPIBRE',
    coordinates: [45.4723628492997, 9.187903385299196],
  },
  {
    estateName: 'Teatro alla Scala',
    estateInternalCode: 'MILTESCA',
    coordinates: [45.46771175805163, 9.189950931103663],
  },
  {
    estateName: 'Duomo di Milano',
    estateInternalCode: 'MILDUOMO',
    coordinates: [45.46468366017241, 9.192488107426591],
  },
  {
    estateName: 'Politecnico di Torino',
    estateInternalCode: 'TORPOLIT',
    coordinates: [45.06359225906252, 7.662343995820901],
  },
  {
    estateName: 'Palazzo Reale di Torino',
    estateInternalCode: 'TORPALRE',
    coordinates: [45.07328584648695, 7.686539979351376],
  },
  {
    estateName: 'Mole Antonelliana',
    estateInternalCode: 'TORMOLEA',
    coordinates: [45.07003817815782, 7.69326108588762],
  },
  {
    estateName: 'Villa Borghese',
    estateInternalCode: 'ROMVIBOR',
    coordinates: [41.91412538074562, 12.489521588416572],
  },
  {
    estateName: "Castel Sant'Angelo",
    estateInternalCode: 'ROMCASSA',
    coordinates: [41.904252957819246, 12.466622393525608],
  },
  {
    estateName: 'Circo Massimo',
    estateInternalCode: '0003',
    coordinates: [41.88732525221763, 12.484704861215366],
  },
  {
    estateName: 'Colosseo',
    estateInternalCode: 'ROMCOLOS',
    coordinates: [41.89161045859511, 12.49357289968813],
  },
  {
    estateName: 'Fontana di Trevi',
    estateInternalCode: 'ROMFOTRE',
    coordinates: [41.90192931690592, 12.483953726172466],
  },
];

export const EstateMapWidget = ({ useMockData }: DashboardWidgetProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const [queryState] = useGetEstatesMapQuery({ pause: useMockData });

  const data = useMemo(
    () =>
      useMockData
        ? mockData
        : (queryState.data?.estate.locations
            .filter((l) => isMapCoordinates(l.address?.locationLatLon?.coordinates))
            .map(parseEstateLocationFragmentToEstateMapWidgetLocation) ?? []),
    [queryState.data?.estate.locations, useMockData],
  );

  const createMapMarkerCluster = useCallback(
    (cluster: MarkerCluster) =>
      divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'custom-marker-cluster',
        iconSize: point(32, 32, true),
      }),
    [],
  );

  const mapMarkerIcon = useMemo(
    () =>
      new Icon({
        iconUrl: mapMarker,
        iconRetinaUrl: mapMarker,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    [],
  );

  return queryState.fetching ? (
    <Skeleton variant="rounded" sx={{ height: '100%' }} />
  ) : (
    <MapContainer
      bounds={
        useMockData || data.length === 0
          ? parseFlatBoundsToTuples(MAP_BOUNDING_BOX_ITALY)
          : latLngBounds(data.map(({ coordinates }) => coordinates))
      }
      dragging
      style={{ height: '100%', minHeight: '300px', borderRadius: DEFAULT_BORDER_RADIUS }}
      attributionControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createMapMarkerCluster}>
        {data.map(({ estateId, estateName, estateInternalCode, address, coordinates }) => (
          <Marker key={`${coordinates[0]}_${coordinates[1]}`} position={coordinates} icon={mapMarkerIcon}>
            <Popup className="custom-marker-popup" offset={[0, -8]}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="bodyMd" sx={(theme) => ({ color: theme.palette.blue[500], fontWeight: 'bold' })}>
                  {estateInternalCode} - {estateName}
                </Typography>
                {address && <Typography variant="bodyMd">{parseAddressToString(address, language)}</Typography>}
                {!useMockData && estateId && (
                  <Button
                    color="tertiary"
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      navigate(`/app/real-estate/estates/${estateId}`);
                    }}
                  >
                    {t('estate.action.view_estate')}
                  </Button>
                )}
              </Box>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <ZoomControl position="topright" />
    </MapContainer>
  );
};

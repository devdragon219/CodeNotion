import { MapCoordinates } from '@realgimm5/frontend-common/interfaces';

import { AsstAddressFragment } from '../gql/RealGimm.Web.AsstAddress.fragment';
import { EstateLocationFragment } from '../gql/RealGimm.Web.EstateLocation.fragment';
import { EstateMapLocation } from '../interfaces/Geolocation';

export const parseEstateLocationFragmentToEstateMapWidgetLocation = (
  location: EstateLocationFragment,
): EstateMapLocation => ({
  estateId: location.estateId,
  estateName: location.estateName ?? '',
  estateInternalCode: location.estateInternalCode,
  address: location.address as AsstAddressFragment,
  coordinates: location.address?.locationLatLon?.coordinates as MapCoordinates,
});

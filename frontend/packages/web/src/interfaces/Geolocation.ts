import { MapCoordinates } from '@realgimm5/frontend-common/interfaces';

import { AsstAddressFragment } from '../gql/RealGimm.Web.AsstAddress.fragment';

export interface EstateMapLocation {
  estateId?: number;
  estateName?: string;
  estateInternalCode?: string;
  address?: AsstAddressFragment | null;
  coordinates: MapCoordinates;
}

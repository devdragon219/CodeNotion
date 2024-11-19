import { CoordinateType } from '@realgimm5/frontend-common/gql/types';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';
import { AddressFormInput } from '../../interfaces/FormInputs/Addresses';

export const getCoordinateType = (address: AddressFormInput | AsstAddressFragment | null | undefined) =>
  address?.countryISO?.toLowerCase() === 'ita' ? CoordinateType.ItalianOrdinary : CoordinateType.GenericOverride;

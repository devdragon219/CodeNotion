import { isMapCoordinates } from '@realgimm5/frontend-common/utils';

import { AsstAddressFragment } from '../../../gql/RealGimm.Web.AsstAddress.fragment';
import { AddressFormInput } from '../../../interfaces/FormInputs/Addresses';
import { isAsstAddressFragment } from '../../typeNarrowings/isAsstAddressFragment';

export const copyAddressFormInput = (
  address: AddressFormInput | AsstAddressFragment | null | undefined,
): AddressFormInput | null =>
  address
    ? {
        addressId: null,
        addressType: address.addressType,
        addressCoordinates: isAsstAddressFragment(address) ? null : address.addressCoordinates,
        coordinates: isAsstAddressFragment(address)
          ? isMapCoordinates(address.locationLatLon?.coordinates)
            ? address.locationLatLon.coordinates
            : null
          : address.coordinates,
        city: {
          cadastralCode: address.city?.cadastralCode ?? '',
          countyName: address.city?.countyName ?? '',
          guid: address.city?.guid ?? '',
          id: address.city?.id ?? null,
          name: address.city?.name ?? '',
        },
        countryISO: address.countryISO ?? '',
        countyName: address.countyName ?? '',
        localPostCode: address.localPostCode ?? '',
        notes: address.notes ?? '',
        numbering: address.numbering ?? '',
        toponymy: address.toponymy ?? '',
      }
    : null;

import { AddressType, AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { MapCoordinates } from '@realgimm5/frontend-common/interfaces';

import { CityFieldValue } from '../FieldValues/City';

export interface AddressCityFormInput {
  cadastralCode: string;
  cityId: number | null;
  countyName: string;
  name: string;
}

export interface AddressFormInput {
  addressId: number | null;
  addressType: AddressType | AsstAddressType | null;
  city: CityFieldValue;
  coordinates: MapCoordinates | null;
  addressCoordinates: MapCoordinates | null;
  countryISO: string | null;
  countyName: string;
  localPostCode: string;
  notes: string;
  numbering: string;
  toponymy: string;
}

export interface AddressesFieldValues {
  addresses: AddressFormInput[];
}

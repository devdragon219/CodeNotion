import { AddressType, AsstAddressType } from '@realgimm5/frontend-common/gql/types';

import { CityFieldValue } from '../../../interfaces/FieldValues/City';
import { AddressFormInput } from '../../../interfaces/FormInputs/Addresses';

export const getEmptyCityFieldValue = (name = ''): CityFieldValue => ({
  cadastralCode: '',
  countyName: '',
  guid: crypto.randomUUID(),
  id: null,
  name,
});

export const getEmptyAddressFormInput = (
  addressType: AddressType | AsstAddressType | null = null,
): AddressFormInput => ({
  addressId: null,
  addressType,
  coordinates: null,
  addressCoordinates: null,
  city: getEmptyCityFieldValue(),
  countryISO: null,
  countyName: '',
  localPostCode: '',
  notes: '',
  numbering: '',
  toponymy: '',
});

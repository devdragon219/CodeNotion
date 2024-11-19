import { CoordinateType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAddressFormInput } from '../../components/addressesField/initialValues';
import { getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitSchema } from './cadastralUnit';

describe('cadastral-unit.cadastral-unit-schema', () => {
  const coordinateType = CoordinateType.ItalianOrdinary;
  const schema = getCadastralUnitSchema(coordinateType, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCadastralUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      estateUnit: {},
      internalCode: 'internalCode',
      cadastralUnitType: 'cadastralUnitType',
      status: 'status',
      since: new Date(),
      changed: new Date(),
      until: new Date(),
      address: {
        ...getEmptyAddressFormInput(),
        addressType: 'addressType',
        countryISO: 'countryISO',
        city: {
          name: 'name',
        },
        toponymy: 'toponymy',
        numbering: 'numbering',
        localPostCode: 'localPostCode',
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

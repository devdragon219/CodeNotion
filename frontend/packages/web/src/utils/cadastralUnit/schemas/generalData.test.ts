import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAddressFormInput } from '../../components/addressesField/initialValues';
import { getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitGeneralDataSchema } from './generalData';

describe('cadastral-unit.general-data-schema', () => {
  const schema = getCadastralUnitGeneralDataSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCadastralUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
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

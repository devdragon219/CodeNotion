import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractGeneralDataSchema } from './generalData';

describe('facility-contract.general-data-schema', () => {
  const schema = getFacilityContractGeneralDataSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      internalCode: 'internalCode',
      description: 'name',
      facilityContractType: {},
      providerSubject: {},
      effectiveDate: new Date(),
      expirationDate: new Date(),
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

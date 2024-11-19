import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractSchema } from './facilityContract';

describe('facility-contract.facility-contract-schema', () => {
  const schema = getFacilityContractSchema(true, 'en', mockTFunction);

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
      entryStatus: EntryStatus.Working,
      providerSubject: {},
      effectiveDate: new Date(),
      expirationDate: new Date(),
      estateUnits: [{}],
      catalogueTypes: [{}],
      billing: {
        billingPeriod: 'billingPeriod',
      },
      priceLists: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

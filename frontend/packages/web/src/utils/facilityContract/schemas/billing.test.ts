import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractBillingSchema } from './billing';

describe('facility-contract.billing-schema', () => {
  const schema = getFacilityContractBillingSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      entryStatus: EntryStatus.Working,
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      entryStatus: EntryStatus.Working,
      billing: {
        billingPeriod: 'billingPeriod',
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

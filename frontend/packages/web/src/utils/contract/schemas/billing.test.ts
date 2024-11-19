import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractBillingFormInput, getEmptyContractFormInput } from '../initialValues';
import { getContractBillingSchema } from './billing';

describe('contract.billing-schema', () => {
  const schema = getContractBillingSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      billing: getEmptyContractBillingFormInput(),
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      billing: {
        ...getEmptyContractBillingFormInput(),
        startDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

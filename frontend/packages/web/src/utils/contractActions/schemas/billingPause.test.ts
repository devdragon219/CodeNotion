import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractBillingPauseFormInput } from '../initialValues';
import { getContractBillingPauseSchema } from './billingPause';

describe('contract-actions.billing-pause-schema', () => {
  const schema = getContractBillingPauseSchema(null, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractBillingPauseFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractBillingPauseFormInput(),
      since: new Date(),
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

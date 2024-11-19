import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyRegistrationPaymentFormInput } from '../initialValues';
import { getRegistrationPaymentContractSchema } from './contract';

describe('registration-payment.contract-schema', () => {
  const schema = getRegistrationPaymentContractSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyRegistrationPaymentFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyRegistrationPaymentFormInput(),
      contract: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

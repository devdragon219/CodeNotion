import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyRegistrationPaymentFormInput } from '../initialValues';
import { getRegistrationPaymentSchema } from './registrationPayment';

describe('registration-payment.registration-payment-schema', () => {
  const schema = getRegistrationPaymentSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyRegistrationPaymentFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyRegistrationPaymentFormInput(),
      contract: {},
      paymentCode: 'paymentCode',
      valueDate: new Date(),
      paymentYear: '2024',
      sanctionAmount: 0,
      taxAmount: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

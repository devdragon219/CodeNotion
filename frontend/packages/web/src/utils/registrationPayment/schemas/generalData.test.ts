import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyRegistrationPaymentFormInput } from '../initialValues';
import { getRegistrationPaymentGeneralDataSchema } from './generalData';

describe('registration-payment.general-data-schema', () => {
  const schema = getRegistrationPaymentGeneralDataSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyRegistrationPaymentFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyRegistrationPaymentFormInput(),
      paymentCode: 'paymentCode',
      valueDate: new Date(),
      paymentYear: '2024',
      taxAmount: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

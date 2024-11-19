import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyRegistrationPaymentRowFormInput } from '../initialValues';
import { getRegistrationPaymentRowsSchema } from './rows';

describe('registration-payment.rows-schema', () => {
  const schema = getRegistrationPaymentRowsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      rows: [getEmptyRegistrationPaymentRowFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      rows: [
        {
          amountDue: 0,
          referenceYear: 2024,
          paymentRowCode: 'paymentRowCode',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

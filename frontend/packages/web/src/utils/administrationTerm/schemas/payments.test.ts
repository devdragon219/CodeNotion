import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyAdministrationTermFormInput, getEmptyAdministrationTermPaymentFormInput } from '../initialValues';
import { getAdministrationTermPaymentSchema, getAdministrationTermPaymentsSchema } from './payments';

describe('administration-term.payments-schema', () => {
  const schema = getAdministrationTermPaymentsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyAdministrationTermFormInput(),
      payments: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyAdministrationTermFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('payment', () => {
    const schema = getAdministrationTermPaymentSchema('en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyAdministrationTermPaymentFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyAdministrationTermPaymentFormInput(),
        installments: [{}],
        paymentDate: new Date(),
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});

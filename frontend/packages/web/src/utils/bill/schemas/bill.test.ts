import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyBillFormInput, getEmptyBillRowFormInput } from '../initialValues';
import { getBillSchema } from './bill';

describe('bill.bill-schema', () => {
  const schema = getBillSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyBillFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyBillFormInput(),
      year: 0,
      counterpart: {},
      contractBillingPeriod: 'contractBillingPeriod',
      transactorPaymentType: 'transactorPaymentType',
      transactor: {},
      emissionType: 'emissionType',
      billRows: [
        {
          ...getEmptyBillRowFormInput(),
          amount: 0,
          billItemType: {},
          vatRate: {},
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

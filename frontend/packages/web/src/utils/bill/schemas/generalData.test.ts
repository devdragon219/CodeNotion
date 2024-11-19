import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyBillFormInput } from '../initialValues';
import { getBillGeneralDataSchema } from './generalData';

describe('bill.general-data-schema', () => {
  const schema = getBillGeneralDataSchema(true, mockTFunction);

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
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyBillFormInput, getEmptyBillRowFormInput } from '../initialValues';
import { getBillAccountingDataSchema } from './accountingData';

describe('bill.accounting-data-schema', () => {
  const schema = getBillAccountingDataSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyBillFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyBillFormInput(),
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

import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCostChargeFormInput } from '../initialValues';
import { getCostChargeSchema } from './costCharge';

describe('cost-charge.cost-charge-schema', () => {
  const schema = getCostChargeSchema(null, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCostChargeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCostChargeFormInput(),
      consumptions: {
        actual: {
          since: new Date('2024-01-01'),
          until: new Date('2024-01-31'),
          values: [
            {
              value: 0,
            },
          ],
        },
        expected: {
          since: new Date('2024-02-01'),
          until: new Date('2024-02-29'),
          values: [
            {
              value: 0,
            },
          ],
        },
      },
      totalAmount: 0,
      periodStart: new Date('2024-01-01'),
      periodEnd: new Date('2024-02-29'),
      referenceDate: new Date('2024-03-01'),
      dueDate: new Date('2024-03-31'),
      invoiceNumber: 'invoiceNumber',
      totalVatAmount: 0,
      invoicedConsumptionAmount: 0,
      utilityService: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

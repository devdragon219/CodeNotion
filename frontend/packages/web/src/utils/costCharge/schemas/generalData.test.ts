import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCostChargeFormInput } from '../initialValues';
import { getCostChargeConsumptionsSchema, getCostChargeGeneralDataSchema } from './generalData';

describe('cost-charge.general-data-schema', () => {
  const schema = getCostChargeGeneralDataSchema(null, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCostChargeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCostChargeFormInput(),
      totalAmount: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
      referenceDate: new Date(),
      dueDate: new Date(),
      invoiceNumber: 'invoiceNumber',
      totalVatAmount: 0,
      invoicedConsumptionAmount: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('consumptions', () => {
    const schema = getCostChargeConsumptionsSchema('en', mockTFunction);

    it('should fail', () => {
      const input = {
        ...getEmptyCostChargeFormInput(),
        consumptions: {
          actual: {
            values: [
              {
                value: 0,
              },
            ],
          },
          expected: {
            values: [
              {
                value: 0,
              },
            ],
          },
        },
      };
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyCostChargeFormInput(),
        consumptions: {
          actual: {
            since: new Date(),
            until: new Date(),
            values: [
              {
                value: 0,
              },
            ],
          },
          expected: {
            since: new Date(),
            until: new Date(),
            values: [
              {
                value: 0,
              },
            ],
          },
        },
      };
      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});

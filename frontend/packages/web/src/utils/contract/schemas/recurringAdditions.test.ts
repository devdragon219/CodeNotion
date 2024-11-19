import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractRecurringAdditionFormInput } from '../initialValues';
import { getContractRecurringAdditionSchema, getContractRecurringAdditionsSchema } from './recurringAdditions';

describe('contract.recurring-additions-schema', () => {
  const schema = getContractRecurringAdditionsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      recurringAdditions: [getEmptyContractRecurringAdditionFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      recurringAdditions: [
        {
          ...getEmptyContractRecurringAdditionFormInput(),
          accountingItem: {},
          amountPerInstallment: 100,
          billItemType: {},
          vatRate: {},
        },
      ],
    };

    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('recurring-addition', () => {
    const schema = getContractRecurringAdditionSchema(mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractRecurringAdditionFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractRecurringAdditionFormInput(),
        accountingItem: {},
        amountPerInstallment: 100,
        billItemType: {},
        vatRate: {},
      };

      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});

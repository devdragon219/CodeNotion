import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractOneshotAdditionFormInput } from '../initialValues';
import { getContractOneshotAdditionSchema, getContractOneshotAdditionsSchema } from './oneshotAdditions';

describe('contract.oneshot-additions-schema', () => {
  const schema = getContractOneshotAdditionsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      oneshotAdditions: [getEmptyContractOneshotAdditionFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      oneshotAdditions: [
        {
          ...getEmptyContractOneshotAdditionFormInput(),
          accountingItem: {},
          amount: 100,
          billItemType: {},
          startDate: new Date(),
          vatRate: {},
        },
      ],
    };

    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('oneshot-addition', () => {
    const schema = getContractOneshotAdditionSchema('en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractOneshotAdditionFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractOneshotAdditionFormInput(),
        accountingItem: {},
        amount: 100,
        billItemType: {},
        startDate: new Date(),
        vatRate: {},
      };

      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});

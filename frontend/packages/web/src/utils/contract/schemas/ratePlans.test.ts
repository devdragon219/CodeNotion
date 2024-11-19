import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput, getEmptyContractRatePlanFormInput } from '../initialValues';
import { getContractRatePlanSchema, getContractRatePlansSchema } from './ratePlans';

describe('contract.rate-plans-schema', () => {
  const schema = getContractRatePlansSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      ratePlans: [getEmptyContractRatePlanFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      ratePlans: [
        {
          ...getEmptyContractRatePlanFormInput(),
          newYearlyRate: 100,
          since: new Date(),
        },
      ],
    };

    expect(schema.isValidSync(input)).toBe(true);
  });

  describe('rate-plan', () => {
    const schema = getContractRatePlanSchema('en', mockTFunction);

    it('should fail', () => {
      const input = getEmptyContractRatePlanFormInput();
      expect(schema.isValidSync(input)).toBe(false);
    });

    it('should succeed', () => {
      const input = {
        ...getEmptyContractRatePlanFormInput(),
        newYearlyRate: 100,
        since: new Date(),
      };

      expect(schema.isValidSync(input)).toBe(true);
    });
  });
});

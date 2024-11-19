import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyInterestRateFormInput } from '../initialValues';
import { getInterestRateSchema } from './interestRate';

describe('interest-rate.interest-rate-schema', () => {
  const schema = getInterestRateSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyInterestRateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyInterestRateFormInput(),
      since: new Date(),
      until: new Date(),
      rate: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

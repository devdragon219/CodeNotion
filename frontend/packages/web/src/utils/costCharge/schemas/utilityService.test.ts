import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCostChargeFormInput } from '../initialValues';
import { getCostChargeUtilityServiceSchema } from './utilityService';

describe('cost-charge.utility-service-schema', () => {
  const schema = getCostChargeUtilityServiceSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyCostChargeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCostChargeFormInput(),
      utilityService: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

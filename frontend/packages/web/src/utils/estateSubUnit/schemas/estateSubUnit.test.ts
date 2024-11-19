import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateSubUnitFormInput } from '../initialValues';
import { getEstateSubUnitSchema } from './estateSubUnit';

describe('cost-charge.cost-charge-schema', () => {
  const schema = getEstateSubUnitSchema('en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateSubUnitFormInput(0);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateSubUnitFormInput(0),
      internalCode: 'internalCode',
      occupantType: 'occupantType',
      since: new Date(),
      until: new Date(),
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

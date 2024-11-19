import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityServiceFormInput } from '../initialValues';
import { getUtilityServiceEstateUnitsSchema } from './estateUnits';

describe('utility-service.estate-units-schema', () => {
  const schema = getUtilityServiceEstateUnitsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyUtilityServiceFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUtilityServiceFormInput(),
      estateUnits: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

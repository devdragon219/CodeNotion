import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitGroupFormInput } from '../initialValues';
import { getEstateUnitGroupEstateUnitsSchema } from './estateUnits';

describe('estate-unit-group.estate-units-schema', () => {
  const schema = getEstateUnitGroupEstateUnitsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitGroupFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitGroupFormInput(),
      estateUnits: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

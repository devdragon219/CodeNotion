import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitSplitFormInput } from '../initialValues';
import { getEstateUnitSplitEstateUnitsSchema } from './splitEstateUnits';

describe('estate-unit-actions.split-estate-units-schema', () => {
  const schema = getEstateUnitSplitEstateUnitsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitSplitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitSplitFormInput(),
      toEstateUnits: [{}, {}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

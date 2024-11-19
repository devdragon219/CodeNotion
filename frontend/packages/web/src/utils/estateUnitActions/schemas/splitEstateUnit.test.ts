import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitSplitFormInput } from '../initialValues';
import { getEstateUnitSplitEstateUnitSchema } from './splitEstateUnit';

describe('estate-unit-actions.split-estate-unit-schema', () => {
  const schema = getEstateUnitSplitEstateUnitSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitSplitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitSplitFormInput(),
      fromEstateUnit: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

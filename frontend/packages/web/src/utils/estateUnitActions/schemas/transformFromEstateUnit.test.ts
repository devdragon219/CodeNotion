import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitTransformFormInput } from '../initialValues';
import { getEstateUnitTransformFromEstateUnitSchema } from './transformFromEstateUnit';

describe('estate-unit-actions.transform-from-estate-unit-schema', () => {
  const schema = getEstateUnitTransformFromEstateUnitSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitTransformFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitTransformFormInput(),
      fromEstateUnit: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

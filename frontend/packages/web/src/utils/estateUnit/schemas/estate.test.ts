import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../initialValues';
import { getEstateUnitEstateSchema } from './estate';

describe('estate-unit.estate-schema', () => {
  const schema = getEstateUnitEstateSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      estate: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

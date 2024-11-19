import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCadastralUnitFormInput } from '../initialValues';
import { getCadastralUnitEstateUnitSchema } from './estateUnit';

describe('cadastral-unit.estate-unit-schema', () => {
  const schema = getCadastralUnitEstateUnitSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyCadastralUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralUnitFormInput(),
      estateUnit: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

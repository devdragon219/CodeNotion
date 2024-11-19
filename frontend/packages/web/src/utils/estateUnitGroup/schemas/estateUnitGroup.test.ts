import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitGroupFormInput } from '../initialValues';
import { getEstateUnitGroupSchema } from './estateUnitGroup';

describe('estate-unit-group.estate-unit-group-schema', () => {
  const schema = getEstateUnitGroupSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitGroupFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitGroupFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      managementSubject: {},
      estateUnits: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

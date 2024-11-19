import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../../estateUnit/initialValues';
import { getEmptyEstateUnitMergeFormInput } from '../initialValues';
import { getEstateUnitMergeEstateUnitsSchema } from './mergeEstateUnits';

describe('estate-unit-actions.merge-estate-units-schema', () => {
  const schema = getEstateUnitMergeEstateUnitsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateUnitMergeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateUnitMergeFormInput(),
      fromEstateUnits: [getEmptyEstateUnitFormInput(), getEmptyEstateUnitFormInput()],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

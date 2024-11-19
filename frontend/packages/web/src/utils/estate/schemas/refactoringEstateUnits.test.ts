import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateRefactoringFormInput } from '../initialValues';
import { getEstateRefactoringEstateUnitsSchema } from './refactoringEstateUnits';

describe('estate.refactoring-estate-units-schema', () => {
  const schema = getEstateRefactoringEstateUnitsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateRefactoringFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateRefactoringFormInput(),
      estateUnits: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateRefactoringFormInput } from '../initialValues';
import { getEstateRefactoringGeneralDataSchema } from './refactoringGeneralData';

describe('estate.refactoring-general-data-schema', () => {
  const schema = getEstateRefactoringGeneralDataSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateRefactoringFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateRefactoringFormInput(),
      referenceYear: MIN_YEAR,
      buildingPermitYear: MIN_YEAR,
      condition: 'condition',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

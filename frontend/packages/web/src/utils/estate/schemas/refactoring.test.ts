import { MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateFormInput } from '../initialValues';
import { getEstateRefactoringsSchema } from './refactoring';

describe('estate.refactoring-schema', () => {
  const schema = getEstateRefactoringsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      refactorings: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      refactorings: [
        {
          estateUnits: [{}],
          referenceYear: MIN_YEAR,
          buildingPermitYear: MIN_YEAR,
          condition: 'condition',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

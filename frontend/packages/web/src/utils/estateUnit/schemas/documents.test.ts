import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateUnitFormInput } from '../initialValues';
import { getEstateUnitDocumentsSchema } from './documents';

describe('estate-unit.documents-schema', () => {
  const schema = getEstateUnitDocumentsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateUnitFormInput(),
      documents: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyEstateUnitFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueFormInput } from '../initialValues';
import { getCatalogueGeneralDataSchema } from './generalData';

describe('catalogue.general-data-schema', () => {
  const schema = getCatalogueGeneralDataSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueFormInput(),
      catalogueType: {},
      category: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

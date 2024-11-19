import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueFormInput } from '../initialValues';
import { getCatalogueSchema } from './catalogue';

describe('catalogue.catalogue-schema', () => {
  const schema = getCatalogueSchema({}, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueFormInput(),
      catalogueType: {},
      category: {},
      estate: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

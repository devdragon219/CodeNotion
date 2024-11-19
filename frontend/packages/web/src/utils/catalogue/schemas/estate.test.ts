import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueFormInput } from '../initialValues';
import { getCatalogueEstateSchema } from './estate';

describe('catalogue.estate-schema', () => {
  const schema = getCatalogueEstateSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueFormInput(),
      estate: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

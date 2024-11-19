import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueFormInput } from '../initialValues';
import { getCatalogueDocumentsSchema } from './documents';

describe('catalogue.documents-schema', () => {
  const schema = getCatalogueDocumentsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCatalogueFormInput(),
      documents: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyCatalogueFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../../catalogueType/initialValues';
import { getEmptyCatalogueItemFormInput } from '../initialValues';
import { getCatalogueItemDocumentsSchema } from './documents';

describe('catalogue-item.documents-schema', () => {
  const schema = getCatalogueItemDocumentsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput()),
      documents: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyCatalogueItemFormInput(getEmptyCatalogueTypeFormInput());
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueFormInput } from '../initialValues';
import { getCatalogueItemsSchema } from './items';

describe('catalogue.items-schema', () => {
  const schema = getCatalogueItemsSchema({}, 'en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCatalogueFormInput(),
      items: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyCatalogueFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

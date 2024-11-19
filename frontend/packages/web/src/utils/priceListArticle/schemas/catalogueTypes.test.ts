import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyPriceListArticleFormInput } from '../initialValues';
import { getPriceListArticleCatalogueTypesSchema } from './catalogueTypes';

describe('price-list-article.catalogue-types-schema', () => {
  const schema = getPriceListArticleCatalogueTypesSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyPriceListArticleFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyPriceListArticleFormInput(),
      catalogueTypes: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { FormMode } from '@realgimm5/frontend-common/enums';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyPriceListArticleFormInput } from '../initialValues';
import { getPriceListArticleSchema } from './priceListArticle';

describe('price-list-article.price-list-article-schema', () => {
  const schema = getPriceListArticleSchema(true, 'en', FormMode.Create, mockTFunction);

  it('should fail', () => {
    const input = getEmptyPriceListArticleFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyPriceListArticleFormInput(),
      priceList: {},
      internalCode: 'internalCode',
      name: 'name',
      since: new Date(),
      measurementUnit: {},
      price: 0,
      catalogueTypes: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

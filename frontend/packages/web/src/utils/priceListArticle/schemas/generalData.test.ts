import { FormMode } from '@realgimm5/frontend-common/enums';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyPriceListArticleFormInput } from '../initialValues';
import { getPriceListArticleGeneralDataSchema } from './generalData';

describe('price-list-article.general-data-schema', () => {
  const schema = getPriceListArticleGeneralDataSchema(true, 'en', FormMode.Create, mockTFunction);

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
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

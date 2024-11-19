import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyPriceListFormInput } from '../initialValues';
import { getPriceListSchema } from './priceList';

describe('price-list.price-list-schema', () => {
  const schema = getPriceListSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyPriceListFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyPriceListFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

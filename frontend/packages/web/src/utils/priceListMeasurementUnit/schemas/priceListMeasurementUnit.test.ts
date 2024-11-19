import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyPriceListMeasurementUnitFormInput } from '../initialValues';
import { getPriceListMeasurementUnitSchema } from './priceListMeasurementUnit';

describe('price-list-measurement-unit.price-list-measurement-unit-schema', () => {
  const schema = getPriceListMeasurementUnitSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyPriceListMeasurementUnitFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyPriceListMeasurementUnitFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

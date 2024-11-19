import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateFormInput } from '../initialValues';
import { getEstateTotalMarketValueSchema } from './totalMarketValue';

describe('estate.total-market-value-schema', () => {
  const schema = getEstateTotalMarketValueSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      totalMarketValue: {},
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      totalMarketValue: {
        coefficients: [
          {
            coefficientType: 'coefficientType',
            value: 0,
          },
        ],
        marketValues: [
          {
            marketValueType: 'marketValueType',
            value: 0,
          },
        ],
        totalSurfaceAreaSqM: 0,
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

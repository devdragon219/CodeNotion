import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateTotalMarketValueFormInput } from '../initialValues';
import { getEstateTotalMarketValueCoefficientsSchema } from './totalMarketValueCoefficients';

describe('estate.total-market-value-coefficients-schema', () => {
  const schema = getEstateTotalMarketValueCoefficientsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateTotalMarketValueFormInput(),
      coefficients: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateTotalMarketValueFormInput(),
      coefficients: [
        {
          coefficientType: 'coefficientType',
          value: 0,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

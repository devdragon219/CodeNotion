import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateTotalMarketValueFormInput } from '../initialValues';
import { getEstateTotalMarketValueMarketValuesSchema } from './totalMarketValueMarketValues';

describe('estate.total-market-value-market-values-schema', () => {
  const schema = getEstateTotalMarketValueMarketValuesSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateTotalMarketValueFormInput(),
      marketValues: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateTotalMarketValueFormInput(),
      marketValues: [
        {
          marketValueType: 'marketValueType',
          value: 0,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

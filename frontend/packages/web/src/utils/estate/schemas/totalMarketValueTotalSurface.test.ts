import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateTotalMarketValueFormInput } from '../initialValues';
import { getEstateTotalMarketValueTotalSurfaceSchema } from './totalMarketValueTotalSurface';

describe('estate.total-market-value-total-surface-schema', () => {
  const schema = getEstateTotalMarketValueTotalSurfaceSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyEstateTotalMarketValueFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateTotalMarketValueFormInput(),
      totalSurfaceAreaSqM: 0,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

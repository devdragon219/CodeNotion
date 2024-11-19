import { MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyEstateFormInput } from '../initialValues';
import { getEstateAssetValuesSchema } from './assetValues';

describe('estate.asset-values-schema', () => {
  const schema = getEstateAssetValuesSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      assetValues: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyEstateFormInput(),
      assetValues: [
        {
          year: MIN_YEAR,
          transferYear: MIN_YEAR,
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

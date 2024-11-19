import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractPriceListsSchema } from './priceLists';

describe('facility-contract.price-lists-schema', () => {
  const schema = getFacilityContractPriceListsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      priceLists: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

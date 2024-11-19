import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractCatalogueTypesSchema } from './catalogueTypes';

describe('facility-contract.catalogue-types-schema', () => {
  const schema = getFacilityContractCatalogueTypesSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      catalogueTypes: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

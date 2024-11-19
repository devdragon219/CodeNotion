import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractEstateUnitsSchema } from './estateUnits';

describe('facility-contract.estate-units-schema', () => {
  const schema = getFacilityContractEstateUnitsSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      estateUnits: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

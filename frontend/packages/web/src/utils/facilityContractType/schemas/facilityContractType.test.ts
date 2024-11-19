import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractTypeFormInput } from '../initialValues';
import { getFacilityContractTypeSchema } from './facilityContractType';

describe('facility-contract-type.facility-contract-type-schema', () => {
  const schema = getFacilityContractTypeSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractTypeFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

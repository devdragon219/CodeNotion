import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractPenaltiesSchema } from './penalties';

describe('facility-contract.penalties-schema', () => {
  const schema = getFacilityContractPenaltiesSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      penalties: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

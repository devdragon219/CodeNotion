import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractSlasSchema } from './slas';

describe('facility-contract.slas-schema', () => {
  const schema = getFacilityContractSlasSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      slas: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

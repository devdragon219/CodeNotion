import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractTermExtensionsSchema } from './termExtensions';

describe('facility-contract.term-extensions-schema', () => {
  const schema = getFacilityContractTermExtensionsSchema(mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      termExtensions: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

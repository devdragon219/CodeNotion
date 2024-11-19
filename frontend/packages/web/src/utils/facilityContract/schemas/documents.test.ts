import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractFormInput } from '../initialValues';
import { getFacilityContractDocumentsSchema } from './documents';

describe('facility-contract.documents-schema', () => {
  const schema = getFacilityContractDocumentsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyFacilityContractFormInput(),
      documents: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyFacilityContractFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

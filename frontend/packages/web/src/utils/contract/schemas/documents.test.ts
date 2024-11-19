import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput } from '../initialValues';
import { getContractDocumentsSchema } from './documents';

describe('contract.documents-schema', () => {
  const schema = getContractDocumentsSchema('en', mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyContractFormInput(),
      documents: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = getEmptyContractFormInput();
    expect(schema.isValidSync(input)).toBe(true);
  });
});

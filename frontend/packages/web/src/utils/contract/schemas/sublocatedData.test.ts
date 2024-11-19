import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput } from '../initialValues';
import { getContractSublocatedDataSchema } from './sublocatedData';

describe('contract.sublocated-data-schema', () => {
  const schema = getContractSublocatedDataSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      sublocatedContract: {
        firstTermExpirationDate: new Date(),
        secondTermExpirationDate: new Date(),
        terminationDate: new Date(),
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

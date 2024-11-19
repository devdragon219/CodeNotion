import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractTypeFormInput } from '../initialValues';
import { getContractTypeGeneralDataSchema } from './generalData';

describe('contract-type.general-data-schema', () => {
  const schema = getContractTypeGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractTypeFormInput(),
      internalCode: 'internalCode',
      description: 'description',
      isActive: true,
      nature: 'nature',
      usageType: {},
    };

    expect(schema.isValidSync(input)).toBe(true);
  });
});

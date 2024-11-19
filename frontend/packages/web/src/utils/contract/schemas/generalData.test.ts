import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyContractFormInput } from '../initialValues';
import { getContractGeneralDataSchema } from './generalData';

describe('contract.general-data-schema', () => {
  const schema = getContractGeneralDataSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyContractFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyContractFormInput(),
      internalCode: 'internalCode',
      status: 'status',
      managementSubject: {},
      contractType: {},
      reason: 'reason',
      agreementDate: new Date(),
      effectStartDate: new Date(),
      lastRenewalStartDate: new Date(),
    };

    expect(schema.isValidSync(input)).toBe(true);
  });
});

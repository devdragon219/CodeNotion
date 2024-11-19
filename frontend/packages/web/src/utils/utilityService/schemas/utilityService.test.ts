import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityServiceFormInput } from '../initialValues';
import { getUtilityServiceSchema } from './utilityService';

describe('utility-service.utility-service-schema', () => {
  const schema = getUtilityServiceSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyUtilityServiceFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUtilityServiceFormInput(),
      internalCode: 'internalCode',
      estateUnits: [{}],
      estates: [{}],
      referenceSubject: {},
      orgUnit: {},
      utilityType: {},
      providerSubject: {},
      accountingItem: {},
      utilityContractCode: 'utilityContractCode',
      utilityUserCode: 'utilityUserCode',
      status: 'status',
      activationDate: new Date(),
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

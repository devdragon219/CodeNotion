import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUtilityServiceFormInput } from '../initialValues';
import { getUtilityServiceGeneralDataSchema } from './generalData';

describe('utility-service.general-data-schema', () => {
  const schema = getUtilityServiceGeneralDataSchema(true, 'en', mockTFunction);

  it('should fail', () => {
    const input = getEmptyUtilityServiceFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUtilityServiceFormInput(),
      internalCode: 'internalCode',
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

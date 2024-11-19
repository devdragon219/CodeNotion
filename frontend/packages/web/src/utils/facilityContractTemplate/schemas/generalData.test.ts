import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractTemplateFormInput } from '../initialValues';
import { getFacilityContractTemplateGeneralDataSchema } from './generalData';

describe('facility-contract-template.general-data-schema', () => {
  const schema = getFacilityContractTemplateGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractTemplateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractTemplateFormInput(),
      internalCode: 'internalCode',
      description: 'name',
      facilityContractType: {},
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

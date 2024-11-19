import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractTemplateFormInput } from '../initialValues';
import { getFacilityContractTemplateSchema } from './facilityContractTemplate';

describe('facility-contract-template.facility-contract-template-schema', () => {
  const schema = getFacilityContractTemplateSchema(true, mockTFunction);

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
      catalogueTypes: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

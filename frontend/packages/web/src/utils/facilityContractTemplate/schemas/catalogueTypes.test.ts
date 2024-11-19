import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyFacilityContractTemplateFormInput } from '../initialValues';
import { getFacilityContractTemplateCatalogueTypesSchema } from './catalogueTypes';

describe('facility-contract-template.catalogue-types-schema', () => {
  const schema = getFacilityContractTemplateCatalogueTypesSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyFacilityContractTemplateFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyFacilityContractTemplateFormInput(),
      catalogueTypes: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

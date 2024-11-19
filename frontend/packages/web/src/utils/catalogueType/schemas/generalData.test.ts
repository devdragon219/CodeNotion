import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../initialValues';
import { getCatalogueTypeGeneralDataSchema } from './generalData';

describe('catalogue-type.general-data-schema', () => {
  const schema = getCatalogueTypeGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueTypeFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      category: {},
      usageTypes: ['usageType'],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

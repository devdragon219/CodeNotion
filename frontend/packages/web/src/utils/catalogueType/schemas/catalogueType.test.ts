import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueTypeFormInput } from '../initialValues';
import { getCatalogueTypeSchema } from './catalogueType';

describe('catalogue-type.catalogue-type-schema', () => {
  const schema = getCatalogueTypeSchema(true, mockTFunction);

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
      activities: [
        {
          activityType: 'activityType',
          name: 'name',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

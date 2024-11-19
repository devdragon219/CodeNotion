import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyServiceCategoryFormInput, getEmptyServiceSubCategoryFormInput } from '../initialValues';
import { getServiceCategorySchema } from './serviceCategory';

describe('service-category.service-category-schema', () => {
  const schema = getServiceCategorySchema(true, {}, mockTFunction);

  it('should fail', () => {
    const input = getEmptyServiceCategoryFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyServiceCategoryFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      subCategories: [
        {
          ...getEmptyServiceSubCategoryFormInput(),
          internalCode: 'internalCode',
          name: 'name',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

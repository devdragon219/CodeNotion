import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyServiceCategoryFormInput, getEmptyServiceSubCategoryFormInput } from '../initialValues';
import { getServiceCategorySubCategoriesSchema } from './subCategories';

describe('service-category.sub-categories-schema', () => {
  const schema = getServiceCategorySubCategoriesSchema({}, mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyServiceCategoryFormInput(),
      subCategories: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyServiceCategoryFormInput(),
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

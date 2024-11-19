import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueCategoryFormInput, getEmptyCatalogueSubCategoryFormInput } from '../initialValues';
import { getCatalogueCategorySubCategoriesSchema } from './subCategories';

describe('catalogue-category.sub-categories-schema', () => {
  const schema = getCatalogueCategorySubCategoriesSchema({}, mockTFunction);

  it('should fail', () => {
    const input = {
      ...getEmptyCatalogueCategoryFormInput(),
      subCategories: [{}],
    };
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueCategoryFormInput(),
      subCategories: [
        {
          ...getEmptyCatalogueSubCategoryFormInput(),
          internalCode: 'internalCode',
          name: 'name',
        },
      ],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

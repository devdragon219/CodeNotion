import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueCategoryFormInput, getEmptyCatalogueSubCategoryFormInput } from '../initialValues';
import { getCatalogueCategorySchema } from './catalogueCategory';

describe('catalogue-category.catalogue-category-schema', () => {
  const schema = getCatalogueCategorySchema(true, {}, mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueCategoryFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueCategoryFormInput(),
      internalCode: 'internalCode',
      name: 'name',
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

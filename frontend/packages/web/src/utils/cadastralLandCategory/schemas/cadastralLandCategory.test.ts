import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCadastralLandCategoryFormInput } from '../initialValues';
import { getCadastralLandCategorySchema } from './cadastralLandCategory';

describe('cadastral-land-category.cadastral-land-category-schema', () => {
  const schema = getCadastralLandCategorySchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyCadastralLandCategoryFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCadastralLandCategoryFormInput(),
      internalCode: 'internalCode',
      description: 'name',
      countryISO: 'countryISO',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCatalogueCategoryFormInput } from '../initialValues';
import { getCatalogueCategoryGeneralDataSchema } from './generalData';

describe('catalogue-category.general-data-schema', () => {
  const schema = getCatalogueCategoryGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyCatalogueCategoryFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCatalogueCategoryFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

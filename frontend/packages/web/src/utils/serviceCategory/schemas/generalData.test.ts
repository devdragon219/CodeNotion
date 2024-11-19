import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyServiceCategoryFormInput } from '../initialValues';
import { getServiceCategoryGeneralDataSchema } from './generalData';

describe('service-category.general-data-schema', () => {
  const schema = getServiceCategoryGeneralDataSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyServiceCategoryFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyServiceCategoryFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

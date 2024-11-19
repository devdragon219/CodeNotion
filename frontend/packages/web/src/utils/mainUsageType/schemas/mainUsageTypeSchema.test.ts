import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyMainUsageTypeFormInput } from '../initialValues';
import { getMainUsageTypeSchema } from './mainUsageTypeSchema';

describe('main-usage-type.main-usage-type-schema', () => {
  const schema = getMainUsageTypeSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyMainUsageTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyMainUsageTypeFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

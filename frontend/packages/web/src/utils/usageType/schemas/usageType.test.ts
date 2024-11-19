import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUsageTypeFormInput } from '../initialValues';
import { getUsageTypeSchema } from './usageType';

describe('usage-type.usage-type-schema', () => {
  const schema = getUsageTypeSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyUsageTypeFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUsageTypeFormInput(),
      internalCode: 'internalCode',
      name: 'name',
      applicability: ['applicability'],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

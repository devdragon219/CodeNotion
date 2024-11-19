import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyCraftFormInput } from '../initialValues';
import { getCraftSchema } from './craft';

describe('craft.craft-schema', () => {
  const schema = getCraftSchema(true, mockTFunction);

  it('should fail', () => {
    const input = getEmptyCraftFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyCraftFormInput(),
      internalCode: 'internalCode',
      name: 'name',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

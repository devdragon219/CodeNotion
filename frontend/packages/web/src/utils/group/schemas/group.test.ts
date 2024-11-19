import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyGroupFormInput } from '../initialValues';
import { getGroupSchema } from './group';

describe('group.group-schema', () => {
  const schema = getGroupSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyGroupFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyGroupFormInput(),
      name: 'name',
      description: 'description',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

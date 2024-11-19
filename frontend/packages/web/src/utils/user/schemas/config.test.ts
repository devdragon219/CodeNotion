import { UserType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUserFormInput } from '../initialValues';
import { getUserConfigSchema } from './config';

describe('user.config-schema', () => {
  const userType = UserType.Internal;
  const schema = getUserConfigSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyUserFormInput(userType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUserFormInput(userType),
      officeAccess: 'officeAccess',
      groups: [{}],
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

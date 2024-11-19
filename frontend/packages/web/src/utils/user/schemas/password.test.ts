import { UserType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUserFormInput } from '../initialValues';
import { getUserPasswordSchema } from './password';

describe('user.password-schema', () => {
  const userType = UserType.Internal;
  const schema = getUserPasswordSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyUserFormInput(userType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUserFormInput(userType),
      password: {
        newPassword: 'P@ssw0rd',
        confirmPassword: 'P@ssw0rd',
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

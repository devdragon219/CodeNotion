import { UserType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUserFormInput } from '../initialValues';
import { getUserSchema } from './user';

describe('user.user-schema', () => {
  const userType = UserType.Internal;
  const schema = getUserSchema(true, 'en', mockTFunction, null);

  it('should fail', () => {
    const input = getEmptyUserFormInput(userType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUserFormInput(userType),
      officeAccess: 'officeAccess',
      groups: [{}],
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName@email.com',
      managementSubjects: [{}],
      password: {
        newPassword: 'P@ssw0rd',
        confirmPassword: 'P@ssw0rd',
      },
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

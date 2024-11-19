import { UserType } from '@realgimm5/frontend-common/gql/types';
import { mockTFunction } from '@realgimm5/frontend-common/test';
import { describe, expect, it } from 'vitest';

import { getEmptyUserFormInput } from '../initialValues';
import { getUserGeneralDataSchema } from './generalData';

describe('user.general-data-schema', () => {
  const userType = UserType.Internal;
  const schema = getUserGeneralDataSchema(true, 'en', mockTFunction, null);

  it('should fail', () => {
    const input = getEmptyUserFormInput(userType);
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyUserFormInput(userType),
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName@email.com',
      managementSubjects: [{}],
      password: null,
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

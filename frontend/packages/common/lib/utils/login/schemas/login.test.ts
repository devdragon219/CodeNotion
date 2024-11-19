import { describe, expect, it } from 'vitest';

import { mockTFunction } from '../../../test/utils';
import { getEmptyLoginFormInput } from '../initialValues';
import { getLoginSchema } from './login';

describe('login.login-schema', () => {
  const schema = getLoginSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyLoginFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyLoginFormInput(),
      username: 'username',
      password: 'password',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

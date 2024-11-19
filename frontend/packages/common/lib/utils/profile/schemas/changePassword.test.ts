import { describe, expect, it } from 'vitest';

import { mockTFunction } from '../../../test/utils';
import { getEmptyProfileChangePasswordFormInput } from '../initialValues';
import { getProfileChangePasswordSchema } from './changePassword';

describe('profile.change-password-schema', () => {
  const schema = getProfileChangePasswordSchema(mockTFunction);

  it('should fail', () => {
    const input = getEmptyProfileChangePasswordFormInput();
    expect(schema.isValidSync(input)).toBe(false);
  });

  it('should succeed', () => {
    const input = {
      ...getEmptyProfileChangePasswordFormInput(),
      confirmPassword: 'P@ssw0rd',
      currentPassword: 'currentPassword',
      newPassword: 'P@ssw0rd',
    };
    expect(schema.isValidSync(input)).toBe(true);
  });
});

import { ProfileChangePasswordFormInput } from '../../interfaces/FormInputs/Profile';

export const getEmptyProfileChangePasswordFormInput = (): ProfileChangePasswordFormInput => ({
  confirmPassword: '',
  currentPassword: '',
  newPassword: '',
});

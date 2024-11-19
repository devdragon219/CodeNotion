import { TFunction } from 'i18next';
import { object, ref, string } from 'yup';

import { PASSWORD_REGEX } from '../../../configs/regex';
import { getRequiredTranslation } from '../../translationUtils';

export const getProfileChangePasswordSchema = (t: TFunction) =>
  object().shape({
    currentPassword: string().required(getRequiredTranslation('common.component.profile.field.current_password', t)),
    newPassword: string()
      .required(getRequiredTranslation('common.component.profile.field.new_password', t))
      .matches(PASSWORD_REGEX, t('common.error.password_unsafe'))
      .when('currentPassword', {
        is: (val: string) => !!(val && val.length > 0),
        then: (schema) =>
          schema.notOneOf([ref('currentPassword')], t('common.component.profile.error.invalid_new_password')),
      }),
    confirmPassword: string()
      .required(getRequiredTranslation('common.component.profile.field.confirm_password', t))
      .when('newPassword', {
        is: (val: string) => !!(val && val.length > 0),
        then: (schema) =>
          schema.oneOf([ref('newPassword')], t('common.component.profile.error.invalid_confirm_password')),
      }),
  });

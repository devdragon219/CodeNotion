import { PASSWORD_REGEX } from '@realgimm5/frontend-common/configs';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, ref, string } from 'yup';

export const getUserPasswordSchema = (t: TFunction) =>
  object().shape({
    password: object()
      .nullable()
      .shape({
        newPassword: string()
          .required(getRequiredTranslation('user.field.new_password', t))
          .matches(PASSWORD_REGEX, t('common.error.password_unsafe')),
        confirmPassword: string()
          .required(getRequiredTranslation('user.field.confirm_password', t))
          .oneOf(
            [ref('newPassword')],
            t('core.error.fields_not_matching', {
              first: t('user.field.confirm_password'),
              second: t('user.field.new_password'),
            }),
          ),
      }),
  });

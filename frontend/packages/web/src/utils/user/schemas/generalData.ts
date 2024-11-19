import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { UserStatus } from '@realgimm5/frontend-common/gql/types';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, string } from 'yup';

import { getUserPasswordSchema } from './password';

export const getUserGeneralDataSchema = (
  canUseUserName: boolean,
  language: string,
  t: TFunction,
  userStatus: UserStatus | null,
) =>
  object()
    .shape({
      firstName: string().required(getRequiredTranslation('user.field.first_name', t)),
      lastName: string().required(getRequiredTranslation('user.field.last_name', t)),
      userName: string()
        .required(getRequiredTranslation('user.field.user_name', t))
        .email(t('common.error.email'))
        .valid(canUseUserName, t('user.error.user_name')),
      managementSubjects: array().required().min(1, getRequiredTranslation('user.field.management_subjects', t)),
      enabledSince: date()
        .nullable()
        .requiredIf(userStatus === UserStatus.Active, getRequiredTranslation('user.field.enabled_since', t))
        .min(MIN_DATE, getDateMinTranslation('user.field.enabled_since', language, t))
        .max(MAX_DATE, getDateMaxTranslation('user.field.enabled_since', language, t)),
      ceasedDate: date()
        .nullable()
        .requiredIf(userStatus === UserStatus.Ceased, getRequiredTranslation('user.field.ceased_date', t))
        .min(MIN_DATE, getDateMinTranslation('user.field.ceased_date', language, t))
        .max(MAX_DATE, getDateMaxTranslation('user.field.ceased_date', language, t)),
      lockedSince: date()
        .nullable()
        .requiredIf(userStatus === UserStatus.Suspended, getRequiredTranslation('user.field.locked_since', t))
        .min(MIN_DATE, getDateMinTranslation('user.field.locked_since', language, t))
        .max(MAX_DATE, getDateMaxTranslation('user.field.locked_since', language, t)),
    })
    .concat(getUserPasswordSchema(t));

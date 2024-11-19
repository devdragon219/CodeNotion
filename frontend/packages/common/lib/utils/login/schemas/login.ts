import { TFunction } from 'i18next';
import { object, string } from 'yup';

import { getRequiredTranslation } from '../../translationUtils';

export const getLoginSchema = (t: TFunction) =>
  object({
    username: string().required(getRequiredTranslation('common.component.login.field.username', t)),
    password: string().required(getRequiredTranslation('common.component.login.field.password', t)),
  });

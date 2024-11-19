import { UserStatus } from '@realgimm5/frontend-common/gql/types';
import { getContactsSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { getUserConfigSchema } from './config';
import { getUserGeneralDataSchema } from './generalData';
import { getUserPasswordSchema } from './password';

export const getUserSchema = (canUseUserName: boolean, language: string, t: TFunction, userStatus: UserStatus | null) =>
  getUserGeneralDataSchema(canUseUserName, language, t, userStatus)
    .concat(getUserPasswordSchema(t))
    .concat(getUserConfigSchema(t))
    .concat(getContactsSchema(t));

import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { getContactsSchema } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { getOrgUnitGeneralDataSchema } from './generalData';

export const getOrgUnitSchema = (
  canUseCode: boolean,
  entryStatus: EntryStatus | null,
  language: string,
  t: TFunction,
) => getOrgUnitGeneralDataSchema(canUseCode, entryStatus, language, t).concat(getContactsSchema(t));

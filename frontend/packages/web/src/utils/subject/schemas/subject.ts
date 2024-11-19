import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';

import { LegalNature } from '../../../enums/LegalNature';
import { SubjectType } from '../../../enums/SubjectType';
import { getSubjectAccountingDataSchema } from './accountingData';
import { getSubjectAddressesAndContactsSchema } from './addressesAndContacts';
import { getSubjectDocumentsSchema } from './documents';
import { getSubjectGeneralDataSchema } from './generalData';
import { getSubjectPersonalDataSchema } from './personalData';

export const getSubjectSchema = (
  canBeGroupLeader: boolean,
  canUseInterGroupSignature: boolean,
  canUseInternalCode: boolean,
  entryStatus: EntryStatus | null,
  isBirthTaxIdCodeValid: boolean,
  language: string,
  legalNature: LegalNature | null,
  subjectType: SubjectType,
  t: TFunction,
) =>
  getSubjectGeneralDataSchema(canUseInternalCode, entryStatus, language, subjectType, t)
    .concat(
      getSubjectPersonalDataSchema(
        canBeGroupLeader,
        canUseInterGroupSignature,
        entryStatus,
        isBirthTaxIdCodeValid,
        language,
        legalNature,
        subjectType,
        t,
      ),
    )
    .concat(getSubjectAccountingDataSchema(entryStatus, language, t))
    .concat(getSubjectAddressesAndContactsSchema(entryStatus, t))
    .concat(getSubjectDocumentsSchema(entryStatus, language, t));

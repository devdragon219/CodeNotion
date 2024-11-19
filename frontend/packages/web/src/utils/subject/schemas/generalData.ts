import { MIN_DATE } from '@realgimm5/frontend-common/configs';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMinTranslation,
  getDateNotFutureTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, string } from 'yup';

import { SubjectType } from '../../../enums/SubjectType';

export const getSubjectGeneralDataSchema = (
  canUseInternalCode: boolean,
  entryStatus: EntryStatus | null,
  language: string,
  subjectType: SubjectType,
  t: TFunction,
) =>
  object().shape({
    entryStatus: string().required(getRequiredTranslation('subject.field.subject_status', t)),
    closureDate: date()
      .nullable()
      .requiredIf(entryStatus === EntryStatus.FrozenClosed, getRequiredTranslation('subject.field.closure_date', t))
      .min(MIN_DATE, getDateMinTranslation('subject.field.closure_date', language, t))
      .max(Date(), getDateNotFutureTranslation('subject.field.closure_date', t)),
    internalCode: string()
      .required(getRequiredTranslation('subject.field.subject_code', t))
      .valid(canUseInternalCode, t('subject.error.internal_code')),
    ...(subjectType === SubjectType.ManagementSubject
      ? {
          managementCode: string().requiredIf(
            entryStatus !== EntryStatus.IncompleteDraft,
            getRequiredTranslation('subject.field.management_code', t),
          ),
        }
      : {
          legalNature: string().required(getRequiredTranslation('subject.field.legal_nature', t)),
          owningManagementSubjects: array().min(
            1,
            getRequiredTranslation('subject.field.owning_management_subjects', t),
          ),
          categories: array().min(
            entryStatus !== EntryStatus.IncompleteDraft ? 1 : 0,
            getRequiredTranslation('subject.field.category', t),
          ),
        }),
  });

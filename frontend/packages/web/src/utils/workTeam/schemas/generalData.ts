import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, string } from 'yup';

export const getWorkTeamGeneralDataSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('work_team.field.internal_code', t))
      .valid(canUseInternalCode, t('work_team.error.internal_code')),
    description: string().required(getRequiredTranslation('work_team.field.description', t)),
    providerSubject: object().required(getRequiredTranslation('work_team.field.provider_subject', t)),
    leaderUser: object().required(getRequiredTranslation('work_team.field.leader_user', t)),
    insertionDate: date()
      .required(getRequiredTranslation('work_team.field.insertion_date', t))
      .min(MIN_DATE, getDateMinTranslation('work_team.field.insertion_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('work_team.field.insertion_date', language, t)),
  });

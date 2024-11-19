import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getInterventionTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('intervention_type.field.internal_code', t))
      .valid(canUseInternalCode, t('intervention_type.error.internal_code')),
    name: string().required(getRequiredTranslation('intervention_type.field.name', t)),
  });

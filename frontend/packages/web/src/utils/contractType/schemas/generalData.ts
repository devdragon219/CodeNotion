import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { boolean, object, string } from 'yup';

export const getContractTypeGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('contract_type.field.internal_code', t))
      .valid(canUseInternalCode, t('contract_type.error.internal_code')),
    description: string().required(getRequiredTranslation('contract_type.field.description', t)),
    isActive: boolean().required(getRequiredTranslation('contract_type.field.typology', t)),
    nature: string().required(getRequiredTranslation('contract_type.field.nature_type', t)),
    usageType: object().required(getRequiredTranslation('contract_type.field.usage_type', t)),
  });

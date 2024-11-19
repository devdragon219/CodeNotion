import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, string } from 'yup';

export const getUtilityServiceGeneralDataSchema = (canUseInternalCode: boolean, language: string, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('utility_service.field.internal_code', t))
      .valid(canUseInternalCode, t('utility_service.error.internal_code')),
    referenceSubject: object().required(getRequiredTranslation('utility_service.field.reference_subject', t)),
    orgUnit: object().required(getRequiredTranslation('utility_service.field.org_unit', t)),
    utilityType: object().required(getRequiredTranslation('utility_service.field.utility_type', t)),
    providerSubject: object().required(getRequiredTranslation('utility_service.field.provider_subject', t)),
    accountingItem: object().required(getRequiredTranslation('utility_service.field.accounting_item', t)),
    utilityContractCode: string().required(getRequiredTranslation('utility_service.field.utility_contract_code', t)),
    utilityUserCode: string().required(getRequiredTranslation('utility_service.field.utility_user_code', t)),
    status: string().required(getRequiredTranslation('utility_service.field.status', t)),
    activationDate: date()
      .required(getRequiredTranslation('utility_service.field.activation_date', t))
      .min(MIN_DATE, getDateMinTranslation('utility_service.field.activation_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('utility_service.field.activation_date', language, t)),
  });

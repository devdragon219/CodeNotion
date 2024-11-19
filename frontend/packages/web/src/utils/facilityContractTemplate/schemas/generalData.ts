import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getFacilityContractTemplateGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('facility_contract_template.field.internal_code', t))
      .valid(canUseInternalCode, t('facility_contract_template.error.internal_code')),
    description: string().required(getRequiredTranslation('facility_contract_template.field.description', t)),
    facilityContractType: object().required(
      getRequiredTranslation('facility_contract_template.field.contract_type', t),
    ),
  });

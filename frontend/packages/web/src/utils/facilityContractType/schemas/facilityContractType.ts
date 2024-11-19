import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getFacilityContractTypeSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('facility_contract_type.field.internal_code', t))
      .valid(canUseInternalCode, t('facility_contract_type.error.internal_code')),
    name: string().required(getRequiredTranslation('facility_contract_type.field.name', t)),
    ordering: number().required(getRequiredTranslation('facility_contract_type.field.ordering', t)),
  });

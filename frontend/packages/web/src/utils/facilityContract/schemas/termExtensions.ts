import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object } from 'yup';

export const getFacilityContractTermExtensionSchema = (t: TFunction) =>
  object().shape({
    daysCount: number().required(getRequiredTranslation('facility_contract.field.term_extension_days', t)),
  });

export const getFacilityContractTermExtensionsSchema = (t: TFunction) =>
  object().shape({
    termExtensions: array().of(getFacilityContractTermExtensionSchema(t)),
  });

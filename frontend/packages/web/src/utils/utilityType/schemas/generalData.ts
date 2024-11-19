import { getNumberMaxTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getUtilityTypeGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    category: string().required(getRequiredTranslation('utility_type.field.utility_category', t)),
    internalCode: string()
      .required(getRequiredTranslation('utility_type.field.utility_code', t))
      .valid(canUseInternalCode, t('utility_type.error.internal_code')),
    description: string().required(getRequiredTranslation('utility_type.field.utility_description', t)),
    measurementUnit: string().required(getRequiredTranslation('utility_type.field.measurement_unit_code', t)),
    measurementUnitDescription: string().required(
      getRequiredTranslation('utility_type.field.measurement_unit_description', t),
    ),
    timeOfUseRateCount: number()
      .required(getRequiredTranslation('utility_type.field.time_of_use_rate_count', t))
      .max(25, getNumberMaxTranslation('utility_type.field.time_of_use_rate_count', 25, t)),
    meteringType: string().required(getRequiredTranslation('utility_type.field.metering_type', t)),
  });

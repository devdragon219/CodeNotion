import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getPriceListMeasurementUnitSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('price_list_measurement_unit.field.internal_code', t))
      .valid(canUseInternalCode, t('price_list_measurement_unit.error.internal_code')),
    name: string().required(getRequiredTranslation('price_list_measurement_unit.field.name', t)),
    ordering: number().required(getRequiredTranslation('price_list_measurement_unit.field.ordering', t)),
  });

import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, string } from 'yup';

export const getEstateTotalMarketValueCoefficientsSchema = (t: TFunction) =>
  object().shape({
    coefficients: array().of(
      object().shape({
        coefficientType: string().required(getRequiredTranslation('estate.field.coefficient_type', t)),
        value: number().required(getRequiredTranslation('estate.field.coefficient_value', t)),
      }),
    ),
  });

import { TFunction } from 'i18next';
import { object } from 'yup';

import { getEstateTotalMarketValueCoefficientsSchema } from './totalMarketValueCoefficients';
import { getEstateTotalMarketValueMarketValuesSchema } from './totalMarketValueMarketValues';
import { getEstateTotalMarketValueTotalSurfaceSchema } from './totalMarketValueTotalSurface';

export const getEstateTotalMarketValueSchema = (t: TFunction) =>
  object().shape({
    totalMarketValue: object()
      .concat(getEstateTotalMarketValueTotalSurfaceSchema(t))
      .concat(getEstateTotalMarketValueCoefficientsSchema(t))
      .concat(getEstateTotalMarketValueMarketValuesSchema(t))
      .nullable(),
  });

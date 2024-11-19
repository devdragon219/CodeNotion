import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object, string } from 'yup';

export const getEstateTotalMarketValueMarketValuesSchema = (t: TFunction) =>
  object().shape({
    marketValues: array()
      .of(
        object().shape({
          marketValueType: string().required(getRequiredTranslation('estate.field.market_value_type', t)),
          value: number().required(getRequiredTranslation('estate.field.market_value_value', t)),
        }),
      )
      .min(1, getRequiredTranslation('estate.section_title.market_values', t)),
  });

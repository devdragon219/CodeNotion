import { MAX_YEAR, MIN_YEAR } from '@realgimm5/frontend-common/configs';
import { getRequiredTranslation, getYearMaxTranslation, getYearMinTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, number, object } from 'yup';

export const getEstateAssetValuesSchema = (t: TFunction) =>
  object().shape({
    assetValues: array().of(
      object().shape({
        year: number()
          .required(getRequiredTranslation('estate.field.asset_value_year', t))
          .min(MIN_YEAR, getYearMinTranslation('estate.field.asset_value_year', t))
          .max(MAX_YEAR, getYearMaxTranslation('estate.field.asset_value_year', t)),
        transferYear: number()
          .nullable()
          .min(MIN_YEAR, getYearMinTranslation('estate.field.asset_value_transfer_in', t))
          .max(MAX_YEAR, getYearMaxTranslation('estate.field.asset_value_transfer_in', t)),
      }),
    ),
  });

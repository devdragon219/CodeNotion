import { TFunction } from 'i18next';
import { array, object } from 'yup';

import { getTaxConfigValueSchema } from './taxConfigValue';

export const getTaxConfigSubTableSchema = (subTable: string, t: TFunction, min = 0) =>
  object().shape({
    subTables: object().shape({
      [subTable]: array().min(min, t('tax_config.error.no_sub_tables')).of(getTaxConfigValueSchema(t)),
    }),
  });

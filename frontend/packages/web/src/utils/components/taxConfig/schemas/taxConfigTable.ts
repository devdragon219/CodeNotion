import { TFunction } from 'i18next';
import { object } from 'yup';

import { getTaxConfigValueSchema } from './taxConfigValue';

export const getTaxConfigTableSchema = (t: TFunction, canCreateTaxConfigTableValue = true) =>
  object().shape({
    table: getTaxConfigValueSchema(t, canCreateTaxConfigTableValue),
  });

import { TFunction } from 'i18next';
import { array, object } from 'yup';

import { TableFragment } from '../../../../gql/RealGimm.Web.Table.fragment';
import { getTaxConfigTableSchema } from './taxConfigTable';
import { getTaxConfigValueSchema } from './taxConfigValue';

export const getTaxConfigSchema = (subTables: TableFragment[], t: TFunction, canCreateTaxConfigTableValue = true) =>
  object()
    .shape({
      subTables: object()
        .nullable()
        .shape(
          subTables.reduce(
            (acc, subTable) => ({
              ...acc,
              [subTable.code]: array().min(1, t('tax_config.error.no_sub_tables')).of(getTaxConfigValueSchema(t)),
            }),
            {},
          ),
        ),
    })
    .concat(getTaxConfigTableSchema(t, canCreateTaxConfigTableValue));

import { TaxConfigInput } from '@realgimm5/frontend-common/gql/types';

import { TaxConfigFormInput } from '../../../interfaces/FormInputs/TaxConfig';
import { parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput } from './parseTaxConfigFieldFormInput';

export const parseTaxConfigFormInputToTaxConfigInput = (taxConfig: TaxConfigFormInput): TaxConfigInput => ({
  columnValues: taxConfig.table.fields.map(parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput),
  subValues: Object.entries(taxConfig.subTables).flatMap(([subTable, values]) =>
    values.map(({ fields }) => ({
      columnValues: fields.map(parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput),
      subTable,
    })),
  ),
});

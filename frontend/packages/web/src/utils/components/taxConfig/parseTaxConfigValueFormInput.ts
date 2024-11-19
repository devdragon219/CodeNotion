import { TaxConfigInput, TaxConfigSubValueRowInput } from '@realgimm5/frontend-common/gql/types';

import { TaxConfigValueFormInput } from '../../../interfaces/FormInputs/TaxConfig';
import { parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput } from './parseTaxConfigFieldFormInput';

export const parseTaxConfigValueFormInputToTaxConfigInput = (taxConfig: TaxConfigValueFormInput): TaxConfigInput => ({
  columnValues: taxConfig.fields.map(parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput),
});

export const parseTaxConfigValueFormInputToTaxConfigSubValueRowInput = (
  subTable: string,
  taxConfig: TaxConfigValueFormInput,
): TaxConfigSubValueRowInput => ({
  columnValues: taxConfig.fields.map(parseTaxConfigFieldFormInputToTaxConfigSubValueColumnInput),
  subTable,
});

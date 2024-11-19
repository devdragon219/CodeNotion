import { SubValueType } from '@realgimm5/frontend-common/gql/types';

import { TableFragment } from '../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigMainTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigMainTableRow.fragment';
import { TaxConfigSubTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigSubTableRow.fragment';
import { CityFieldValue } from '../../../interfaces/FieldValues/City';
import { TaxConfigFieldFormInput, TaxConfigValueFormInput } from '../../../interfaces/FormInputs/TaxConfig';
import { getTaxConfigFieldLabel, parseTaxConfigTableRowValue } from './taxConfigUtils';

export const parseTaxConfigTableRowToTaxConfigValueFormInput = (
  row: TaxConfigMainTableRowFragment | TaxConfigSubTableRowFragment,
  table: TableFragment,
): TaxConfigValueFormInput => ({
  fields: table.columns
    .filter(({ isVisibleInDetail }) => isVisibleInDetail)
    .map<TaxConfigFieldFormInput>((column) => {
      const commonProps = {
        code: column.code,
        isDisabled: column.isReadonly,
        isMandatory: column.isMandatory,
        label: getTaxConfigFieldLabel(column.code),
        value: parseTaxConfigTableRowValue(column, row),
      };

      switch (column.valueType) {
        case SubValueType.Boolean:
          return {
            ...commonProps,
            fieldType: SubValueType.Boolean,
            value: commonProps.value as boolean,
          };
        case SubValueType.City:
          return {
            ...commonProps,
            fieldType: SubValueType.City,
            value: commonProps.value as CityFieldValue,
          };
        case SubValueType.Currency:
          return {
            ...commonProps,
            fieldType: SubValueType.Currency,
            value: commonProps.value as number | null,
          };
        case SubValueType.Date:
          return {
            ...commonProps,
            fieldType: SubValueType.Date,
            value: commonProps.value as Date | null,
          };
        case SubValueType.Number:
          return {
            ...commonProps,
            fieldType: SubValueType.Number,
            value: commonProps.value as number | null,
          };
        case SubValueType.String:
          return {
            ...commonProps,
            fieldType: SubValueType.String,
            value: commonProps.value as string,
          };
      }
    }),
  taxConfigValueId: row.id,
});

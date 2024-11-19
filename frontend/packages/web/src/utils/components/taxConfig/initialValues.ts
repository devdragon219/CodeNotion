import { SubValueType } from '@realgimm5/frontend-common/gql/types';

import { TableFragment } from '../../../gql/RealGimm.Web.Table.fragment';
import {
  TaxConfigFieldFormInput,
  TaxConfigFormInput,
  TaxConfigValueFormInput,
} from '../../../interfaces/FormInputs/TaxConfig';
import { getEmptyCityFieldValue } from '../addressesField/initialValues';
import { getTaxConfigFieldLabel } from './taxConfigUtils';

export const getEmptyTaxConfigValueFormInput = (table: TableFragment): TaxConfigValueFormInput => ({
  fields: table.columns
    .filter(({ isVisibleInDetail }) => isVisibleInDetail)
    .map<TaxConfigFieldFormInput>((column) => {
      const commonProps = {
        code: column.code,
        isDisabled: column.isReadonly,
        isMandatory: column.isMandatory,
        label: getTaxConfigFieldLabel(column.code),
      };

      switch (column.valueType) {
        case SubValueType.Boolean:
          return {
            ...commonProps,
            fieldType: SubValueType.Boolean,
            value: false,
          };
        case SubValueType.City:
          return {
            ...commonProps,
            fieldType: SubValueType.City,
            value: getEmptyCityFieldValue(),
          };
        case SubValueType.Currency:
          return {
            ...commonProps,
            fieldType: SubValueType.Currency,
            value: null,
          };
        case SubValueType.Date:
          return {
            ...commonProps,
            fieldType: SubValueType.Date,
            value: null,
          };
        case SubValueType.Number:
          return {
            ...commonProps,
            fieldType: SubValueType.Number,
            value: null,
          };
        case SubValueType.String:
          return {
            ...commonProps,
            fieldType: SubValueType.String,
            value: '',
          };
      }
    }),
  taxConfigValueId: null,
});

export const getEmptyTaxConfigFormInput = (table: TableFragment, subTables: TableFragment[]): TaxConfigFormInput => ({
  subTables: subTables.reduce(
    (acc, subTable) => ({
      ...acc,
      [subTable.code]: [getEmptyTaxConfigValueFormInput(subTable)],
    }),
    {},
  ),
  table: getEmptyTaxConfigValueFormInput(table),
});

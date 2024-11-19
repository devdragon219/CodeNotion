import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { getValueForKey, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';

import { CityFragment } from '../../../gql/RealGimm.Web.City.fragment';
import { ColumnFragment } from '../../../gql/RealGimm.Web.Column.fragment';
import { TaxConfigColumnFragment } from '../../../gql/RealGimm.Web.TaxConfigColumn.fragment';
import { TaxConfigMainTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigMainTableRow.fragment';
import { TaxConfigSubTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigSubTableRow.fragment';
import { TaxConfigFieldFormInput, TaxConfigValueFormInput } from '../../../interfaces/FormInputs/TaxConfig';
import { parseCityToCityFieldValue } from '../addressesField/parseAddressFragment';

export const parseTaxCalculatorCode = (code: string) => code.replaceAll('-', '_');

export const getTaxConfigTableName = (calculator: string, table: string) =>
  `tax_config.calculator.${calculator}.${parseTaxCalculatorCode(table)}.table.name` as ParseKeys;

export const getTaxConfigTableEmptyLabel = (calculator: string, table: string) =>
  `tax_config.calculator.${calculator}.${parseTaxCalculatorCode(table)}.table.empty` as ParseKeys;

export const getTaxConfigTableColumnType = (column: ColumnFragment): TableColumn<unknown>['type'] => {
  switch (column.valueType) {
    case SubValueType.Boolean:
      return 'boolean';
    case SubValueType.Currency:
      return 'currency';
    case SubValueType.Date:
      return 'date';
    case SubValueType.Number:
      return 'number';
    default:
      return undefined;
  }
};

export const getTaxConfigDialogTitle = (calculator: string, table: string, hasInput?: boolean, isReadonly?: boolean) =>
  `tax_config.calculator.${calculator}.${parseTaxCalculatorCode(table)}.dialog.${hasInput ? (isReadonly ? 'view' : 'update') : 'create'}` as ParseKeys;

export const getTaxConfigAddValueActionLabel = (calculator: string, table: string) =>
  `tax_config.calculator.${calculator}.${parseTaxCalculatorCode(table)}.action` as ParseKeys;

export const getTaxConfigFieldLabel = (code: string) => `tax_config.field.${parseTaxCalculatorCode(code)}` as ParseKeys;

export const getTaxConfigFieldValue = ({ fieldType, value }: TaxConfigFieldFormInput) => {
  switch (fieldType) {
    case SubValueType.City:
      return value?.name;
    default:
      return value;
  }
};

export const getTaxConfigValueTitle = (config: TaxConfigValueFormInput) =>
  config.fields
    .slice(0, config.fields.length >= 2 ? 2 : 1)
    .map(getTaxConfigFieldValue)
    .filter((it) => it !== '')
    .join(' - ');

export const getTaxConfigValueFeedbackBaseKey = (calculator: string, table: string) =>
  `tax_config.calculator.${calculator}.${parseTaxCalculatorCode(table)}`;

export const getTaxConfigTableRowValue = <T extends TaxConfigMainTableRowFragment | TaxConfigSubTableRowFragment>(
  column: ColumnFragment,
  row: T,
) => {
  if (!column.sourceField) return getValueForKey(column.sourceKey, row) as number | string;
  const sourceField = getValueForKey(column.sourceField, row);
  if (Array.isArray(sourceField)) {
    const field = (sourceField as TaxConfigColumnFragment[]).find(({ key }) => key === column.sourceKey);
    switch (column.valueType) {
      case SubValueType.Boolean:
        return field?.booleanValue;
      case SubValueType.Date:
        return parseStringToDate(field?.dateValue);
      case SubValueType.String:
        return field?.stringValue;
      default:
        return field?.numberValue;
    }
  }
  if (typeof sourceField === 'object') return getValueForKey(column.sourceKey, sourceField) as number | string;
  return '-';
};

export const parseTaxConfigTableRowValue = <T extends TaxConfigMainTableRowFragment | TaxConfigSubTableRowFragment>(
  column: ColumnFragment,
  row: T,
) => {
  if (!column.sourceField) return getValueForKey(column.sourceKey, row);
  const sourceField = getValueForKey(column.sourceField, row);
  if (column.valueType === SubValueType.City) return parseCityToCityFieldValue(sourceField as CityFragment);
  if (Array.isArray(sourceField)) {
    const field = (sourceField as TaxConfigColumnFragment[]).find(({ key }) => key === column.sourceKey);
    switch (column.valueType) {
      case SubValueType.Boolean:
        return field?.booleanValue;
      case SubValueType.Date:
        return parseStringToDate(field?.dateValue);
      case SubValueType.String:
        return field?.stringValue;
      default:
        return field?.numberValue;
    }
  }
  if (typeof sourceField === 'object') return getValueForKey(column.sourceKey, sourceField);
  return null;
};

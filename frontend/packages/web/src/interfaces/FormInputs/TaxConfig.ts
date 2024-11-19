import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { ParseKeys } from 'i18next';

import { CityFieldValue } from '../FieldValues/City';

interface BaseTaxConfigFieldFormInput {
  code: string;
  fieldType: SubValueType;
  isDisabled: boolean;
  isMandatory: boolean;
  label: ParseKeys;
  value: unknown;
}

interface BooleanTaxConfigFieldFormInput extends BaseTaxConfigFieldFormInput {
  fieldType: SubValueType.Boolean;
  value: boolean;
}

interface CityTaxConfigFieldFormInput extends BaseTaxConfigFieldFormInput {
  fieldType: SubValueType.City;
  value: CityFieldValue | null;
}

interface CurrencyTaxConfigFieldFormInput extends BaseTaxConfigFieldFormInput {
  fieldType: SubValueType.Currency;
  value: number | null;
}

interface DateTaxConfigFieldFormInput extends BaseTaxConfigFieldFormInput {
  fieldType: SubValueType.Date;
  value: Date | null;
}

interface NumberTaxConfigFieldFormInput extends BaseTaxConfigFieldFormInput {
  fieldType: SubValueType.Number;
  value: number | null;
}

interface StringTaxConfigFieldFormInput extends BaseTaxConfigFieldFormInput {
  fieldType: SubValueType.String;
  value: string;
}

export type TaxConfigFieldFormInput =
  | BooleanTaxConfigFieldFormInput
  | CityTaxConfigFieldFormInput
  | CurrencyTaxConfigFieldFormInput
  | DateTaxConfigFieldFormInput
  | NumberTaxConfigFieldFormInput
  | StringTaxConfigFieldFormInput;

export interface TaxConfigValueFormInput {
  fields: TaxConfigFieldFormInput[];
  taxConfigValueId: number | null;
}

export interface TaxConfigFormInput {
  subTables: {
    [code: string]: TaxConfigValueFormInput[];
  };
  table: TaxConfigValueFormInput;
}

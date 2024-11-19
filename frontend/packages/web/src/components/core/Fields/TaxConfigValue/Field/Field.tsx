import { CheckboxField, CurrencyField, DateField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CityFieldValue } from '../../../../../interfaces/FieldValues/City';
import { CityField } from '../../City/City';
import { TaxConfigFieldProps } from './Field.types';

export const TaxConfigField = ({ errors, field, index, mode, readonly, onChange }: TaxConfigFieldProps) => {
  const { t } = useTranslation();

  const commonProps = useMemo(
    () => ({
      disabled: mode === FormMode.Edit && field.isDisabled,
      error: !!errors?.fields?.[index]?.value,
      helperText: errors?.fields?.[index]?.value?.message,
      label: t(field.label),
      readonly,
      required: field.isMandatory,
    }),
    [mode, field.isDisabled, field.label, field.isMandatory, errors, index, t, readonly],
  );

  switch (field.fieldType) {
    case SubValueType.Boolean:
      return (
        <CheckboxField
          {...commonProps}
          value={field.value}
          onChange={(_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
            onChange({
              ...field,
              value: checked,
            });
          }}
        />
      );
    case SubValueType.City:
      return (
        <CityField
          {...commonProps}
          // TODO: get country ISO from backend table configuration
          countryISO="ITA"
          value={field.value}
          onChange={(value: CityFieldValue | null) => {
            onChange({
              ...field,
              value: value,
            });
          }}
        />
      );
    case SubValueType.Currency:
      return (
        <CurrencyField
          {...commonProps}
          value={field.value}
          onChange={(value: number | null) => {
            onChange({
              ...field,
              value: value,
            });
          }}
        />
      );
    case SubValueType.Date:
      return (
        <DateField
          {...commonProps}
          value={field.value}
          onChange={(value: Date | null) => {
            onChange({
              ...field,
              value: value,
            });
          }}
        />
      );
    case SubValueType.Number:
      return (
        <TextField
          {...commonProps}
          type="number"
          value={field.value}
          onChange={(value: number | null) => {
            onChange({
              ...field,
              value: value,
            });
          }}
        />
      );
    case SubValueType.String:
      return (
        <TextField
          {...commonProps}
          value={field.value}
          onChange={(value: string) => {
            onChange({
              ...field,
              value: value,
            });
          }}
        />
      );
  }
};

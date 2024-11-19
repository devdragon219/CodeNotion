import { useCallback, useMemo } from 'react';

import { CustomFieldType } from '../../../gql/types';
import { parseDateToString } from '../../../utils/dateUtils';
import { parseStringToDate } from '../../../utils/stringUtils';
import { DateField } from '../../Fields/Date/Date';
import { SelectField } from '../../Fields/Select/Select';
import { TextField } from '../../Fields/Text/Text';
import { FormFieldProps } from './Field.types';

export const FormField = ({ disabled, errors, field, index, readonly, onChange, required }: FormFieldProps) => {
  const handleChange = useCallback(
    (value: Date | number | string | null) => {
      const parseValue = () => {
        switch (typeof value) {
          case 'number':
            return `${value}`;
          case 'object':
            return parseDateToString(value) ?? '';
          case 'string':
            return value;
          default:
            return '';
        }
      };
      onChange({
        ...field,
        value: parseValue(),
      });
    },
    [field, onChange],
  );

  const handleOptionLabel = useCallback(
    (option: string, options = field.validValues) => {
      const selectedOption = options.find((it) => (typeof it === 'string' ? it === option : it.value === option));
      if (!selectedOption || typeof selectedOption === 'string') return option;
      if ('label' in selectedOption) return selectedOption.label;
      return handleOptionLabel(option, selectedOption.options);
    },
    [field.validValues],
  );

  const commonProps = useMemo(
    () => ({
      disabled: typeof disabled === 'function' ? disabled(field) : disabled,
      error: !!errors?.fields?.[index[0]]?.[index[1]]?.value,
      helperText: errors?.fields?.[index[0]]?.[index[1]]?.value?.message,
      label: field.label ?? field.name,
      readonly: typeof readonly === 'function' ? readonly(field) : readonly,
      required: required?.(field) ?? field.isMandatory,
      onChange: handleChange,
    }),
    [disabled, field, errors?.fields, index, readonly, required, handleChange],
  );

  switch (field.fieldType) {
    case CustomFieldType.Date:
      return <DateField {...commonProps} value={field.value !== '' ? parseStringToDate(field.value) : null} />;
    case CustomFieldType.SimpleNumber:
      return <TextField {...commonProps} type="number" value={field.value !== '' ? Number(field.value) : null} />;
    case CustomFieldType.SimpleText:
      return <TextField {...commonProps} value={field.value} />;
    case CustomFieldType.SingleItemFromList:
      return (
        <SelectField
          {...commonProps}
          options={field.validValues}
          getOptionLabel={handleOptionLabel}
          value={field.value !== '' ? field.value : null}
        />
      );
  }
};

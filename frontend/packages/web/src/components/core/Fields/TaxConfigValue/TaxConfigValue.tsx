import { Grid2 } from '@mui/material';
import { forwardRef, useCallback } from 'react';

import { TaxConfigFieldFormInput } from '../../../../interfaces/FormInputs/TaxConfig';
import { TaxConfigField } from './Field/Field';
import { TaxConfigValueFieldProps } from './TaxConfigValue.types';

const TaxConfigValueField = forwardRef<HTMLDivElement, TaxConfigValueFieldProps>(
  ({ value, onChange, ...props }, ref) => {
    const handleChange = useCallback(
      (index: number) => (field: TaxConfigFieldFormInput) => {
        onChange?.({
          ...value,
          fields: value.fields.map((it, idx) => (idx === index ? field : it)),
        });
      },
      [onChange, value],
    );

    return (
      <Grid2 ref={ref} container spacing={{ xs: 2, sm: 3 }}>
        {value.fields.map((field, index) => (
          <Grid2 key={field.code} size={{ xs: 12, sm: 12 / value.fields.length }}>
            <TaxConfigField {...props} field={field} index={index} onChange={handleChange(index)} />
          </Grid2>
        ))}
      </Grid2>
    );
  },
);
TaxConfigValueField.displayName = 'TaxConfigValueField';

export { TaxConfigValueField };

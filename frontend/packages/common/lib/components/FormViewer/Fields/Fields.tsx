import { Grid2 } from '@mui/material';
import { useCallback } from 'react';

import { FormViewerFieldFormInput } from '../../../interfaces/FormInputs/FormViewer';
import { FormField } from '../Field/Field';
import { FormFieldsProps } from './Fields.types';

export const FormFields = ({ fields, index, onChange, ...props }: FormFieldsProps) => {
  const handleChange = useCallback(
    (idx: number) => (field: FormViewerFieldFormInput) => {
      onChange(fields.map((it, index) => (idx === index ? field : it)));
    },
    [fields, onChange],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {fields.map((field, idx, { length }) => (
        <Grid2 key={idx} size={{ xs: 12, sm: 12 / length }}>
          <FormField {...props} field={field} index={[index, idx]} onChange={handleChange(idx)} />
        </Grid2>
      ))}
    </Grid2>
  );
};

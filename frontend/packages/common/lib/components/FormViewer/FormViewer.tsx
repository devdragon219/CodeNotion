import { Grid2 } from '@mui/material';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { FormViewerFieldFormInput } from '../../interfaces/FormInputs/FormViewer';
import { FormFields } from './Fields/Fields';
import { FormViewerProps } from './FormViewer.types';

const FormViewer = forwardRef<HTMLDivElement, FormViewerProps>(({ value, onChange, ...props }, ref) => {
  const [fields, setFields] = useState(value ?? []);

  useEffect(() => {
    onChange?.(fields);
    // eslint-disable-next-line
  }, [fields]);

  const handleChange = useCallback(
    (index: number) => (value: FormViewerFieldFormInput[]) => {
      setFields((fields) => fields.map((it, idx) => (index === idx ? value : it)));
    },
    [],
  );

  return (
    <Grid2 ref={ref} container spacing={{ xs: 2, sm: 3 }}>
      {fields.map((fields, index) => (
        <Grid2 key={index} size={12}>
          <FormFields {...props} fields={fields} index={index} onChange={handleChange(index)} />
        </Grid2>
      ))}
    </Grid2>
  );
});
FormViewer.displayName = 'FormViewer';

export { FormViewer };

import { SxProps, Theme } from '@mui/material';

import { FormBuilderFieldFormInput } from '../../../interfaces/FormInputs/FormBuilder';

export interface FormBuilderContainerProps {
  disabled?: boolean;
  fields: FormBuilderFieldFormInput[];
  index: number;
  readonly?: boolean;
  sx?: SxProps<Theme>;
  onChange: (fields: FormBuilderFieldFormInput[]) => void;
}

import { Control, FieldErrors } from 'react-hook-form';

import { FloorTemplatesFieldValues } from '../../../../interfaces/FormInputs/Floor';

export interface FloorTemplateFieldProps {
  control: Control<FloorTemplatesFieldValues>;
  errors: FieldErrors<FloorTemplatesFieldValues>;
  index: number;
  readonly?: boolean;
}

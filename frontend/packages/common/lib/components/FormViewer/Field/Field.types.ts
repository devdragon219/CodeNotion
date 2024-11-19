import { FieldErrors } from 'react-hook-form';

import { FormViewerFieldFormInput, FormViewerFieldValues } from '../../../interfaces/FormInputs/FormViewer';

export interface FormFieldProps {
  disabled?: boolean | ((field: FormViewerFieldFormInput) => boolean);
  errors?: FieldErrors<FormViewerFieldValues>;
  field: FormViewerFieldFormInput;
  index: [number, number];
  readonly?: boolean | ((field: FormViewerFieldFormInput) => boolean);
  onChange: (field: FormViewerFieldFormInput) => void;
  required?: (field: FormViewerFieldFormInput) => boolean;
}

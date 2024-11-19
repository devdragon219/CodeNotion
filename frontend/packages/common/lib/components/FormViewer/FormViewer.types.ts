import { FieldErrors } from 'react-hook-form';

import { FormViewerFieldFormInput, FormViewerFieldValues } from '../../interfaces/FormInputs/FormViewer';

export interface FormViewerProps {
  disabled?: boolean | ((field: FormViewerFieldFormInput) => boolean);
  errors?: FieldErrors<FormViewerFieldValues>;
  readonly?: boolean | ((field: FormViewerFieldFormInput) => boolean);
  value?: FormViewerFieldFormInput[][];
  onChange?: (value: FormViewerFieldFormInput[][]) => void;
  required?: (field: FormViewerFieldFormInput) => boolean;
}

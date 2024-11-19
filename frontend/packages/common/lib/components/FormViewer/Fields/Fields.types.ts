import { FieldErrors } from 'react-hook-form';

import { FormViewerFieldFormInput, FormViewerFieldValues } from '../../../interfaces/FormInputs/FormViewer';

export interface FormFieldsProps {
  disabled?: boolean | ((field: FormViewerFieldFormInput) => boolean);
  errors?: FieldErrors<FormViewerFieldValues>;
  fields: FormViewerFieldFormInput[];
  index: number;
  readonly?: boolean | ((field: FormViewerFieldFormInput) => boolean);
  onChange: (fields: FormViewerFieldFormInput[]) => void;
  required?: (field: FormViewerFieldFormInput) => boolean;
}

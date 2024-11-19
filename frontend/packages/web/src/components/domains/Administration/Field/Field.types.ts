import { FieldErrors } from 'react-hook-form';

import { AdministrationFormInput } from '../../../../interfaces/FormInputs/Administration';

export interface AdministrationFieldProps {
  errors?: FieldErrors<AdministrationFormInput>;
  readonly?: boolean;
  value: AdministrationFormInput;
  onChange: (value: AdministrationFormInput) => void;
}

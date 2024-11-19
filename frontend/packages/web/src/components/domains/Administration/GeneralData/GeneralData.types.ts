import { FieldErrors } from 'react-hook-form';

import { AdministrationFormInput } from '../../../../interfaces/FormInputs/Administration';

export interface AdministrationGeneralDataProps {
  value: AdministrationFormInput;
  onChange: (value: AdministrationFormInput) => void;
  readonly?: boolean;
  errors: FieldErrors<AdministrationFormInput>;
}

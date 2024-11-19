import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FrameworkAgreementFieldProps {
  control: Control<FacilityContractFormInput>;
  errors: FieldErrors<FacilityContractFormInput>;
  index: number;
  readonly?: boolean;
}

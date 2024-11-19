import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractBillingProps {
  control: Control<FacilityContractFormInput>;
  errors: FieldErrors<FacilityContractFormInput>;
  readonly?: boolean;
}

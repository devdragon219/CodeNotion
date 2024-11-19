import { Control } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractTermExtensionsProps {
  control: Control<FacilityContractFormInput>;
  readonly?: boolean;
}

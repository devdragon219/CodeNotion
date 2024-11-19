import { Control } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractTicketsProps {
  control: Control<FacilityContractFormInput>;
  readonly?: boolean;
}

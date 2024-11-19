import { Control } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractTicketChecklistsProps {
  control: Control<FacilityContractFormInput>;
  readonly?: boolean;
}

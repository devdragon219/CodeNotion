import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractEstateUnitsProps {
  control: Control<FacilityContractFormInput>;
  errors: FieldErrors<FacilityContractFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<FacilityContractFormInput>;
}

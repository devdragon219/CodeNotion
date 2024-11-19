import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractSlasFieldProps {
  control: Control<FacilityContractFormInput>;
  errors: FieldErrors<FacilityContractFormInput>;
  mode: FormMode;
  readonly?: boolean;
  onAddSlas?: () => void;
  onCalendarChange?: () => void;
  onOpenCalendar?: () => void;
}

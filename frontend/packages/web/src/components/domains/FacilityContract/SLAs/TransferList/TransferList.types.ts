import { FormMode } from '@realgimm5/frontend-common/enums';
import { SlaFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractSlasTransferListProps {
  control: Control<FacilityContractFormInput>;
  errors: FieldErrors<FacilityContractFormInput>;
  mode: FormMode;
  where?: SlaFilterInput;
  onAddSlas: () => void;
  onOpenCalendar: () => void;
}

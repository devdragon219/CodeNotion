import { FormMode } from '@realgimm5/frontend-common/enums';
import { PenaltyFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractPenaltiesTransferListProps {
  control: Control<FacilityContractFormInput>;
  errors: FieldErrors<FacilityContractFormInput>;
  mode: FormMode;
  where?: PenaltyFilterInput;
  onAddPenalties: () => void;
  onOpenCalendar: () => void;
}

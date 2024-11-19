import { FormMode } from '@realgimm5/frontend-common/enums';
import { PenaltyFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplatePenaltiesTransferListProps {
  control: Control<FacilityContractTemplateFormInput>;
  errors: FieldErrors<FacilityContractTemplateFormInput>;
  mode: FormMode;
  where?: PenaltyFilterInput;
  onAddPenalties: () => void;
  onOpenCalendar: () => void;
}

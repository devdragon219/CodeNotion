import { FormMode } from '@realgimm5/frontend-common/enums';
import { SlaFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateSlasTransferListProps {
  control: Control<FacilityContractTemplateFormInput>;
  errors: FieldErrors<FacilityContractTemplateFormInput>;
  mode: FormMode;
  where?: SlaFilterInput;
  onAddSlas: () => void;
  onOpenCalendar: () => void;
}

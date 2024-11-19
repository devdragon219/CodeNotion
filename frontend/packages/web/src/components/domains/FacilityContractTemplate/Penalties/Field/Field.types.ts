import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplatePenaltiesFieldProps {
  control: Control<FacilityContractTemplateFormInput>;
  errors: FieldErrors<FacilityContractTemplateFormInput>;
  mode: FormMode;
  readonly?: boolean;
  onAddPenalties?: () => void;
  onOpenCalendar?: () => void;
}

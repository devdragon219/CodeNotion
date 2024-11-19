import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateSlasFieldProps {
  control: Control<FacilityContractTemplateFormInput>;
  errors: FieldErrors<FacilityContractTemplateFormInput>;
  mode: FormMode;
  readonly?: boolean;
  onAddSlas?: () => void;
  onOpenCalendar?: () => void;
}

import { FormMode } from '@realgimm5/frontend-common/enums';

import { ReadingFormInput } from '../../../../interfaces/FormInputs/Reading';
import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface ReadingDialogProps {
  reading?: ReadingFormInput;
  readonly?: boolean;
  utilityService: UtilityServiceFormInput;
  onClose: () => void;
  onSave: (reading: ReadingFormInput, mode: FormMode) => void;
}

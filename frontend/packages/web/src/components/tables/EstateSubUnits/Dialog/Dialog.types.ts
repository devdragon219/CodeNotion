import { FormMode } from '@realgimm5/frontend-common/enums';

import { EstateSubUnitFormInput } from '../../../../interfaces/FormInputs/EstateSubUnit';
import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateSubUnitDialogProps {
  estateSubUnit?: EstateSubUnitFormInput;
  estateUnit: EstateUnitFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (estateSubUnit: EstateSubUnitFormInput, mode: FormMode) => void;
}

import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitEstateProps {
  control: Control<EstateUnitFormInput>;
  mode: FormMode;
  readonly?: boolean;
}

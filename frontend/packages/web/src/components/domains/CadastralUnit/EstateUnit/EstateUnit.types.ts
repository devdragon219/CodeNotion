import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitEstateUnitProps {
  control: Control<CadastralUnitFormInput>;
  mode: FormMode;
  readonly?: boolean;
}

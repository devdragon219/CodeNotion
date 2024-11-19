import { Control } from 'react-hook-form';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateRefactoringsProps {
  control: Control<EstateFormInput>;
  readonly?: boolean;
}

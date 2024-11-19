import { Control } from 'react-hook-form';

import { EstateRefactoringFormInput } from '../../../../../interfaces/FormInputs/Estate';

export interface EstateUnitsFieldProps {
  control: Control<EstateRefactoringFormInput>;
  estateId: number;
}

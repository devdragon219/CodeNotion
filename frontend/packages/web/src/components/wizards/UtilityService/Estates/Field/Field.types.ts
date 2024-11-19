import { Control } from 'react-hook-form';

import { UtilityServiceFormInput } from '../../../../../interfaces/FormInputs/UtilityService';

export interface EstatesFieldProps {
  control: Control<UtilityServiceFormInput>;
  currentEstates?: UtilityServiceFormInput['estates'];
}

import { Control } from 'react-hook-form';

import { UtilityServiceFormInput } from '../../../../../../interfaces/FormInputs/UtilityService';

export interface EstateUnitsFieldProps {
  control: Control<UtilityServiceFormInput>;
  currentEstateUnits: UtilityServiceFormInput['estateUnits'];
  currentEstates: UtilityServiceFormInput['estates'];
}

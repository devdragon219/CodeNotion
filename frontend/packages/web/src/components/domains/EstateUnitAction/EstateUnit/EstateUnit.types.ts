import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitActionEstateUnitProps {
  alreadyInUseInternalCodes?: string[];
  control: Control<EstateUnitFormInput>;
  errors: FieldErrors<EstateUnitFormInput>;
  estateId: number;
  setValue: UseFormSetValue<EstateUnitFormInput>;
}

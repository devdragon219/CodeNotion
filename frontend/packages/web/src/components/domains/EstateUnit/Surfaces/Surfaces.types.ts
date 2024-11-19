import { Control } from 'react-hook-form';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitSurfacesProps {
  control: Control<EstateUnitFormInput>;
  readonly?: boolean;
}

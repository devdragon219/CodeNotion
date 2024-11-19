import { Control } from 'react-hook-form';

import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateSurfacesProps {
  control: Control<EstateFormInput>;
  readonly?: boolean;
}

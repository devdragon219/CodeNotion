import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { EstateUnitSurfaceFormInput } from '../../../../../interfaces/FormInputs/EstateUnit';

export interface TotalSurfaceFieldProps {
  control: Control<EstateUnitSurfaceFormInput>;
  errors: FieldErrors<EstateUnitSurfaceFormInput>;
  estateUnitType: EstateUnitType;
}

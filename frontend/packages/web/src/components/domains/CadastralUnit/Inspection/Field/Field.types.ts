import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { CadastralUnitFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface InspectionFieldProps {
  estateUnitType: EstateUnitType | null;
  control: Control<CadastralUnitFormInput>;
  errors: FieldErrors<CadastralUnitFormInput>;
  readonly?: boolean;
}

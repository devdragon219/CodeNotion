import { EstateUnitFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control } from 'react-hook-form';

import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';

export interface EstateUnitGroupEstateUnitsFieldProps {
  control: Control<EstateUnitGroupFormInput>;
  where?: EstateUnitFilterInput;
}

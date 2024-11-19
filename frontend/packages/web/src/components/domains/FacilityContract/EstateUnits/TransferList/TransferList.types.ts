import { EstateUnitFilterInput } from '@realgimm5/frontend-common/gql/types';
import { Control } from 'react-hook-form';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractEstateUnitsTransferListProps {
  control: Control<FacilityContractFormInput>;
  where?: EstateUnitFilterInput;
}

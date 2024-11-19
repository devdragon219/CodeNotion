import { UseFormSetValue } from 'react-hook-form';

import { UtilityServiceFragment } from '../../../../../gql/RealGimm.Web.UtilityService.fragment';
import { CostChargeFormInput } from '../../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeUtilityServicesProps {
  onShowAllUtilityServiceEstateUnits: (row: UtilityServiceFragment) => void;
  onShowAllUtilityServiceEstates: (row: UtilityServiceFragment) => void;
  setValue: UseFormSetValue<CostChargeFormInput>;
}

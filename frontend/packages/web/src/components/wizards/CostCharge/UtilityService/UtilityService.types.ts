import { UtilityServiceFragment } from '../../../../gql/RealGimm.Web.UtilityService.fragment';
import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeUtilityServiceStepProps {
  costCharge: CostChargeFormInput;
  utilityService?: UtilityServiceFragment;
  onChange: (costCharge: CostChargeFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
  onShowAllUtilityServiceEstateUnits: (row: UtilityServiceFragment) => void;
  onShowAllUtilityServiceEstates: (row: UtilityServiceFragment) => void;
}

import { UtilityServiceFragment } from '../../../gql/RealGimm.Web.UtilityService.fragment';
import { CostChargeFormInput } from '../../../interfaces/FormInputs/CostCharge';

export interface CostChargeCreateDialogProps {
  utilityService?: UtilityServiceFragment;
  onClose: () => void;
  onSave: (costCharge: CostChargeFormInput) => void;
}

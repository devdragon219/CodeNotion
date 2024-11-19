import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeRecapStepProps {
  costCharge: CostChargeFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (costCharge: CostChargeFormInput) => void;
}

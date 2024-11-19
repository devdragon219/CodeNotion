import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';

export interface CostChargeGeneralDataStepProps {
  costCharge: CostChargeFormInput;
  onBack: () => void;
  onChange: (costCharge: CostChargeFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}

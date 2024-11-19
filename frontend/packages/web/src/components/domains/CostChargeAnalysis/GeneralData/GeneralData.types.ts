import { CostChargeAnalysisFormInput } from '../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisGeneralDataStepProps {
  costChargesAnalysis: CostChargeAnalysisFormInput;
  onChange: (costChargesAnalysis: CostChargeAnalysisFormInput) => void;
  onError: () => void;
  onNext: () => void;
}

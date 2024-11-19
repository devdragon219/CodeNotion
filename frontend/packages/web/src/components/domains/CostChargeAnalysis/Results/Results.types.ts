import { CostChargeAnalysisFormInput } from '../../../../interfaces/FormInputs/CostChargeAnalysis';

export interface CostChargeAnalysisResultsStepProps {
  costChargesAnalysis: CostChargeAnalysisFormInput;
  onBack: () => void;
  onComplete: () => void;
}
